// screens/profile/SupportScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const FAQS = [
  { q: 'How do I track my order?',             a: 'Go to Profile → Track Order and enter your order ID. You can also find the tracking link in your order confirmation email.' },
  { q: 'What is the return policy?',            a: 'We offer easy 15-day returns for most products. Items must be unworn, unwashed and with original tags. Go to Returns & Exchanges to initiate.' },
  { q: 'How long does delivery take?',          a: 'Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available in select cities.' },
  { q: 'Can I change or cancel my order?',      a: 'Orders can be cancelled within 24 hours of placing. After that, you can initiate a return once delivered.' },
  { q: 'Are products authentic?',               a: 'Yes! All products on Kapas Century are 100% authentic and sourced directly from verified weavers and artisans.' },
  { q: 'How do I apply a coupon code?',         a: 'Go to your Cart and tap "Apply Coupon". Enter your code and tap Apply. Valid codes will reflect instantly.' },
];

const CONTACT_OPTIONS = [
  { icon: 'chat-processing-outline', label: 'Live Chat',    sub: 'Chat with us 24/7',          color: '#1D4ED8', bg: '#EFF6FF', action: () => {} },
  { icon: 'email-outline',           label: 'Email Us',     sub: 'support@kapascentury.com',   color: '#065F46', bg: '#ECFDF5', action: () => Linking.openURL('mailto:support@kapascentury.com') },
  { icon: 'phone-outline',           label: 'Call Us',      sub: '1800-XXX-XXXX (Toll Free)',  color: '#92400E', bg: '#FFFBEB', action: () => Linking.openURL('tel:1800000000') },
  { icon: 'instagram',               label: 'Instagram DM', sub: '@kapascentury',               color: '#9333EA', bg: '#FAF5FF', action: () => {} },
];

export default function SupportScreen({ navigation }) {
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState('');

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader title="Help & Support" subtitle="We're here for you" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4`}>

        {/* Search */}
        <View style={tw`flex-row items-center gap-2.5 bg-[${COLORS.surface}] rounded-2xl px-3.5 py-3 border border-[${COLORS.border}] mb-5 shadow-lg`}>
          <Icon name="magnify" size={20} color={COLORS.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search for help..."
            placeholderTextColor={COLORS.textMuted}
            style={tw`flex-1 text-sm text-[${COLORS.text}] py-0`}
          />
        </View>

        {/* Contact options */}
        <Text style={tw`text-[15px] font-bold text-[${COLORS.text}] mb-3`}>Contact Us</Text>
        <View style={tw`flex-row flex-wrap gap-2.5`}>
          {CONTACT_OPTIONS.map(opt => (
            <TouchableOpacity key={opt.label} onPress={opt.action} style={[tw`w-[47%] rounded-2xl p-3.5 items-start`, { backgroundColor: opt.bg }]}>
              <View style={[tw`w-11 h-11 rounded-xl items-center justify-center mb-2.5`, { backgroundColor: opt.color + '20' }]}>
                <Icon name={opt.icon} size={22} color={opt.color} />
              </View>
              <Text style={[tw`text-[13px] font-bold mb-0.75`, { color: opt.color }]}>{opt.label}</Text>
              <Text style={tw`text-[11px] text-[${COLORS.textMuted}] leading-[15px]`}>{opt.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQs */}
        <Text style={[tw`text-[15px] font-bold text-[${COLORS.text}] mb-3`, tw`mt-5`]}>Frequently Asked Questions</Text>
        <View style={tw`bg-[${COLORS.surface}] rounded-2xl border border-[${COLORS.border}] overflow-hidden shadow-lg`}>
          {FAQS.map((faq, i) => (
            <View key={i}>
              <TouchableOpacity
                onPress={() => setExpanded(expanded === i ? null : i)}
                style={tw`flex-row items-center justify-between p-3.5`}
              >
                <Text style={tw`flex-1 text-[13px] font-semibold text-[${COLORS.text}] leading-[18px] mr-2`}>{faq.q}</Text>
                <Icon
                  name={expanded === i ? 'chevron-up' : 'chevron-down'}
                  size={18} color={COLORS.textMuted}
                />
              </TouchableOpacity>
              {expanded === i && (
                <View style={tw`px-3.5 pb-3.5`}>
                  <Text style={tw`text-[13px] text-[${COLORS.textSecondary}] leading-5`}>{faq.a}</Text>
                </View>
              )}
              {i < FAQS.length - 1 && <View style={tw`h-px bg-[${COLORS.border}]`} />}
            </View>
          ))}
        </View>

        {/* Ticket */}
        <View style={tw`flex-row items-center gap-3 bg-[${COLORS.surfaceWarm}] rounded-2xl p-3.5 mt-3.5 border border-[${COLORS.border}]`}>
          <Icon name="ticket-confirmation-outline" size={22} color={COLORS.primary} />
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-bold text-[${COLORS.text}]`}>Still need help?</Text>
            <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mt-0.5 leading-4`}>
              Create a support ticket and we'll respond within 24 hours.
            </Text>
          </View>
          <TouchableOpacity style={tw`px-3 py-1.75 rounded-[10px] bg-[${COLORS.primary}]`}>
            <Text style={tw`text-white font-bold text-xs`}>Raise Ticket</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`h-8`} />
      </ScrollView>
    </View>
  );
}