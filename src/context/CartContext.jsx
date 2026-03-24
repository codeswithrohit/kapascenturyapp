// context/CartContext.jsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';

// ─── Valid Coupons ───────────────────────────────────────────────
export const COUPONS = {
  SAVE10:  { discount: 0.10, type: 'percent', label: '10% off' },
  FLAT200: { discount: 200,  type: 'flat',    label: '₹200 off' },
  KAPAS20: { discount: 0.20, type: 'percent', label: '20% off' },
  FIRST50: { discount: 0.50, type: 'percent', label: '50% off on first order' },
};

// ─── Reducer ────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const { product, size = 'M', qty = 1 } = action.payload;
      const key = `${product.id}_${size}`;
      const existing = state.items.find(i => i.key === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.key === key ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...product, key, size, qty }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.key !== action.payload.key),
      };

    case 'UPDATE_QTY': {
      const { key, qty } = action.payload;
      if (qty <= 0) {
        return { ...state, items: state.items.filter(i => i.key !== key) };
      }
      return {
        ...state,
        items: state.items.map(i => i.key === key ? { ...i, qty } : i),
      };
    }

    case 'UPDATE_SIZE': {
      const { key, newSize } = action.payload;
      const item = state.items.find(i => i.key === key);
      if (!item) return state;
      const newKey = `${item.id}_${newSize}`;
      // If new size already exists, merge qty
      const conflict = state.items.find(i => i.key === newKey);
      if (conflict) {
        return {
          ...state,
          items: state.items
            .filter(i => i.key !== key)
            .map(i => i.key === newKey ? { ...i, qty: i.qty + item.qty } : i),
        };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.key === key ? { ...i, key: newKey, size: newSize } : i
        ),
      };
    }

    case 'MOVE_TO_WISHLIST':
      return {
        ...state,
        items: state.items.filter(i => i.key !== action.payload.key),
        wishlist: state.wishlist.some(w => w.id === action.payload.productId)
          ? state.wishlist
          : [...state.wishlist, action.payload.product],
      };

    case 'APPLY_COUPON': {
      const code = action.payload.toUpperCase();
      const coupon = COUPONS[code];
      if (!coupon) return { ...state, couponError: 'Invalid coupon code', couponCode: '', coupon: null };
      return { ...state, couponCode: code, coupon, couponError: '' };
    }

    case 'REMOVE_COUPON':
      return { ...state, couponCode: '', coupon: null, couponError: '' };

    case 'CLEAR_COUPON_ERROR':
      return { ...state, couponError: '' };

    case 'CLEAR_CART':
      return { ...state, items: [], couponCode: '', coupon: null };

    case 'ADD_TO_WISHLIST': {
      const already = state.wishlist.some(w => w.id === action.payload.id);
      if (already) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(w => w.id !== action.payload.id),
      };

    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.some(w => w.id === action.payload.id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter(w => w.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      };
    }

    default:
      return state;
  }
}

// ─── Initial State ───────────────────────────────────────────────
const initialState = {
  items: [],
  wishlist: [],
  couponCode: '',
  coupon: null,
  couponError: '',
};

// ─── Context ─────────────────────────────────────────────────────
const CartContext = createContext(null);

// ─── Provider ────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Derived values
  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal  = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const discountAmount = (() => {
    if (!state.coupon) return 0;
    if (state.coupon.type === 'percent') return Math.round(subtotal * state.coupon.discount);
    return Math.min(state.coupon.discount, subtotal);
  })();

  const deliveryCharge = subtotal === 0 ? 0 : subtotal > 999 ? 0 : 99;
  const total = subtotal - discountAmount + deliveryCharge;

  // Actions
  const addToCart     = useCallback((product, size, qty) => dispatch({ type: 'ADD_ITEM',    payload: { product, size, qty } }), []);
  const removeFromCart = useCallback((key) =>               dispatch({ type: 'REMOVE_ITEM', payload: { key } }), []);
  const updateQty     = useCallback((key, qty) =>           dispatch({ type: 'UPDATE_QTY',  payload: { key, qty } }), []);
  const updateSize    = useCallback((key, newSize) =>       dispatch({ type: 'UPDATE_SIZE', payload: { key, newSize } }), []);
  const moveToWishlist = useCallback((key, productId, product) => dispatch({ type: 'MOVE_TO_WISHLIST', payload: { key, productId, product } }), []);
  const applyCoupon   = useCallback((code) =>               dispatch({ type: 'APPLY_COUPON',    payload: code }), []);
  const removeCoupon  = useCallback(() =>                   dispatch({ type: 'REMOVE_COUPON' }), []);
  const clearCart     = useCallback(() =>                   dispatch({ type: 'CLEAR_CART' }), []);
  const toggleWishlist = useCallback((product) =>           dispatch({ type: 'TOGGLE_WISHLIST', payload: product }), []);
  const isInWishlist  = useCallback((id) => state.wishlist.some(w => w.id === id), [state.wishlist]);
  const isInCart      = useCallback((id) => state.items.some(i => i.id === id), [state.items]);

  const value = {
    // State
    items:          state.items,
    wishlist:       state.wishlist,
    couponCode:     state.couponCode,
    coupon:         state.coupon,
    couponError:    state.couponError,
    // Derived
    itemCount,
    subtotal,
    discountAmount,
    deliveryCharge,
    total,
    // Actions
    addToCart,
    removeFromCart,
    updateQty,
    updateSize,
    moveToWishlist,
    applyCoupon,
    removeCoupon,
    clearCart,
    toggleWishlist,
    isInWishlist,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
