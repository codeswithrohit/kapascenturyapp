// screens/profile/NotificationsScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const NOTIFICATION_GROUPS = [
  {
    title: 'Orders & Delivery',
    items: [
      { icon: 'package-variant-closed', label: 'Order Confirmation', sub: 'When your order is placed', defaultOn: true },
      { icon: 'truck-delivery-outline', label: 'Shipping Updates',   sub: 'Track your delivery in real-time', defaultOn: true },
      { icon: 'home-circle-outline',    label: 'Delivery Status',    sub: 'When your order is delivered', defaultOn: true },
      { icon: 'arrow-u-left-top',       label: 'Return & Refund',    sub: 'Updates on your return requests', defaultOn: true },
    ],
  },
  {
    title: 'Offers & Promotions',
    items: [
      { icon: 'percent',               label: 'Exclusive Deals',      sub: 'Personalized discounts for you', defaultOn: true },
      { icon: 'lightning-bolt-outline', label: 'Flash Sales',         sub: 'Limited time offers', defaultOn: false },
      { icon: 'gift-outline',          label: 'Loyalty Points',       sub: 'Points earned & expiry alerts', defaultOn: true },
      { icon: 'ticket-percent-outline', label: 'New Coupons',         sub: 'When new coupons are available', defaultOn: false },
    ],
  },
  {
    title: 'Account & Activity',
    items: [
      { icon: 'heart-outline',          label: 'Wishlist Alerts',    sub: 'Price drops on saved items', defaultOn: true },
      { icon: 'star-outline',           label: 'Review Reminders',   sub: 'Remind to review purchases', defaultOn: false },
      { icon: 'account-outline',        label: 'Account Activity',   sub: 'Login alerts and security', defaultOn: true },
    ],
  },
];

function NotifRow({ item }) {
  const [on, setOn] = useState(item.defaultOn);
  return (
    <View style={tw`flex-row items-center py-2.75 gap-3`}>
      <View style={tw`w-9 h-9 rounded-[10px] bg-[${COLORS.surfaceWarm}] items-center justify-center`}>
        <Icon name={item.icon} size={18} color={COLORS.primary} />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-[13px] font-semibold text-[${COLORS.text}]`}>{item.label}</Text>
        <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mt-0.5`}>{item.sub}</Text>
      </View>
      <Switch
        value={on}
        onValueChange={setOn}
        trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
        thumbColor={on ? COLORS.primary : '#f4f3f4'}
        style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
      />
    </View>
  );
}

export default function NotificationsScreen({ navigation }) {
  const [masterOn, setMasterOn] = useState(true);

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader title="Notifications" subtitle="Manage your alerts" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4`}>

        {/* Master toggle */}
        <View style={tw`flex-row items-center justify-between bg-[${COLORS.surface}] rounded-2xl p-4 mb-3.5 border-2 border-[${COLORS.primary}] shadow-lg`}>
          <View style={tw`flex-row items-center gap-3`}>
            <Icon name="bell" size={22} color={masterOn ? COLORS.primary : COLORS.textMuted} />
            <View>
              <Text style={tw`text-[15px] font-bold text-[${COLORS.text}]`}>All Notifications</Text>
              <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mt-0.5`}>
                {masterOn ? 'Notifications are enabled' : 'All muted'}
              </Text>
            </View>
          </View>
          <Switch
            value={masterOn}
            onValueChange={setMasterOn}
            trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
            thumbColor={masterOn ? COLORS.primary : '#f4f3f4'}
          />
        </View>

        {NOTIFICATION_GROUPS.map(group => (
          <View key={group.title} style={[
            tw`bg-[${COLORS.surface}] rounded-2xl mb-3 px-3.5 border border-[${COLORS.border}] shadow-lg`,
            !masterOn && tw`opacity-50`
          ]}>
            <Text style={tw`text-[10px] font-bold text-[${COLORS.textMuted}] tracking-wider pt-3 pb-1.5`}>
              {group.title.toUpperCase()}
            </Text>
            {group.items.map((item, i) => (
              <View key={item.label}>
                <NotifRow item={item} />
                {i < group.items.length - 1 && <View style={tw`h-px bg-[${COLORS.border}]`} />}
              </View>
            ))}
          </View>
        ))}

        <View style={tw`h-8`} />
      </ScrollView>
    </View>
  );
}