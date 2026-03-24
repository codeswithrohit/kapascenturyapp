// components/CategoryGrid.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { COLORS, FONTS, SHADOW, CATEGORIES } from '../assets/theme';

export default function CategoryGrid() {
  return (
    <View style={tw`py-5`}>
      {/* Section Header */}
      <View style={tw`flex-row justify-between items-center px-4 mb-4`}>
        <View>
          <Text style={{
            fontSize: 20,
            fontFamily: FONTS.heading,
            fontWeight: '700',
            color: COLORS.text,
          }}>
            Shop by Category
          </Text>
          <View style={[
            { height: 2.5, width: 48, borderRadius: 2, backgroundColor: COLORS.primary, marginTop: 4 }
          ]} />
        </View>
        <TouchableOpacity>
          <Text style={{ color: COLORS.primary, fontSize: 13, fontWeight: '600' }}>
            View All →
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal scroll row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {CATEGORIES.map((cat, i) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.75}
            style={[
              tw`items-center`,
              { width: 72 }
            ]}
          >
            {/* Circle */}
            <View style={[
              tw`items-center justify-center mb-2`,
              {
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: COLORS.surfaceWarm,
                borderWidth: 2,
                borderColor: COLORS.border,
                ...SHADOW.soft,
              }
            ]}>
              <Text style={{ fontSize: 28 }}>{cat.emoji}</Text>
            </View>
            <Text style={{
              fontSize: 11.5,
              fontWeight: '600',
              color: COLORS.text,
              textAlign: 'center',
              lineHeight: 15,
            }}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
