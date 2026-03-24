// screens/CategoryScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS, FONTS, SHADOW, PRODUCTS } from '../assets/theme';
import ProductCard from '../components/ProductCard';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_W = (SCREEN_W - 48) / 2;

const SORT_OPTIONS = ['Popular', 'Price: Low-High', 'Price: High-Low', 'Newest', 'Rating'];
const FILTERS = ['All', 'Sarees', 'Lehengas', 'Suits', 'Kurtas', 'Accessories'];

export default function CategoryScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('Popular');
  const [sortOpen, setSortOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeFilter === 'All' || p.category === activeFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      
      {/* 🔥 Status Bar Fix */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* 🔥 HEADER */}
      <View
        style={[
          tw`px-4 pb-3`,
          {
            backgroundColor: COLORS.primary,
            paddingTop: insets.top + 10,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: FONTS.heading,
            fontWeight: '700',
            color: '#fff',
            marginBottom: 10,
          }}
        >
          Shop
        </Text>

        {/* 🔍 SEARCH BAR */}
        <View
          style={[
            tw`flex-row items-center px-4 py-2 rounded-full`,
            { backgroundColor: 'rgba(255,255,255,0.15)' },
          ]}
        >
          <Icon name="search-outline" size={18} color="rgba(255,255,255,0.7)" />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search products..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={{
              flex: 1,
              color: '#fff',
              fontSize: 14,
              marginLeft: 8,
            }}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon name="close-circle" size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* CATEGORY FILTERS */}
      <View
        style={{
          backgroundColor: COLORS.surface,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[
                tw`px-4 py-2 rounded-full mr-2`,
                {
                  backgroundColor:
                    activeFilter === f ? COLORS.primary : COLORS.surfaceWarm,
                  borderWidth: 1,
                  borderColor:
                    activeFilter === f ? COLORS.primary : COLORS.border,
                },
              ]}
            >
              <Text
                style={{
                  color: activeFilter === f ? '#fff' : COLORS.textSecondary,
                  fontWeight: activeFilter === f ? '700' : '500',
                  fontSize: 13,
                }}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* SORT BAR */}
      <View
        style={[
          tw`flex-row items-center justify-between px-4 py-2.5`,
          { backgroundColor: COLORS.surface },
        ]}
      >
        <Text style={{ color: COLORS.textSecondary, fontSize: 13 }}>
          <Text style={{ fontWeight: '700', color: COLORS.text }}>
            {filtered.length}
          </Text>{' '}
          products
        </Text>

        <TouchableOpacity
          onPress={() => setSortOpen(!sortOpen)}
          style={[
            tw`flex-row items-center px-3 py-1.5 rounded-lg`,
            { borderWidth: 1, borderColor: COLORS.border },
          ]}
        >
          <Icon name="swap-vertical-outline" size={14} color={COLORS.text} />
          <Text style={{ fontSize: 13, color: COLORS.text, marginLeft: 4 }}>
            {activeSort}
          </Text>
          <Icon name="chevron-down" size={14} color={COLORS.textMuted} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

      {/* SORT DROPDOWN */}
      {sortOpen && (
        <View
          style={[
            tw`absolute z-10 right-4 rounded-xl overflow-hidden`,
            {
              top: insets.top + 130,
              ...SHADOW.heavy,
              backgroundColor: COLORS.surface,
            },
          ]}
        >
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              onPress={() => {
                setActiveSort(opt);
                setSortOpen(false);
              }}
              style={[
                tw`px-5 py-3`,
                { borderBottomWidth: 1, borderColor: COLORS.border },
              ]}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: activeSort === opt ? '700' : '400',
                  color:
                    activeSort === opt ? COLORS.primary : COLORS.text,
                }}
              >
                {activeSort === opt ? '✓ ' : ''}
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* PRODUCT GRID */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            width={CARD_W}
            onPress={() =>
              navigation.navigate('ProductDetail', { product: item })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}