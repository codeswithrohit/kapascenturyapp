// components/PromoBanner.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc';
import { COLORS, SHADOW } from '../assets/theme';

// Countdown Timer hook
function useCountdown(seconds) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const hrs = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const mins = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  return { hrs, mins, secs };
}



export function OfferStrip() {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const t = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
      setIndex((i) => (i + 1) % OFFERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);


}

// Flash Sale Banner with countdown
export function FlashSaleBanner() {
  const { hrs, mins, secs } = useCountdown(4 * 3600 + 23 * 60 + 45);

  return (
    <View style={[
      tw`mx-4 my-3 rounded-2xl overflow-hidden`,
      { backgroundColor: '#1A0A0A', ...SHADOW.card }
    ]}>
      {/* Top part */}
      <View style={tw`flex-row items-center justify-between px-4 pt-4 pb-3`}>
        <View>
          <Text style={{ color: COLORS.secondary, fontSize: 11, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' }}>
            ⚡ Flash Sale
          </Text>
          <Text style={{ color: '#fff', fontSize: 19, fontWeight: '700', marginTop: 2 }}>
            Ends In
          </Text>
        </View>

        {/* Countdown */}
        <View style={tw`flex-row items-center gap-2`}>
          {[hrs, mins, secs].map((unit, i) => (
            <React.Fragment key={i}>
              <View style={[
                tw`items-center justify-center rounded-lg`,
                { width: 46, height: 46, backgroundColor: COLORS.primary }
              ]}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>{unit}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9 }}>
                  {['HRS', 'MIN', 'SEC'][i]}
                </Text>
              </View>
              {i < 2 && <Text style={{ color: COLORS.secondary, fontSize: 22, fontWeight: '800' }}>:</Text>}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Divider */}
      <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginHorizontal: 16 }} />

      {/* Bottom CTA */}
      <TouchableOpacity style={[
        tw`flex-row items-center justify-between px-4 py-3`,
      ]}>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
          Deals curated specially for you
        </Text>
        <View style={[
          tw`px-4 py-1.5 rounded-full`,
          { backgroundColor: COLORS.secondary }
        ]}>
          <Text style={{ color: '#5C0000', fontWeight: '700', fontSize: 12 }}>
            Shop →
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// Wide promo card
export function PromoBannerCard({ emoji, title, subtitle, cta, bgColor, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.88}
      style={[
        tw`mx-4 my-2 rounded-2xl flex-row items-center px-5 py-4 overflow-hidden`,
        { backgroundColor: bgColor || COLORS.primary, ...SHADOW.card }
      ]}
    >
      {/* Decorative blob */}
      <View style={{
        position: 'absolute', right: -30, top: -30,
        width: 120, height: 120, borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.06)',
      }} />

      <Text style={{ fontSize: 36, marginRight: 16 }}>{emoji}</Text>
      <View style={tw`flex-1`}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', lineHeight: 22 }}>
          {title}
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>
          {subtitle}
        </Text>
      </View>
      <View style={[
        tw`px-3 py-1.5 rounded-full`,
        { backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' }
      ]}>
        <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>{cta}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default PromoBannerCard;
