// screens/profile/TrackOrderScreen.jsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const STEPS = [
  { id: 1, label: 'Order Placed',    sub: 'Mar 10, 2026 · 10:23 AM', icon: 'check-circle',      done: true,  active: false },
  { id: 2, label: 'Order Confirmed', sub: 'Mar 10, 2026 · 11:05 AM', icon: 'clipboard-check',   done: true,  active: false },
  { id: 3, label: 'Shipped',         sub: 'Mar 11, 2026 · 2:40 PM',  icon: 'package-variant',   done: true,  active: false },
  { id: 4, label: 'Out for Delivery',sub: 'Mar 13, 2026 · 9:10 AM',  icon: 'truck-delivery',    done: false, active: true  },
  { id: 5, label: 'Delivered',       sub: 'Expected Mar 13, 2026',   icon: 'home-circle-outline',done: false, active: false },
];

const ORDER = {
  id: '#KP2714',
  date: 'Mar 10, 2026',
  amount: 4599,
  items: [{ name: 'Banarasi Silk Saree', size: 'M', qty: 1, price: 4599 }],
  address: '42, Lotus Lane, Sector 18, Noida — 201301',
  courier: 'Delhivery Express',
  awb: 'DL8823744910',
  expectedDelivery: 'Today by 7 PM',
};

export default function TrackOrderScreen({ navigation, route }) {
  const orderId = route?.params?.orderId || ORDER.id;

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader
        title="Track Order"
        subtitle={orderId}
        navigation={navigation}
        rightIcon="share-variant-outline"
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4`}>

        {/* Delivery ETA card */}
        <View style={tw`flex-row items-center justify-between bg-[${COLORS.primary}] rounded-2xl p-[18px] mb-3 shadow-lg`}>
          <View>
            <Text style={tw`text-white/65 text-xs`}>Expected Delivery</Text>
            <Text style={tw`text-white text-[20px] font-extrabold mt-0.5`}>{ORDER.expectedDelivery}</Text>
          </View>
          <View style={tw`w-16 h-16 rounded-full bg-white/15 items-center justify-center`}>
            <Icon name="truck-fast-outline" size={36} color={COLORS.primary} />
          </View>
        </View>

        {/* Courier info */}
        <View style={tw`bg-[${COLORS.surface}] rounded-2xl mb-3 p-3.5 border border-[${COLORS.border}] shadow-lg`}>
          <View style={tw`flex-row items-center gap-2.5 py-1.5`}>
            <Icon name="package-variant-closed" size={18} color={COLORS.primary} />
            <Text style={tw`flex-1 text-[13px] text-[${COLORS.textSecondary}]`}>Courier Partner</Text>
            <Text style={tw`text-[13px] font-bold text-[${COLORS.text}]`}>{ORDER.courier}</Text>
          </View>
          <View style={tw`h-px bg-[${COLORS.border}] my-1`} />
          <View style={tw`flex-row items-center gap-2.5 py-1.5`}>
            <Icon name="barcode-scan" size={18} color={COLORS.primary} />
            <Text style={tw`flex-1 text-[13px] text-[${COLORS.textSecondary}]`}>Tracking ID</Text>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`text-[13px] font-bold text-[${COLORS.text}]`}>{ORDER.awb}</Text>
              <TouchableOpacity style={tw`p-1 rounded-md bg-[${COLORS.surfaceWarm}]`}>
                <Icon name="content-copy" size={12} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={tw`bg-[${COLORS.surface}] rounded-2xl p-4 mb-3 border border-[${COLORS.border}] shadow-lg`}>
          <Text style={tw`text-sm font-bold text-[${COLORS.text}] mb-3`}>Delivery Timeline</Text>
          {STEPS.map((step, i) => (
            <View key={step.id} style={tw`flex-row gap-3.5 min-h-[60px]`}>
              {/* Icon + line */}
              <View style={tw`items-center w-8`}>
                <View style={[
                  tw`w-8 h-8 rounded-full items-center justify-center border-2 border-[${COLORS.border}] bg-[${COLORS.surface}]`,
                  step.done && tw`bg-[${COLORS.success}] border-[${COLORS.success}]`,
                  step.active && tw`border-[${COLORS.primary}] bg-[${COLORS.surfaceWarm}]`
                ]}>
                  <Icon
                    name={step.icon}
                    size={16}
                    color={step.done ? '#fff' : step.active ? COLORS.primary : COLORS.border}
                  />
                </View>
                {i < STEPS.length - 1 && (
                  <View style={[
                    tw`w-0.5 flex-1 bg-[${COLORS.border}] my-0.5`,
                    step.done && tw`bg-[${COLORS.success}]`
                  ]} />
                )}
              </View>
              {/* Text */}
              <View style={tw`flex-1 pb-4`}>
                <Text style={[
                  tw`text-sm font-semibold text-[${COLORS.text}]`,
                  step.active && tw`text-[${COLORS.primary}] font-extrabold`,
                  !step.done && !step.active && tw`text-[${COLORS.textMuted}]`
                ]}>
                  {step.label}
                </Text>
                <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mt-0.5`}>{step.sub}</Text>
                {step.active && (
                  <View style={tw`flex-row items-center gap-1.25 mt-1.25 self-start px-2 py-0.75 rounded-full bg-[#FFF0F0]`}>
                    <View style={tw`w-1.5 h-1.5 rounded-full bg-[${COLORS.primary}]`} />
                    <Text style={tw`text-[10px] font-bold text-[${COLORS.primary}]`}>In Progress</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Delivery address */}
        <View style={tw`bg-[${COLORS.surface}] rounded-2xl p-3.5 mb-3 border border-[${COLORS.border}] shadow-lg`}>
          <View style={tw`flex-row items-center gap-2 mb-2`}>
            <Icon name="map-marker-outline" size={18} color={COLORS.primary} />
            <Text style={tw`text-sm font-bold text-[${COLORS.text}]`}>Delivery Address</Text>
          </View>
          <Text style={tw`text-[13px] text-[${COLORS.textSecondary}] leading-5`}>{ORDER.address}</Text>
        </View>

        {/* Order items */}
        <View style={tw`bg-[${COLORS.surface}] rounded-2xl p-3.5 mb-3 border border-[${COLORS.border}] shadow-lg`}>
          <Text style={tw`text-sm font-bold text-[${COLORS.text}] mb-3`}>Items in this Order</Text>
          {ORDER.items.map((item, i) => (
            <View key={i} style={tw`flex-row items-center gap-2.5`}>
              <View style={tw`w-10 h-10 rounded-[10px] bg-[${COLORS.surfaceWarm}] items-center justify-center`}>
                <Icon name="hanger" size={18} color={COLORS.primary} />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-[13px] font-semibold text-[${COLORS.text}]`}>{item.name}</Text>
                <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mt-0.5`}>Size: {item.size} · Qty: {item.qty}</Text>
              </View>
              <Text style={tw`text-sm font-extrabold text-[${COLORS.primary}]`}>₹{item.price.toLocaleString('en-IN')}</Text>
            </View>
          ))}
        </View>

        {/* Help */}
        <TouchableOpacity style={tw`flex-row items-center gap-2.5 bg-[${COLORS.surface}] rounded-2xl p-3.5 border border-[${COLORS.border}]`}>
          <Icon name="headset" size={18} color={COLORS.primary} />
          <Text style={tw`flex-1 text-[13px] font-semibold text-[${COLORS.text}]`}>Need help with this order?</Text>
          <Icon name="chevron-right" size={16} color={COLORS.textMuted} />
        </TouchableOpacity>

        <View style={tw`h-8`} />
      </ScrollView>
    </View>
  );
}