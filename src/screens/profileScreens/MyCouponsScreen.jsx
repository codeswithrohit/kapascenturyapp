// screens/profile/MyCouponsScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Clipboard, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const COUPONS = [
  {
    id: '1', code: 'SAVE10', title: '10% Off on All Orders',
    desc: 'Get flat 10% off on your order. Min order ₹500.',
    expiry: 'Apr 30, 2026', type: 'percent', value: '10%',
    icon: 'percent', color: '#8B0000', bg: '#FFF0F0',
    used: false,
  },
  {
    id: '2', code: 'FLAT200', title: '₹200 Off on ₹999+',
    desc: 'Flat ₹200 discount on orders above ₹999.',
    expiry: 'Mar 31, 2026', type: 'flat', value: '₹200',
    icon: 'tag-outline', color: '#1D4ED8', bg: '#EFF6FF',
    used: false,
  },
  {
    id: '3', code: 'KAPAS20', title: '20% Off — Exclusive Member',
    desc: 'Exclusive 20% off for Gold Members.',
    expiry: 'May 15, 2026', type: 'percent', value: '20%',
    icon: 'crown-outline', color: '#92400E', bg: '#FFFBEB',
    used: false,
  },
  {
    id: '4', code: 'FIRST50', title: '50% Off on First Order',
    desc: 'Welcome offer — 50% off on your first purchase!',
    expiry: 'Dec 31, 2026', type: 'percent', value: '50%',
    icon: 'gift-outline', color: '#065F46', bg: '#ECFDF5',
    used: true,
  },
];

export default function MyCouponsScreen({ navigation }) {
  const [copied, setCopied] = useState(null);
  const [tab, setTab] = useState('active');

  const copyCode = (code) => {
    Clipboard.setString(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const visibleCoupons = COUPONS.filter(c => tab === 'active' ? !c.used : c.used);

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader title="My Coupons" subtitle="Tap to copy and save more" navigation={navigation} />

      {/* Tabs */}
      <View style={tw`flex-row mx-3.5 mt-3.5 bg-[${COLORS.surface}] rounded-xl border border-[${COLORS.border}] p-1`}>
        {[
          { key: 'active', label: `Active (${COUPONS.filter(c => !c.used).length})` },
          { key: 'used',   label: `Used (${COUPONS.filter(c => c.used).length})` },
        ].map(t => (
          <TouchableOpacity
            key={t.key} onPress={() => setTab(t.key)}
            style={[
              tw`flex-1 py-2 rounded-lg items-center`,
              tab === t.key && tw`bg-[${COLORS.primary}]`
            ]}
          >
            <Text style={[
              tw`text-[13px] font-semibold`,
              tab === t.key ? tw`text-white` : tw`text-[${COLORS.textSecondary}]`
            ]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`px-4 pb-8`}>
        {visibleCoupons.length === 0 ? (
          <View style={tw`items-center pt-15 gap-3`}>
            <Icon name="ticket-percent-outline" size={56} color={COLORS.border} />
            <Text style={tw`text-[15px] text-[${COLORS.textMuted}]`}>No {tab} coupons</Text>
          </View>
        ) : (
          visibleCoupons.map(coupon => (
            <View key={coupon.id} style={[
              tw`flex-row bg-[${COLORS.surface}] rounded-2xl mb-3.5 overflow-hidden border border-[${COLORS.border}] shadow-lg`,
              coupon.used && tw`opacity-55`
            ]}>
              {/* Left bar */}
              <View style={[tw`w-[5px]`, { backgroundColor: coupon.color }]} />

              <View style={tw`flex-1 p-3.5`}>
                {/* Header */}
                <View style={tw`flex-row items-start gap-2.5 mb-3`}>
                  <View style={[tw`w-[42px] h-[42px] rounded-xl items-center justify-center`, { backgroundColor: coupon.bg }]}>
                    <Icon name={coupon.icon} size={20} color={coupon.color} />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-[13px] font-bold text-[${COLORS.text}] leading-[18px]`}>{coupon.title}</Text>
                    <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mt-0.5 leading-[15px]`}>{coupon.desc}</Text>
                  </View>
                  {/* Value badge */}
                  <View style={[tw`items-center justify-center px-2.5 py-1.5 rounded-[10px] min-w-[52px]`, { backgroundColor: coupon.bg }]}>
                    <Text style={[tw`text-[18px] font-black leading-5`, { color: coupon.color }]}>{coupon.value}</Text>
                    <Text style={[tw`text-[9px] font-bold leading-3`, { color: coupon.color }]}>OFF</Text>
                  </View>
                </View>

                {/* Dashed separator */}
                <View style={tw`flex-row gap-1 my-2.5 overflow-hidden`}>
                  {Array(20).fill(0).map((_, i) => (
                    <View key={i} style={tw`w-1.5 h-[1.5px] rounded-[1px] bg-[${COLORS.border}]`} />
                  ))}
                </View>

                {/* Footer */}
                <View style={tw`flex-row items-end justify-between`}>
                  <View>
                    <View style={[tw`border border-dashed px-2.5 py-1.25 rounded-lg mb-1`, { borderColor: coupon.color + '50', backgroundColor: coupon.bg }]}>
                      <Text style={[tw`text-sm font-black tracking-wider`, { color: coupon.color }]}>{coupon.code}</Text>
                    </View>
                    <Text style={tw`text-[10px] text-[${COLORS.textMuted}]`}>
                      <Icon name="clock-outline" size={10} color={COLORS.textMuted} /> Expires {coupon.expiry}
                    </Text>
                  </View>

                  {!coupon.used ? (
                    <TouchableOpacity
                      onPress={() => copyCode(coupon.code)}
                      style={[tw`flex-row items-center gap-1.25 px-3.5 py-2.25 rounded-[10px]`, { backgroundColor: coupon.color }]}
                    >
                      <Icon name={copied === coupon.code ? 'check' : 'content-copy'} size={14} color="#fff" />
                      <Text style={tw`text-white font-bold text-xs`}>
                        {copied === coupon.code ? 'Copied!' : 'Copy Code'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={tw`flex-row items-center gap-1`}>
                      <Icon name="check-circle-outline" size={14} color={COLORS.textMuted} />
                      <Text style={tw`text-[12px] text-[${COLORS.textMuted}]`}>Used</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}