// components/FestiveSaleBanner.jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import tw from 'twrnc';
import { COLORS, FONTS, SHADOW, RADIUS } from '../assets/theme';

export default function FestiveSaleBanner() {
  return (
    <View
      style={[
        tw`mx-4 my-5`,
        {
          borderRadius: RADIUS.xl,
          overflow: 'hidden',
          height: 220,
          ...SHADOW.card,
        },
      ]}
    >
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800',
        }}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        {/* Gradient Overlay */}
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.45)',
          }}
        >
          {/* Top Badge */}
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
                letterSpacing: 1,
              }}
            >
              LIMITED TIME
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 26,
              fontFamily: FONTS.display,
              fontWeight: '700',
              color: '#fff',
              lineHeight: 32,
              marginBottom: 6,
            }}
          >
            Festive Collection
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 16,
            }}
          >
            Up to 60% off on bridal & festive wear
          </Text>

          {/* CTA */}
          <View style={tw`flex-row items-center gap-3`}>
            <TouchableOpacity
              style={[
                tw`px-5 py-2.5 rounded-full`,
                {
                  backgroundColor: COLORS.secondary,
                },
              ]}
            >
              <Text
                style={{
                  color: '#5C0000',
                  fontWeight: '700',
                  fontSize: 13,
                }}
              >
                Shop Now →
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                tw`px-5 py-2.5 rounded-full`,
                {
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.5)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              ]}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: 13,
                }}
              >
                View Looks
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}