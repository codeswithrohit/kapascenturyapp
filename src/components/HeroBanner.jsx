// components/HeroBanner.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import tw from 'twrnc';
import { COLORS, FONTS, SHADOW } from '../assets/theme';

const { width: SCREEN_W } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Festive\nCollection',
    subtitle: 'Celebrate every moment\nin timeless elegance',
    cta: 'Explore Now',
    badge: '🔥 Up to 50% OFF',
    image:
      'https://demo2-milano.myshopify.com/cdn/shop/files/fs8_2.webp?v=1758101571&width=660',
  },
  {
    id: '2',
    title: 'Bridal\nDreams',
    subtitle: 'Your perfect day deserves\na perfect ensemble',
    cta: 'Shop Bridal',
    badge: '💍 New Arrivals',
    image:
      'https://demo2-milano.myshopify.com/cdn/shop/files/fs8_12.webp?v=1758101571&width=660',
  },
  {
    id: '3',
    title: 'Flash\nSale',
    subtitle: 'Today only — grab your\nfavourite styles',
    cta: 'Grab Deals',
    badge: '⚡ 4hrs left',
    image:
      'https://images-static.nykaa.com/creatives/c1e2fc10-b3a3-48a9-8e67-0d9a1ee6d172/default.jpg?tr=cm-pad_resize,w-900',
  },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (activeIndex + 1) % SLIDES.length;
      scrollRef.current?.scrollTo({
        x: next * SCREEN_W,
        animated: true,
      });
      setActiveIndex(next);
    }, 3500);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleScroll = (e) => {
    const idx = Math.round(
      e.nativeEvent.contentOffset.x / SCREEN_W
    );
    setActiveIndex(idx);
  };

  return (
    <View style={{ marginTop: 10 }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {SLIDES.map((slide) => (
          <View
            key={slide.id}
            style={{
              width: SCREEN_W,
              paddingHorizontal: 12,
            }}
          >
            <View
              style={{
                height: 200,
                borderRadius: 20,
                overflow: 'hidden',
                ...SHADOW.card,
              }}
            >
              <ImageBackground
                source={{ uri: slide.image }}
                style={{ flex: 1 }}
                imageStyle={{ resizeMode: 'cover' }}
              >
                {/* Overlay */}
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    padding: 20,
                    justifyContent: 'center',
                  }}
                >
                  {/* Badge */}
                  <View
                    style={[
                      tw`self-start px-3 py-1 rounded-full mb-3`,
                      {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.3)',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: '600',
                      }}
                    >
                      {slide.badge}
                    </Text>
                  </View>

                  {/* Title */}
                  <Text
                    style={{
                      fontSize: 28,
                      fontFamily: FONTS.display,
                      fontWeight: '700',
                      color: '#fff',
                      lineHeight: 32,
                      marginBottom: 8,
                    }}
                  >
                    {slide.title}
                  </Text>

                  {/* Subtitle */}
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.85)',
                      marginBottom: 16,
                    }}
                  >
                    {slide.subtitle}
                  </Text>

                  {/* CTA */}
                  <TouchableOpacity
                    style={[
                      tw`self-start px-5 py-2.5 rounded-full`,
                      { backgroundColor: COLORS.secondary },
                    ]}
                  >
                    <Text
                      style={{
                        color: '#5C0000',
                        fontWeight: '700',
                        fontSize: 13,
                      }}
                    >
                      {slide.cta} →
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={tw`flex-row justify-center gap-1.5 py-3`}>
        {SLIDES.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              scrollRef.current?.scrollTo({
                x: i * SCREEN_W,
                animated: true,
              });
              setActiveIndex(i);
            }}
          >
            <View
              style={{
                height: 6,
                borderRadius: 3,
                backgroundColor:
                  i === activeIndex
                    ? COLORS.primary
                    : COLORS.border,
                width: i === activeIndex ? 24 : 6,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}