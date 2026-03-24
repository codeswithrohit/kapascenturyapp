// screens/CartScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image,
  TextInput, Alert, Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { COLORS, FONTS, SHADOW, PRODUCTS } from '../assets/theme';
import { useCart, COUPONS } from '../context/CartContext';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// ─── Cart Item Card ───────────────────────────────────────────────
function CartItem({ item, onQtyChange, onRemove, onMoveToWishlist, onSizeChange }) {
  const [sizeModal, setSizeModal] = useState(false);
  const discount = Math.round((1 - item.price / item.originalPrice) * 100);

  const confirmRemove = () =>
    Alert.alert('Remove Item', `Remove "${item.name}" from cart?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => onRemove(item.key) },
    ]);

  return (
    <View style={[
      tw`rounded-2xl overflow-hidden mb-3`,
      { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.soft },
    ]}>
      <View style={tw`flex-row`}>
        {/* Image */}
        <View>
          <Image source={{ uri: item.image }} style={{ width: 110, height: 145 }} resizeMode="cover" />
          <View style={[
            tw`absolute top-2 left-2 px-1.5 py-0.5 rounded`,
            { backgroundColor: COLORS.primary },
          ]}>
            <Text style={{ color: '#fff', fontSize: 9, fontWeight: '800' }}>{discount}% OFF</Text>
          </View>
        </View>

        {/* Info */}
        <View style={tw`flex-1 p-3`}>
          {/* Name row */}
          <View style={tw`flex-row justify-between items-start`}>
            <Text
              style={{ fontSize: 13, fontWeight: '600', color: COLORS.text, flex: 1, lineHeight: 18 }}
              numberOfLines={2}
            >
              {item.name}
            </Text>
            <TouchableOpacity onPress={confirmRemove} style={tw`ml-1 p-1`}>
              <Text style={{ fontSize: 15, color: COLORS.textMuted }}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 2 }}>{item.category}</Text>

          {/* Size picker */}
          <TouchableOpacity
            onPress={() => setSizeModal(true)}
            style={[
              tw`self-start flex-row items-center px-2.5 py-1 rounded-lg mt-2`,
              { borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surfaceWarm },
            ]}
          >
            <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>Size: </Text>
            <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.primary }}>{item.size}</Text>
            <Text style={{ fontSize: 10, color: COLORS.textMuted, marginLeft: 3 }}>▾</Text>
          </TouchableOpacity>

          {/* Price + Qty */}
          <View style={tw`flex-row items-center justify-between mt-3`}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '800', color: COLORS.primary }}>
                ₹{(item.price * item.qty).toLocaleString('en-IN')}
              </Text>
              {item.qty > 1 && (
                <Text style={{ fontSize: 10, color: COLORS.textMuted }}>
                  ₹{item.price.toLocaleString('en-IN')} × {item.qty}
                </Text>
              )}
            </View>

            {/* Stepper */}
            <View style={[
              tw`flex-row items-center rounded-xl overflow-hidden`,
              { borderWidth: 1.5, borderColor: COLORS.primary },
            ]}>
              <TouchableOpacity
                onPress={() => onQtyChange(item.key, item.qty - 1)}
                style={[tw`px-2.5 py-1.5`, { backgroundColor: COLORS.surfaceWarm }]}
              >
                <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: '800' }}>−</Text>
              </TouchableOpacity>
              <Text style={{
                paddingHorizontal: 10, fontSize: 14, fontWeight: '800',
                color: COLORS.primary, minWidth: 30, textAlign: 'center',
              }}>
                {item.qty}
              </Text>
              <TouchableOpacity
                onPress={() => onQtyChange(item.key, item.qty + 1)}
                style={[tw`px-2.5 py-1.5`, { backgroundColor: COLORS.primary }]}
              >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom actions */}
      <View style={{ borderTopWidth: 1, borderColor: COLORS.border, flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => onMoveToWishlist(item.key, item.id, item)}
          style={[
            tw`flex-1 flex-row items-center justify-center py-2.5 gap-1`,
            { borderRightWidth: 1, borderColor: COLORS.border },
          ]}
        >
          <Text style={{ fontSize: 13 }}>♡</Text>
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' }}>Save for Later</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={confirmRemove}
          style={tw`flex-1 flex-row items-center justify-center py-2.5 gap-1`}
        >
          <Text style={{ fontSize: 13 }}>🗑</Text>
          <Text style={{ fontSize: 12, color: '#EF4444', fontWeight: '500' }}>Remove</Text>
        </TouchableOpacity>
      </View>

      {/* Size Modal */}
      <Modal visible={sizeModal} transparent animationType="slide">
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          activeOpacity={1}
          onPress={() => setSizeModal(false)}
        >
          <View style={[tw`rounded-t-3xl p-5`, { backgroundColor: COLORS.surface }]}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 16 }}>
              Select Size
            </Text>
            <View style={tw`flex-row flex-wrap gap-3 mb-5`}>
              {SIZES.map(s => (
                <TouchableOpacity
                  key={s}
                  onPress={() => { onSizeChange(item.key, s); setSizeModal(false); }}
                  style={[
                    tw`items-center justify-center rounded-xl`,
                    {
                      width: 54, height: 48,
                      borderWidth: item.size === s ? 2 : 1,
                      borderColor: item.size === s ? COLORS.primary : COLORS.border,
                      backgroundColor: item.size === s ? COLORS.surfaceWarm : COLORS.surface,
                    },
                  ]}
                >
                  <Text style={{
                    fontSize: 13,
                    fontWeight: item.size === s ? '800' : '500',
                    color: item.size === s ? COLORS.primary : COLORS.textSecondary,
                  }}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => setSizeModal(false)}
              style={[tw`py-3.5 rounded-2xl items-center`, { backgroundColor: COLORS.primary }]}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// ─── Coupon Section ───────────────────────────────────────────────
function CouponSection({ couponCode, coupon, couponError, onApply, onRemove }) {
  const [input, setInput] = useState(couponCode || '');
  const [showOffers, setShowOffers] = useState(false);

  return (
    <View style={[
      tw`mx-4 mb-3 rounded-2xl overflow-hidden`,
      { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
    ]}>
      <TouchableOpacity
        onPress={() => setShowOffers(!showOffers)}
        style={tw`flex-row items-center justify-between px-4 py-3`}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={{ fontSize: 18 }}>🎟️</Text>
          <Text style={{ fontWeight: '700', color: COLORS.text, fontSize: 14 }}>
            {coupon ? `Applied: ${couponCode}` : 'Apply Coupon'}
          </Text>
        </View>
        <Text style={{ color: COLORS.primary, fontSize: 12, fontWeight: '600' }}>
          {showOffers ? 'Hide ▲' : 'View All ▾'}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 1, backgroundColor: COLORS.border }} />

      {/* Input row */}
      <View style={tw`flex-row gap-2 p-3`}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Enter coupon code"
          placeholderTextColor={COLORS.textMuted}
          autoCapitalize="characters"
          editable={!coupon}
          style={[
            tw`flex-1 px-4 py-2.5 rounded-xl`,
            {
              borderWidth: 1,
              borderColor: coupon ? COLORS.success : couponError ? '#EF4444' : COLORS.border,
              backgroundColor: coupon ? '#F0FDF4' : COLORS.surfaceWarm,
              color: COLORS.text, fontSize: 14, fontWeight: '600', letterSpacing: 1,
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => { coupon ? (onRemove(), setInput('')) : onApply(input.trim()); }}
          style={[
            tw`px-5 py-2.5 rounded-xl items-center justify-center`,
            { backgroundColor: coupon ? '#FEE2E2' : COLORS.primary },
          ]}
        >
          <Text style={{ color: coupon ? '#EF4444' : '#fff', fontWeight: '700', fontSize: 13 }}>
            {coupon ? 'Remove' : 'Apply'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Status messages */}
      {coupon && (
        <View style={[tw`mx-3 mb-3 px-3 py-2 rounded-xl flex-row items-center gap-2`, { backgroundColor: '#F0FDF4' }]}>
          <Text>✅</Text>
          <Text style={{ color: COLORS.success, fontSize: 13, fontWeight: '600' }}>
            {coupon.label} applied!
          </Text>
        </View>
      )}
      {!!couponError && (
        <View style={[tw`mx-3 mb-3 px-3 py-2 rounded-xl flex-row items-center gap-2`, { backgroundColor: '#FEF2F2' }]}>
          <Text>❌</Text>
          <Text style={{ color: '#EF4444', fontSize: 13 }}>{couponError}</Text>
        </View>
      )}

      {/* Available coupons */}
      {showOffers && (
        <View style={tw`px-3 pb-3 gap-2`}>
          <Text style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
            Available Coupons
          </Text>
          {Object.entries(COUPONS).map(([code, val]) => (
            <TouchableOpacity
              key={code}
              onPress={() => { setInput(code); onApply(code); setShowOffers(false); }}
              style={[
                tw`flex-row items-center justify-between px-3 py-3 rounded-xl`,
                {
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: couponCode === code ? COLORS.primary : COLORS.border,
                  backgroundColor: couponCode === code ? COLORS.surfaceWarm : COLORS.surface,
                },
              ]}
            >
              <View>
                <Text style={{ fontWeight: '800', color: COLORS.primary, fontSize: 13, letterSpacing: 1 }}>
                  {code}
                </Text>
                <Text style={{ color: COLORS.textSecondary, fontSize: 12, marginTop: 1 }}>{val.label}</Text>
              </View>
              <Text style={{ color: COLORS.primary, fontWeight: '700', fontSize: 12 }}>
                {couponCode === code ? '✓ Applied' : 'Tap to Apply'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Price Summary ────────────────────────────────────────────────
function PriceSummary({ items, subtotal, discountAmount, deliveryCharge, total, coupon }) {
  const mrpTotal  = items.reduce((s, i) => s + i.originalPrice * i.qty, 0);
  const mrpSaving = mrpTotal - subtotal;
  const totalSave = mrpSaving + discountAmount;

  const rows = [
    { label: `MRP (${items.reduce((s, i) => s + i.qty, 0)} items)`, value: `₹${mrpTotal.toLocaleString('en-IN')}` },
    { label: 'Discount on MRP', value: `-₹${mrpSaving.toLocaleString('en-IN')}`, color: COLORS.success },
    coupon && { label: `Coupon (${coupon.label})`, value: `-₹${discountAmount.toLocaleString('en-IN')}`, color: COLORS.success },
    {
      label: 'Delivery',
      value: deliveryCharge === 0 ? 'FREE 🎉' : `₹${deliveryCharge}`,
      color: deliveryCharge === 0 ? COLORS.success : COLORS.text,
    },
  ].filter(Boolean);

  return (
    <View style={[
      tw`mx-4 mb-4 rounded-2xl overflow-hidden`,
      { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
    ]}>
      <View style={[tw`px-4 py-3`, { backgroundColor: COLORS.surfaceWarm }]}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: COLORS.text }}>Price Details</Text>
      </View>
      <View style={{ height: 1, backgroundColor: COLORS.border }} />
      <View style={tw`p-4`}>
        {rows.map((row, i) => (
          <View key={i} style={tw`flex-row justify-between mb-3`}>
            <Text style={{ color: COLORS.textSecondary, fontSize: 13 }}>{row.label}</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', color: row.color || COLORS.text }}>{row.value}</Text>
          </View>
        ))}
        <View style={{ height: 1, backgroundColor: COLORS.border, marginBottom: 12 }} />
        <View style={tw`flex-row justify-between items-center mb-3`}>
          <Text style={{ fontSize: 16, fontWeight: '800', color: COLORS.text }}>Total Amount</Text>
          <Text style={{ fontSize: 20, fontWeight: '800', color: COLORS.primary }}>
            ₹{total.toLocaleString('en-IN')}
          </Text>
        </View>
        {totalSave > 0 && (
          <View style={[tw`flex-row items-center justify-center py-2.5 rounded-xl gap-2`, { backgroundColor: '#F0FDF4' }]}>
            <Text>🎉</Text>
            <Text style={{ color: COLORS.success, fontWeight: '700', fontSize: 13 }}>
              You save ₹{totalSave.toLocaleString('en-IN')} on this order!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

// ─── Empty State ──────────────────────────────────────────────────
function EmptyCart({ navigation }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={tw`items-center py-14 px-6`}>
        <Text style={{ fontSize: 72, marginBottom: 16 }}>🛍️</Text>
        <Text style={{ fontSize: 22, fontWeight: '700', color: COLORS.text, marginBottom: 8 }}>
          Your cart is empty
        </Text>
        <Text style={{ color: COLORS.textMuted, fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 }}>
          Looks like you haven't added anything yet. Start shopping!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Category')}
          style={[tw`px-8 py-3.5 rounded-2xl`, { backgroundColor: COLORS.primary }]}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Start Shopping →</Text>
        </TouchableOpacity>
      </View>

      {/* Suggested */}
      <View style={tw`px-4 pb-10`}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 12 }}>
          You might like
        </Text>
        <View style={tw`flex-row flex-wrap gap-3`}>
          {PRODUCTS.slice(0, 4).map(p => (
            <TouchableOpacity
              key={p.id}
              onPress={() => navigation.navigate('ProductDetail', { product: p })}
              style={[
                tw`rounded-2xl overflow-hidden`,
                { width: '47%', backgroundColor: COLORS.surface, ...SHADOW.soft, borderWidth: 1, borderColor: COLORS.border },
              ]}
            >
              <Image source={{ uri: p.image }} style={{ width: '100%', height: 140 }} resizeMode="cover" />
              <View style={tw`p-2`}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: COLORS.text }} numberOfLines={1}>{p.name}</Text>
                <Text style={{ fontSize: 13, fontWeight: '800', color: COLORS.primary, marginTop: 2 }}>
                  ₹{p.price.toLocaleString('en-IN')}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ─── Success Modal ────────────────────────────────────────────────
function SuccessModal({ visible, savedAmount, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[tw`flex-1 items-center justify-center px-6`, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
        <View style={[tw`w-full rounded-3xl p-6 items-center`, { backgroundColor: COLORS.surface }]}>
          <Text style={{ fontSize: 64, marginBottom: 12 }}>🎉</Text>
          <Text style={{ fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 8 }}>
            Order Placed!
          </Text>
          <Text style={{ color: COLORS.textSecondary, fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 12 }}>
            Your order has been placed successfully. You'll receive a confirmation shortly.
          </Text>
          {savedAmount > 0 && (
            <View style={[tw`px-4 py-2 rounded-full mb-4`, { backgroundColor: '#F0FDF4' }]}>
              <Text style={{ color: COLORS.success, fontWeight: '700', fontSize: 13 }}>
                🎊 You saved ₹{savedAmount.toLocaleString('en-IN')}!
              </Text>
            </View>
          )}
          <View style={[tw`w-full flex-row items-center justify-center py-3 rounded-2xl mb-4 gap-2`, { backgroundColor: '#EFF6FF' }]}>
            <Text>📦</Text>
            <Text style={{ color: '#1D4ED8', fontWeight: '600', fontSize: 13 }}>
              Delivery in 3–5 business days
            </Text>
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={[tw`w-full py-4 rounded-2xl items-center`, { backgroundColor: COLORS.primary }]}
          >
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Saved Items Tab ──────────────────────────────────────────────
function SavedTab({ wishlist, onMoveToCart }) {
  if (wishlist.length === 0) {
    return (
      <View style={tw`items-center py-16`}>
        <Text style={{ fontSize: 60, marginBottom: 12 }}>♡</Text>
        <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 8 }}>
          No saved items
        </Text>
        <Text style={{ color: COLORS.textMuted, fontSize: 13 }}>
          Items you save for later will appear here
        </Text>
      </View>
    );
  }
  return (
    <>
      {wishlist.map(product => (
        <View
          key={product.id}
          style={[
            tw`flex-row rounded-2xl overflow-hidden mb-3`,
            { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.soft },
          ]}
        >
          <Image source={{ uri: product.image }} style={{ width: 95, height: 115 }} resizeMode="cover" />
          <View style={tw`flex-1 p-3 justify-between`}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: COLORS.text }} numberOfLines={2}>
              {product.name}
            </Text>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '800', color: COLORS.primary }}>
                ₹{product.price.toLocaleString('en-IN')}
              </Text>
              <Text style={{ fontSize: 11, color: COLORS.textMuted, textDecorationLine: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onMoveToCart(product)}
              style={[tw`py-2 rounded-xl items-center`, { backgroundColor: COLORS.primary }]}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>Move to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────
export default function CartScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const {
    items, wishlist,
    couponCode, coupon, couponError,
    itemCount, subtotal, discountAmount, deliveryCharge, total,
    updateQty, removeFromCart, moveToWishlist, updateSize,
    applyCoupon, removeCoupon, clearCart, addToCart, toggleWishlist,
  } = useCart();

  const [tab, setTab] = useState('cart');
  const [successModal, setSuccessModal] = useState(false);
  const [savedAmount, setSavedAmount] = useState(0);

  const mrpTotal = items.reduce((s, i) => s + i.originalPrice * i.qty, 0);

  const handleCheckout = () => {
    Alert.alert(
      'Confirm Order',
      `Place order for ₹${total.toLocaleString('en-IN')}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Place Order ✓',
          onPress: () => {
            const saving = (mrpTotal - subtotal) + discountAmount;
            setSavedAmount(saving);
            clearCart();
            setSuccessModal(true);
          },
        },
      ]
    );
  };

  const handleMoveToCart = (product) => {
    addToCart(product, 'M', 1);
    toggleWishlist(product); // remove from wishlist
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>

      {/* ── Header ── */}
      <View style={[tw`px-4 pb-3`, { backgroundColor: COLORS.primary, paddingTop: insets.top + 12 }]}>
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={{ fontSize: 22, fontFamily: FONTS.heading, fontWeight: '700', color: '#fff' }}>
              🛍 My Cart
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 1 }}>
              {itemCount} item{itemCount !== 1 ? 's' : ''} · ₹{total.toLocaleString('en-IN')}
            </Text>
          </View>
          {items.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Clear Cart', 'Remove all items?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Clear All', style: 'destructive', onPress: clearCart },
                ])
              }
              style={[
                tw`px-3 py-1.5 rounded-full`,
                { backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
              ]}
            >
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Tabs */}
        <View style={[tw`flex-row mt-3 rounded-xl p-1`, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
          {[
            { key: 'cart',  label: `Cart${items.length ? ` (${items.length})` : ''}` },
            { key: 'saved', label: `Saved${wishlist.length ? ` (${wishlist.length})` : ''}` },
          ].map(t => (
            <TouchableOpacity
              key={t.key}
              onPress={() => setTab(t.key)}
              style={[
                tw`flex-1 py-2 rounded-lg items-center`,
                tab === t.key && { backgroundColor: '#fff' },
              ]}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: tab === t.key ? COLORS.primary : 'rgba(255,255,255,0.7)' }}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Free delivery progress ── */}
      {tab === 'cart' && items.length > 0 && subtotal < 999 && (
        <View style={[tw`px-4 py-2.5`, { backgroundColor: '#FFFBEB' }]}>
          <View style={tw`flex-row justify-between mb-1.5`}>
            <Text style={{ fontSize: 12, color: '#92400E' }}>
              🚚 Add ₹{(999 - subtotal).toLocaleString('en-IN')} more for FREE delivery
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#92400E' }}>
              {Math.round((subtotal / 999) * 100)}%
            </Text>
          </View>
          <View style={{ height: 6, backgroundColor: '#FDE68A', borderRadius: 3, overflow: 'hidden' }}>
            <View style={{
              height: '100%',
              width: `${Math.min((subtotal / 999) * 100, 100)}%`,
              backgroundColor: '#D97706',
              borderRadius: 3,
            }} />
          </View>
        </View>
      )}
      {tab === 'cart' && items.length > 0 && subtotal >= 999 && (
        <View style={[tw`px-4 py-2 flex-row items-center gap-2`, { backgroundColor: '#F0FDF4' }]}>
          <Text style={{ fontSize: 13 }}>🎉</Text>
          <Text style={{ color: COLORS.success, fontWeight: '600', fontSize: 13 }}>
            You've unlocked FREE delivery!
          </Text>
        </View>
      )}

      {/* ── Body ── */}
      {tab === 'cart' ? (
        items.length === 0 ? (
          <EmptyCart navigation={navigation} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Cart items */}
            <View style={tw`p-4`}>
              {items.map(item => (
                <CartItem
                  key={item.key}
                  item={item}
                  onQtyChange={updateQty}
                  onRemove={removeFromCart}
                  onMoveToWishlist={moveToWishlist}
                  onSizeChange={updateSize}
                />
              ))}
            </View>

            {/* Coupon */}
            <CouponSection
              couponCode={couponCode}
              coupon={coupon}
              couponError={couponError}
              onApply={applyCoupon}
              onRemove={removeCoupon}
            />

            {/* Price summary */}
            <PriceSummary
              items={items}
              subtotal={subtotal}
              discountAmount={discountAmount}
              deliveryCharge={deliveryCharge}
              total={total}
              coupon={coupon}
            />

            {/* Trust badges */}
            <View style={tw`flex-row justify-around px-4 py-4 mb-2`}>
              {[
                { emoji: '🔒', label: 'Secure\nPayment' },
                { emoji: '↩️', label: '15-Day\nReturn' },
                { emoji: '💎', label: '100%\nAuthentic' },
                { emoji: '🚚', label: 'Fast\nDelivery' },
              ].map(b => (
                <View key={b.label} style={tw`items-center gap-1`}>
                  <Text style={{ fontSize: 20 }}>{b.emoji}</Text>
                  <Text style={{ color: COLORS.textMuted, fontSize: 10, textAlign: 'center', lineHeight: 14 }}>
                    {b.label}
                  </Text>
                </View>
              ))}
            </View>
            <View style={{ height: 90 }} />
          </ScrollView>
        )
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4`}>
          <SavedTab wishlist={wishlist} onMoveToCart={handleMoveToCart} />
        </ScrollView>
      )}

      {/* ── Checkout bar ── */}
      {tab === 'cart' && items.length > 0 && (
        <View style={[
          tw`absolute bottom-0 left-0 right-0 px-4`,
          {
            paddingBottom: insets.bottom + 10,
            paddingTop: 12,
            backgroundColor: COLORS.surface,
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
            ...SHADOW.heavy,
          },
        ]}>
          <TouchableOpacity
            onPress={handleCheckout}
            style={[
              tw`flex-row items-center justify-between py-4 px-5 rounded-2xl`,
              { backgroundColor: COLORS.primary },
            ]}
          >
            <View>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </Text>
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>
                Proceed to Checkout
              </Text>
            </View>
            <Text style={{ color: COLORS.secondaryLight, fontWeight: '800', fontSize: 18 }}>
              ₹{total.toLocaleString('en-IN')} →
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Success modal ── */}
      <SuccessModal
        visible={successModal}
        savedAmount={savedAmount}
        onClose={() => { setSuccessModal(false); navigation.navigate('Home'); }}
      />
    </View>
  );
}
