// screens/profile/TermsScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using the Kapas Century mobile application, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and others who access or use the Service.',
  },
  {
    title: '2. Use of the Service',
    content: 'Kapas Century grants you a limited, non-exclusive, non-transferable license to use the app for personal, non-commercial purposes. You may not use the service for any illegal or unauthorized purpose, transmit any harmful code, or attempt to gain unauthorized access to our systems.',
  },
  {
    title: '3. Privacy Policy',
    content: 'Your privacy is important to us. We collect personal information such as name, email, phone number, and shipping address to process orders and improve your experience. We do not sell your data to third parties. Data is stored securely using industry-standard encryption.',
  },
  {
    title: '4. Orders & Payments',
    content: 'All orders are subject to product availability and confirmation. Prices are in Indian Rupees (INR) and include applicable taxes. We accept UPI, cards, net banking, and cash on delivery. Payment is processed securely through certified payment gateways.',
  },
  {
    title: '5. Returns & Refunds',
    content: 'We offer a 15-day return policy for most products. Items must be in their original condition — unworn, unwashed, with all tags attached. Refunds are processed within 5–7 business days to the original payment method after return verification.',
  },
  {
    title: '6. Intellectual Property',
    content: 'All content on Kapas Century — including logos, images, text, and designs — is the property of Kapas Century Pvt. Ltd. and protected under Indian copyright laws. Unauthorized reproduction or distribution is strictly prohibited.',
  },
  {
    title: '7. Limitation of Liability',
    content: 'Kapas Century shall not be liable for any indirect, incidental, special or consequential damages arising from your use of the service. Our total liability shall not exceed the amount paid for the specific transaction giving rise to the claim.',
  },
  {
    title: '8. Contact Us',
    content: 'For any questions about these Terms & Conditions, please contact us at legal@kapascentury.com or write to Kapas Century Pvt. Ltd., 5th Floor, DLF Cyber City, Gurugram, Haryana — 122002, India.',
  },
];

export default function TermsScreen({ navigation }) {
  const [expanded, setExpanded] = useState(null);
  const [tab, setTab] = useState('terms');

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader title="Terms & Privacy" navigation={navigation} />

      {/* Tab */}
      <View style={tw`flex-row mx-3.5 mt-3.5 bg-[${COLORS.surface}] rounded-xl border border-[${COLORS.border}] p-1`}>
        {[
          { key: 'terms',   label: 'Terms of Use' },
          { key: 'privacy', label: 'Privacy Policy' },
        ].map(t => (
          <TouchableOpacity key={t.key} onPress={() => setTab(t.key)}
            style={[
              tw`flex-1 py-2 rounded-lg items-center`,
              tab === t.key && tw`bg-[${COLORS.primary}]`
            ]}>
            <Text style={[
              tw`text-[13px] font-semibold`,
              tab === t.key ? tw`text-white` : tw`text-[${COLORS.textSecondary}]`
            ]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`px-4 pb-8`}>
        <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mb-3.5`}>Last updated: January 15, 2026</Text>

        {SECTIONS.map((sec, i) => (
          <View key={i} style={tw`bg-[${COLORS.surface}] rounded-2xl mb-2 border border-[${COLORS.border}] overflow-hidden`}>
            <TouchableOpacity
              onPress={() => setExpanded(expanded === i ? null : i)}
              style={tw`flex-row items-center justify-between p-3.5`}
            >
              <Text style={tw`flex-1 text-[13px] font-bold text-[${COLORS.text}] leading-[18px] mr-2`}>
                {sec.title}
              </Text>
              <Icon
                name={expanded === i ? 'chevron-up' : 'chevron-down'}
                size={18} color={COLORS.textMuted}
              />
            </TouchableOpacity>
            {expanded === i && (
              <Text style={tw`text-[13px] text-[${COLORS.textSecondary}] leading-[21px] px-3.5 pb-3.5`}>
                {sec.content}
              </Text>
            )}
          </View>
        ))}

        <View style={tw`h-8`} />
      </ScrollView>
    </View>
  );
}