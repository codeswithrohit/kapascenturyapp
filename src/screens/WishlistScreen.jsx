// screens/WishlistScreen.jsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { COLORS, FONTS, SHADOW, PRODUCTS } from '../assets/theme';
import ProductCard from '../components/ProductCard';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_W = (SCREEN_W - 48) / 2;

export default function WishlistScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [wishlist] = useState(PRODUCTS.slice(0, 5));

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={[
        tw`px-4 pb-4`,
        { backgroundColor: COLORS.primary, paddingTop: insets.top + 12 }
      ]}>
        <Text style={{
          fontSize: 22,
          fontFamily: FONTS.heading,
          fontWeight: '700',
          color: '#fff',
        }}>
          ♥ Wishlist
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 2 }}>
          {wishlist.length} saved items
        </Text>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            width={CARD_W}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
