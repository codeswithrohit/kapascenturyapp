// screens/HomeScreen.jsx
import React from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import tw from 'twrnc';
import { COLORS, PRODUCTS } from '../assets/theme';

import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import ProductRow from '../components/ProductRow';
import { FlashSaleBanner, PromoBannerCard } from '../components/PromoBanner';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import FestiveSaleBanner from '../components/FestiveSaleBanner';
import InTheSpotlight from '../components/InTheSpotlight';

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const bestSellers = PRODUCTS.filter((_, i) => i < 6);
  const newArrivals = PRODUCTS.filter((_, i) => i >= 2 && i < 7);
  const trending = PRODUCTS.filter((_, i) => i % 2 === 0);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Hero Carousel */}
        <HeroBanner />

        {/* Category pills */}
        <CategoryGrid />

        {/* Separator */}
        <View
          style={{ height: 8, backgroundColor: COLORS.border, opacity: 0.5 }}
        />

        {/* Promo banners */}
        <PromoBannerCard
          emoji="🥻"
          title="Body Care · Skincare · Makeup"
          subtitle="Complete your look, inside & out"
          cta="Shop"
          bgColor={COLORS.primary}
        />
        <PromoBannerCard
          emoji="✨"
          title="Bright Looks for Special Moments"
          subtitle="New collection just dropped"
          cta="Explore"
          bgColor="#9B2335"
        />

        {/* Separator */}
        <View
          style={{ height: 8, backgroundColor: COLORS.border, opacity: 0.5 }}
        />

        {/* Best Selling */}
        <ProductRow
          title="Best Selling"
          subtitle="Our customers' top picks"
          products={bestSellers}
          showBadge
          badgeText="🔥 TRENDING"
          onViewAll={() => {}}
          onProductPress={p =>
            navigation.navigate('ProductDetail', { product: p })
          }
        />

        {/* In the Spotlight */}
        <InTheSpotlight />

        {/* Separator */}
        <View
          style={{ height: 8, backgroundColor: COLORS.border, opacity: 0.5 }}
        />

        {/* New Arrivals */}
        <ProductRow
          title="Curated For You"
          subtitle="Handpicked based on your taste"
          products={newArrivals}
          showBadge
          badgeText="✨ PERSONALISED"
          onViewAll={() => {}}
          onProductPress={p =>
            navigation.navigate('ProductDetail', { product: p })
          }
        />

        {/* Flash Sale */}
        <FlashSaleBanner />

        {/* Separator */}
        <View
          style={{ height: 8, backgroundColor: COLORS.border, opacity: 0.5 }}
        />

        {/* Trending Collection */}
        <ProductRow
          title="Trending Collection"
          subtitle="What everyone's buying right now"
          products={trending}
          onViewAll={() => {}}
          onProductPress={p =>
            navigation.navigate('ProductDetail', { product: p })
          }
        />

        {/* Festive Sale Banner */}
        <FestiveSaleBanner />

        {/* Testimonials */}
        <Testimonials />

        {/* Footer */}
        <Footer />
      </ScrollView>
    </View>
  );
}
