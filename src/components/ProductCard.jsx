// components/ProductCard.jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS, SHADOW, RADIUS } from '../assets/theme';
import { useCart } from '../context/CartContext';

const { width: SCREEN_W } = Dimensions.get('window');

const TAG_COLORS = {
  BESTSELLER: { bg: '#FFF7ED', text: '#C2410C' },
  NEW: { bg: '#ECFDF5', text: '#047857' },
  HOT: { bg: '#FEF2F2', text: '#B91C1C' },
  SALE: { bg: '#EEF2FF', text: '#4338CA' },
};

export default function ProductCard({ product, width, onPress }) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useCart();

  const cardWidth = width || SCREEN_W / 2 - 20;
  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100
  );

  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const tagStyle = TAG_COLORS[product.tag] || TAG_COLORS.NEW;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        {
          width: cardWidth,
          borderRadius: RADIUS.sm,
          backgroundColor: '#fff',
          overflow: 'hidden',
          ...SHADOW.card,
          marginBottom: 12,
        },
      ]}
    >
      {/* IMAGE */}
      <View style={{ height: cardWidth * 0.9 }}>
        <Image
          source={{ uri: product.image }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />

        {/* GRADIENT OVERLAY (fake using opacity) */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 60,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
        />

        {/* TAG */}
        {product.tag && (
          <View
            style={[
              tw`absolute top-2 left-2 px-2 py-1 rounded-full`,
              { backgroundColor: tagStyle.bg },
            ]}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: '700',
                color: tagStyle.text,
              }}
            >
              {product.tag}
            </Text>
          </View>
        )}

        {/* DISCOUNT */}
        <View
          style={[
            tw`absolute top-2 right-2 px-2 py-1 rounded-full`,
            { backgroundColor: COLORS.primary },
          ]}
        >
          <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
            {discount}% OFF
          </Text>
        </View>

        {/* WISHLIST */}
        <TouchableOpacity
          onPress={() => toggleWishlist(product)}
          style={[
            tw`absolute bottom-2 right-2 items-center justify-center rounded-full`,
            {
              width: 34,
              height: 34,
              backgroundColor: 'rgba(255,255,255,0.9)',
              ...SHADOW.soft,
            },
          ]}
        >
          <Icon
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={wishlisted ? COLORS.primary : '#333'}
          />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={tw`p-3`}>
        {/* NAME */}
        <Text
          numberOfLines={2}
          style={{
            fontSize: 13,
            fontWeight: '600',
            color: '#111',
            marginBottom: 6,
          }}
        >
          {product.name}
        </Text>

        {/* RATING */}
        <View style={tw`flex-row items-center mb-2`}>
          <View
            style={[
              tw`flex-row items-center px-2 py-0.5 rounded`,
              { backgroundColor: '#16A34A' },
            ]}
          >
            <Icon name="star" size={10} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 10, marginLeft: 3 }}>
              {product.rating}
            </Text>
          </View>

          <Text style={{ fontSize: 10, color: '#777', marginLeft: 6 }}>
            ({product.reviews})
          </Text>
        </View>

        {/* PRICE */}
        <View style={tw`flex-row items-center`}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: COLORS.primary,
            }}
          >
            ₹{product.price.toLocaleString('en-IN')}
          </Text>

          <Text
            style={{
              fontSize: 11,
              color: '#888',
              textDecorationLine: 'line-through',
              marginLeft: 6,
            }}
          >
            ₹{product.originalPrice.toLocaleString('en-IN')}
          </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          onPress={() => addToCart(product, 'M', 1)}
          style={[
            tw`mt-3 flex-row items-center justify-center py-2 rounded-lg`,
            {
              backgroundColor: inCart ? '#16A34A' : COLORS.primary,
            },
          ]}
        >
          <Icon
            name={inCart ? 'checkmark' : 'bag-add-outline'}
            size={14}
            color="#fff"
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontWeight: '600',
              marginLeft: 6,
            }}
          >
            {inCart ? 'Added' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}