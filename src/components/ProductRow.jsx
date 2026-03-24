// components/ProductRow.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import tw from 'twrnc';
import { COLORS, FONTS, SHADOW } from '../assets/theme';
import ProductCard from './ProductCard';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_W = SCREEN_W * 0.44;

export default function ProductRow({
  title,
  subtitle,
  products,
  onViewAll,
  onProductPress,
  showBadge,
  badgeText,
}) {
  return (
    <View style={tw`py-5`}>
      {/* Header */}
      <View style={tw`px-4 mb-4`}>
        <View style={tw`flex-row justify-between items-start`}>
          <View style={tw`flex-1`}>
            {showBadge && (
              <View style={[
                tw`self-start px-3 py-1 rounded-full mb-2`,
                { backgroundColor: COLORS.goldLight, borderWidth: 1, borderColor: COLORS.secondary }
              ]}>
                <Text style={{ color: COLORS.secondary, fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>
                  {badgeText || '⭐ FEATURED'}
                </Text>
              </View>
            )}
            <Text style={{
              fontSize: 20,
              fontFamily: FONTS.heading,
              fontWeight: '700',
              color: COLORS.text,
            }}>
              {title}
            </Text>
            {subtitle && (
              <Text style={{ color: COLORS.textSecondary, fontSize: 12, marginTop: 2 }}>
                {subtitle}
              </Text>
            )}
            <View style={{ height: 2.5, width: 40, backgroundColor: COLORS.primary, marginTop: 6, borderRadius: 2 }} />
          </View>

          <TouchableOpacity
            onPress={onViewAll}
            style={[
              tw`px-3 py-1.5 rounded-full`,
              { borderWidth: 1.5, borderColor: COLORS.primary }
            ]}
          >
            <Text style={{ color: COLORS.primary, fontSize: 12, fontWeight: '600' }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            width={CARD_W}
            onPress={() => onProductPress?.(product)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
