// components/Testimonials.jsx
import React from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import tw from 'twrnc';
import { COLORS, FONTS, SHADOW, RADIUS } from '../assets/theme';

const { width: SCREEN_W } = Dimensions.get('window');

const REVIEWS = [
  {
    id: '1',
    name: 'Priya Sharma',
    city: 'Delhi',
    rating: 5,
    text: 'Absolutely love the Banarasi saree I ordered! The fabric quality is exceptional and the embroidery is stunning. Will definitely order again.',
    product: 'Banarasi Silk Saree',
    image: 'https://picsum.photos/seed/priya/80/80',
    date: '2 days ago',
    verified: true,
  },
  {
    id: '2',
    name: 'Ananya Reddy',
    city: 'Hyderabad',
    rating: 5,
    text: 'The lehenga I bought for my sister\'s wedding was beyond beautiful. Everyone kept asking where I got it from!',
    product: 'Designer Lehenga',
    image: 'https://picsum.photos/seed/ananya/80/80',
    date: '1 week ago',
    verified: true,
  },
  {
    id: '3',
    name: 'Meera Iyer',
    city: 'Mumbai',
    rating: 4,
    text: 'Great quality and fast delivery. The packaging was premium. The kurta set is so comfortable yet elegant.',
    product: 'Silk Kurti Set',
    image: 'https://picsum.photos/seed/meera/80/80',
    date: '3 days ago',
    verified: true,
  },
  {
    id: '4',
    name: 'Kavitha Nair',
    city: 'Bangalore',
    rating: 5,
    text: 'Ordered for Onam celebration. The kasavu saree is pure tradition — beautiful weave, great color, arrived on time!',
    product: 'Kasavu Saree',
    image: 'https://picsum.photos/seed/kavitha/80/80',
    date: '5 days ago',
    verified: true,
  },
];

function StarRating({ rating }) {
  return (
    <View style={tw`flex-row`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text key={star} style={{ fontSize: 12, color: star <= rating ? '#F59E0B' : '#D1D5DB' }}>
          ★
        </Text>
      ))}
    </View>
  );
}

export default function Testimonials() {
  return (
    <View style={tw`py-5`}>
      {/* Header */}
      <View style={tw`px-4 mb-4`}>
        <Text style={{
          fontSize: 20,
          fontFamily: FONTS.heading,
          fontWeight: '700',
          color: COLORS.text,
        }}>
          Happy Customers
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 8 }}>
          <View style={{ height: 2.5, width: 40, backgroundColor: COLORS.primary, borderRadius: 2 }} />
          <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
            10,000+ 5-star reviews
          </Text>
        </View>
      </View>

      {/* Review Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {REVIEWS.map((review) => (
          <View
            key={review.id}
            style={[
              {
                width: SCREEN_W * 0.75,
                backgroundColor: COLORS.surface,
                borderRadius: RADIUS.lg,
                padding: 16,
                borderWidth: 1,
                borderColor: COLORS.border,
                ...SHADOW.soft,
              }
            ]}
          >
            {/* Quote mark */}
            <Text style={{
              fontSize: 36,
              color: COLORS.primary,
              fontFamily: FONTS.display,
              lineHeight: 36,
              marginBottom: 4,
              opacity: 0.3,
            }}>
              "
            </Text>

            <Text style={{
              fontSize: 13,
              color: COLORS.textSecondary,
              lineHeight: 20,
              marginBottom: 12,
              fontStyle: 'italic',
            }}>
              {review.text}
            </Text>

            {/* Product tag */}
            <View style={[
              tw`self-start px-2.5 py-1 rounded-full mb-3`,
              { backgroundColor: COLORS.surfaceWarm, borderWidth: 1, borderColor: COLORS.border }
            ]}>
              <Text style={{ color: COLORS.primary, fontSize: 10, fontWeight: '600' }}>
                🛍 {review.product}
              </Text>
            </View>

            {/* Divider */}
            <View style={{ height: 1, backgroundColor: COLORS.border, marginBottom: 12 }} />

            {/* Reviewer */}
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`flex-row items-center gap-2.5`}>
                <Image
                  source={{ uri: review.image }}
                  style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.border }}
                />
                <View>
                  <View style={tw`flex-row items-center gap-1.5`}>
                    <Text style={{ fontWeight: '600', fontSize: 13, color: COLORS.text }}>
                      {review.name}
                    </Text>
                    {review.verified && (
                      <Text style={{ fontSize: 10 }}>✅</Text>
                    )}
                  </View>
                  <Text style={{ color: COLORS.textMuted, fontSize: 11 }}>
                    {review.city} · {review.date}
                  </Text>
                </View>
              </View>
              <StarRating rating={review.rating} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
