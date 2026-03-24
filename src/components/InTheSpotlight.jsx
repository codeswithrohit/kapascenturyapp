// components/InTheSpotlight.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import tw from 'twrnc';
import { COLORS, FONTS, SHADOW, RADIUS } from '../assets/theme';

const { width: SCREEN_W } = Dimensions.get('window');

const SPOTLIGHT = [
  {
    id: '1',
    brand: "L'Oréal Paris",
    title: 'Kajal Magique',
    subtitle: 'Intense. Smudge-proof. All day.',
    cta: 'Know More',
    bg: '#1A0A0A',
    textColor: '#fff',
    image: 'https://images-static.nykaa.com/creatives/0e882d2c-a42e-485b-a2ac-c3246657d113/default.jpg?tr=cm-pad_resize,w-900',
    tag: 'AD',
  },
  {
    id: '2',
    brand: 'Kapas Story',
    title: 'Celebrating\nIndividuality',
    subtitle: 'Fashion that celebrates you',
    cta: 'Our Story',
    bg: COLORS.primary,
    textColor: '#fff',
    image: 'https://images-static.nykaa.com/creatives/1c55db7a-b7bb-4a36-bc21-6c343342cef6/default.jpg?tr=cm-pad_resize,w-900',
    tag: 'BRAND',
  },
];

export default function InTheSpotlight() {
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
          In The Spotlight
        </Text>
        <View style={{ height: 2.5, width: 40, backgroundColor: COLORS.primary, marginTop: 6, borderRadius: 2 }} />
      </View>

      {/* Spotlight Cards */}
      <View style={tw`px-4 gap-3`}>
        {SPOTLIGHT.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={[
              tw`rounded-2xl overflow-hidden`,
              { height: 160, ...SHADOW.card }
            ]}
          >
            <Image
              source={{ uri: item.image }}
              style={{ ...tw`absolute inset-0`, width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            {/* Dark overlay */}
            {/* <View style={{
              position: 'absolute', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }} /> */}

            {/* Content */}
            <View style={tw`flex-1 p-4 justify-between`}>
              {/* Top row */}
              {/* <View style={tw`flex-row justify-between items-start`}>
                <View style={[
                  tw`px-2.5 py-1 rounded-full`,
                  { backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }
                ]}>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
                    {item.brand.toUpperCase()}
                  </Text>
                </View>
                <View style={[
                  tw`px-2 py-0.5 rounded`,
                  { backgroundColor: COLORS.secondary }
                ]}>
                  <Text style={{ color: '#5C0000', fontSize: 9, fontWeight: '700' }}>
                    {item.tag}
                  </Text>
                </View>
              </View> */}

              {/* Bottom */}
              {/* <View style={tw`flex-row items-end justify-between`}>
                <View>
                  <Text style={{
                    color: '#fff',
                    fontSize: 20,
                    fontFamily: FONTS.display,
                    fontWeight: '700',
                    lineHeight: 24,
                  }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 }}>
                    {item.subtitle}
                  </Text>
                </View>
                <View style={[
                  tw`px-4 py-2 rounded-full`,
                  { backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' }
                ]}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>{item.cta}</Text>
                </View>
              </View> */}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
