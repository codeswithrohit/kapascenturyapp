// components/Header.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS, FONTS, SHADOW } from '../assets/theme';
import { useCart } from '../context/CartContext';

export default function Header() {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const { itemCount, wishlist } = useCart();

  const cartCount = itemCount;
  const wishlistCount = wishlist.length;

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        paddingTop: insets.top + 8,
        paddingBottom: 12,
        paddingHorizontal: 16,
        ...SHADOW.heavy,
      }}
    >
      {/* Top Row */}
      <View style={tw`flex-row items-center justify-between`}>
        {/* Logo */}
        <View>
          <Text
            style={{
              fontSize: 22,
              fontFamily: FONTS.display,
              color: '#FFFFFF',
              letterSpacing: 1.5,
              fontWeight: '700',
            }}
          >
            कपास
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: COLORS.secondaryLight,
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginTop: -2,
            }}
          >
            CENTURY
          </Text>
        </View>

        {/* Right Icons */}
        <View style={tw`flex-row items-center`}>
          {/* Wishlist */}
          <TouchableOpacity style={tw`p-2 relative`}>
            <Icon name="heart-outline" size={22} color="#fff" />
            {wishlistCount > 0 && (
              <View
                style={[
                  tw`absolute -top-1 -right-1 rounded-full items-center justify-center`,
                  {
                    width: 16,
                    height: 16,
                    backgroundColor: COLORS.secondary,
                  },
                ]}
              >
                <Text style={{ fontSize: 9, color: '#fff', fontWeight: '700' }}>
                  {wishlistCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Cart */}
          <TouchableOpacity style={tw`p-2 relative`}>
            <Icon name="bag-outline" size={22} color="#fff" />
            {cartCount > 0 && (
              <View
                style={[
                  tw`absolute -top-1 -right-1 rounded-full items-center justify-center`,
                  {
                    width: 16,
                    height: 16,
                    backgroundColor: COLORS.secondary,
                  },
                ]}
              >
                <Text style={{ fontSize: 9, color: '#fff', fontWeight: '700' }}>
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Menu */}
          <TouchableOpacity style={tw`p-2`}>
            <Icon name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔍 ALWAYS VISIBLE SEARCH BAR */}
      <View
        style={[
          tw`flex-row items-center mt-3 px-4 py-2 rounded-full`,
          { backgroundColor: 'rgba(255,255,255,0.15)' },
        ]}
      >
        <Icon name="search" size={18} color="rgba(255,255,255,0.7)" />

        <TextInput
          placeholder="Search sarees, lehengas..."
          placeholderTextColor="rgba(255,255,255,0.6)"
          style={{
            flex: 1,
            marginLeft: 8,
            color: '#fff',
            fontSize: 14,
          }}
          value={searchText}
          onChangeText={setSearchText}
        />

        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Icon name="close-circle" size={18} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        )}
      </View>

      {/* Delivery Badge */}
      <TouchableOpacity style={tw`flex-row items-center mt-2`}>
        <Icon name="location-outline" size={14} color={COLORS.secondaryLight} />

        <Text style={{ color: COLORS.secondaryLight, fontSize: 12, marginLeft: 4 }}>
          Deliver to{' '}
          <Text style={{ color: '#fff', fontWeight: '600' }}>
            New Delhi 110001
          </Text>
        </Text>

        <Icon
          name="chevron-down"
          size={14}
          color={COLORS.secondaryLight}
          style={{ marginLeft: 4 }}
        />
      </TouchableOpacity>
    </View>
  );
}