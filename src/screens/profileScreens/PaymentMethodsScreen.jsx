// screens/profile/PaymentMethodsScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const SAVED_CARDS = [
  { id: '1', type: 'visa',       last4: '4242', name: 'Priya Sharma',   expiry: '08/27', isDefault: true  },
  { id: '2', type: 'mastercard', last4: '5678', name: 'Priya Sharma',   expiry: '03/26', isDefault: false },
];

const UPI_APPS = [
  { id: 'gpay',    label: 'Google Pay',  icon: 'google',    upiId: 'priya@okicici' },
  { id: 'phonepe', label: 'PhonePe',     icon: 'phone',     upiId: 'priya@ybl' },
];

const OTHER_OPTIONS = [
  { icon: 'bank-outline',        label: 'Net Banking',          sub: '50+ banks supported' },
  { icon: 'wallet-outline',      label: 'Kapas Wallet',         sub: '₹1,250 available', color: COLORS.success },
  { icon: 'cash',                label: 'Cash on Delivery',     sub: 'Available for your area' },
  { icon: 'credit-card-refund',  label: 'EMI Options',          sub: '0% EMI from ₹499/month' },
];

export default function PaymentMethodsScreen({ navigation }) {
  const [cards, setCards] = useState(SAVED_CARDS);

  const deleteCard = (id) =>
    Alert.alert('Remove Card', 'Remove this card from your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => setCards(c => c.filter(card => card.id !== id)) },
    ]);

  const setDefault = (id) =>
    setCards(c => c.map(card => ({ ...card, isDefault: card.id === id })));

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader title="Payment Methods" subtitle="Manage cards & UPI" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4`}>

        {/* Saved Cards */}
        <Text style={tw`text-[10px] font-bold text-[${COLORS.textMuted}] tracking-wider mb-2.5 ml-0.5`}>
          SAVED CARDS
        </Text>
        {cards.map(card => (
          <View key={card.id} style={[
            tw`bg-[${COLORS.surface}] rounded-2xl p-3.5 mb-2.5 border border-[${COLORS.border}] shadow-lg`,
            card.isDefault && tw`border-2 border-[${COLORS.primary}]`
          ]}>
            <View style={tw`flex-row items-center gap-3`}>
              <View style={tw`w-10 h-10 rounded-xl bg-[${COLORS.surfaceWarm}] items-center justify-center`}>
                <Icon name="credit-card-outline" size={22} color={COLORS.primary} />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-sm font-bold text-[${COLORS.text}]`}>
                  {card.type.toUpperCase()} •••• {card.last4}
                </Text>
                <Text style={tw`text-xs text-[${COLORS.textMuted}] mt-0.5`}>
                  {card.name} · Expires {card.expiry}
                </Text>
              </View>
              {card.isDefault && (
                <View style={tw`flex-row items-center gap-0.75 px-2 py-0.75 rounded-full bg-[${COLORS.surfaceWarm}]`}>
                  <Text style={tw`text-[10px] font-bold text-[${COLORS.primary}]`}>Default</Text>
                </View>
              )}
            </View>
            <View style={tw`flex-row gap-2 mt-2.5 pt-2.5 border-t border-[${COLORS.border}]`}>
              {!card.isDefault && (
                <TouchableOpacity onPress={() => setDefault(card.id)} style={tw`flex-row items-center gap-1 px-3 py-1.25 rounded-full border border-[${COLORS.border}]`}>
                  <Text style={tw`text-[11px] font-semibold text-[${COLORS.primary}]`}>Set Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => deleteCard(card.id)} style={tw`flex-row items-center gap-1 px-3 py-1.25 rounded-full border border-[#FECACA]`}>
                <Icon name="delete-outline" size={13} color="#EF4444" />
                <Text style={tw`text-[11px] font-semibold text-[#EF4444]`}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={tw`flex-row items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-[${COLORS.primary}] bg-[${COLORS.surface}]`}>
          <Icon name="credit-card-plus-outline" size={20} color={COLORS.primary} />
          <Text style={tw`text-[14px] font-bold text-[${COLORS.primary}]`}>Add New Card</Text>
        </TouchableOpacity>

        {/* UPI */}
        <Text style={[tw`text-[10px] font-bold text-[${COLORS.textMuted}] tracking-wider mb-2.5 ml-0.5`, tw`mt-5`]}>
          UPI APPS
        </Text>
        {UPI_APPS.map(upi => (
          <View key={upi.id} style={tw`bg-[${COLORS.surface}] rounded-2xl p-3.5 mb-2.5 border border-[${COLORS.border}] shadow-lg`}>
            <View style={tw`flex-row items-center gap-3`}>
              <View style={tw`w-10 h-10 rounded-xl bg-[${COLORS.surfaceWarm}] items-center justify-center`}>
                <Icon name={upi.icon} size={20} color={COLORS.primary} />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-sm font-bold text-[${COLORS.text}]`}>{upi.label}</Text>
                <Text style={tw`text-xs text-[${COLORS.textMuted}] mt-0.5`}>{upi.upiId}</Text>
              </View>
              <View style={tw`flex-row items-center gap-0.75 px-2 py-0.75 rounded-full bg-[#F0FDF4]`}>
                <Icon name="check-circle" size={11} color={COLORS.success} />
                <Text style={tw`text-[10px] font-bold text-[${COLORS.success}]`}>Linked</Text>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={tw`flex-row items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-[${COLORS.primary}] bg-[${COLORS.surface}]`}>
          <Icon name="plus-circle-outline" size={20} color={COLORS.primary} />
          <Text style={tw`text-[14px] font-bold text-[${COLORS.primary}]`}>Add UPI ID</Text>
        </TouchableOpacity>

        {/* Other options */}
        <Text style={[tw`text-[10px] font-bold text-[${COLORS.textMuted}] tracking-wider mb-2.5 ml-0.5`, tw`mt-5`]}>
          OTHER PAYMENT OPTIONS
        </Text>
        <View style={tw`bg-[${COLORS.surface}] rounded-2xl border border-[${COLORS.border}] shadow-lg overflow-hidden`}>
          {OTHER_OPTIONS.map((opt, i) => (
            <View key={opt.label}>
              <TouchableOpacity style={tw`flex-row items-center gap-3 px-3.5 py-3.25`}>
                <View style={tw`w-10 h-10 rounded-xl bg-[${COLORS.surfaceWarm}] items-center justify-center`}>
                  <Icon name={opt.icon} size={19} color={opt.color || COLORS.primary} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-sm font-bold text-[${COLORS.text}]`}>{opt.label}</Text>
                  <Text style={tw`text-xs text-[${COLORS.textMuted}] mt-0.5`}>{opt.sub}</Text>
                </View>
                <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
              {i < OTHER_OPTIONS.length - 1 && <View style={tw`h-px bg-[${COLORS.border}] mx-3.5`} />}
            </View>
          ))}
        </View>

        <View style={tw`h-8`} />
      </ScrollView>
    </View>
  );
}