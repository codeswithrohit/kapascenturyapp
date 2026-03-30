// screens/ProfileScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOW } from '../assets/theme';
import { useCart } from '../context/CartContext';
import tw from 'twrnc';

// ── Menu config — maps label → screen name + icon ─────────────────
const MENU_SECTIONS = [
  {
    title: 'My Orders',
    items: [
      { icon: 'package-variant-closed', label: 'Track Order',          screen: 'TrackOrder',    badge: '2 Active', badgeColor: '#1D4ED8', badgeBg: '#DBEAFE' },
      { icon: 'arrow-u-left-top',       label: 'Returns & Exchanges',  screen: 'Returns',       badge: null },
      { icon: 'star-outline',           label: 'My Reviews',           screen: 'MyReviews',     badge: '5', badgeColor: COLORS.primary, badgeBg: COLORS.surfaceWarm },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: 'account-edit-outline',   label: 'Edit Profile',         screen: 'EditProfile',   badge: null },
      { icon: 'map-marker-outline',     label: 'Saved Addresses',      screen: 'SavedAddresses',badge: '3', badgeColor: COLORS.primary, badgeBg: COLORS.surfaceWarm },
      { icon: 'credit-card-outline',    label: 'Payment Methods',      screen: 'PaymentMethods',badge: null },
      { icon: 'ticket-percent-outline', label: 'My Coupons',           screen: 'MyCoupons',     badge: '4 Active', badgeColor: '#065F46', badgeBg: '#D1FAE5' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'bell-outline',           label: 'Notifications',        screen: 'Notifications', toggle: true, defaultOn: true },
      { icon: 'ruler-square',           label: 'Size Preferences',     screen: 'SizePreferences', badge: null },
    ],
  },
  {
    title: 'Help & Support',
    items: [
      { icon: 'headset',                label: 'Support',              screen: 'Support',       badge: null },
      { icon: 'file-document-outline',  label: 'Terms & Privacy',      screen: 'Terms',         badge: null },
      { icon: 'star-shooting-outline',  label: 'Rate the App',         screen: 'RateApp',       badge: null },
    ],
  },
];

const ORDER_HISTORY = [
  { id: '#KP2831', date: 'Mar 20, 2026', items: 2, amount: 7498,  status: 'Delivered',  statusColor: '#2D7A4F', statusBg: '#D1FAE5', icon: 'check-circle-outline' },
  { id: '#KP2714', date: 'Mar 10, 2026', items: 1, amount: 4599,  status: 'In Transit', statusColor: '#1D4ED8', statusBg: '#DBEAFE', icon: 'truck-delivery-outline' },
  { id: '#KP2589', date: 'Feb 28, 2026', items: 3, amount: 9200,  status: 'Delivered',  statusColor: '#2D7A4F', statusBg: '#D1FAE5', icon: 'check-circle-outline' },
  { id: '#KP2411', date: 'Feb 12, 2026', items: 1, amount: 3299,  status: 'Cancelled',  statusColor: '#9F1239', statusBg: '#FFE4E6', icon: 'close-circle-outline' },
];

// ── Menu Row ────────────────────────────────────────────────────
function MenuRow({ item, onPress }) {
  const [isOn, setIsOn] = useState(item.defaultOn ?? false);

  return (
    <TouchableOpacity
      onPress={() => item.toggle ? null : onPress(item.screen)}
      style={tw`flex-row items-center py-3 gap-3`}
      activeOpacity={item.toggle ? 1 : 0.65}
    >
      {/* Left icon */}
      <View style={tw`w-[38px] h-[38px] rounded-[11px] items-center justify-center bg-[${COLORS.surfaceWarm}]`}>
        <Icon name={item.icon} size={19} color={COLORS.primary} />
      </View>

      {/* Label */}
      <Text style={tw`flex-1 text-sm font-medium text-[${COLORS.text}]`}>{item.label}</Text>

      {/* Right side */}
      {item.toggle ? (
        <Switch
          value={isOn}
          onValueChange={setIsOn}
          trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
          thumbColor={isOn ? COLORS.primary : '#f4f3f4'}
        />
      ) : (
        <View style={tw`flex-row items-center gap-1.5`}>
          {item.badge && (
            <View style={[tw`px-2 py-0.5 rounded-full`, { backgroundColor: item.badgeBg || COLORS.surfaceWarm }]}>
              <Text style={[tw`text-[10px] font-bold`, { color: item.badgeColor || COLORS.primary }]}>
                {item.badge}
              </Text>
            </View>
          )}
          <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
        </View>
      )}
    </TouchableOpacity>
  );
}

// ── Main Screen ────────────────────────────────────────────────
export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { wishlist, itemCount } = useCart();
  const [activeTab, setActiveTab] = useState('profile');

  const handleSignOut = () =>
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => {} },
    ]);

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Profile Hero ─────────────────────────────────────── */}
        <View style={[tw`bg-[${COLORS.primary}] px-[18px] pb-5`, { paddingTop: insets.top + 16 }]}>

          {/* Avatar row */}
          <View style={tw`flex-row items-center mb-[18px] gap-3.5`}>
            <View style={tw`relative`}>
              <View style={tw`w-[72px] h-[72px] rounded-full bg-[${COLORS.secondary}] items-center justify-center border-3 border-white/30`}>
                <Text style={tw`text-[26px] font-extrabold text-[#5C0000]`}>PS</Text>
              </View>
              {/* Edit button */}
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
                style={tw`absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white items-center justify-center border border-[${COLORS.border}]`}
              >
                <Icon name="pencil" size={11} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={tw`flex-1`}>
              <Text style={tw`text-[20px] font-bold text-white`}>Priya Sharma</Text>
              <Text style={tw`text-white/60 text-[13px] mt-0.5`}>priya.sharma@email.com</Text>
              <TouchableOpacity style={tw`flex-row items-center gap-1 self-start mt-1.5 px-2.5 py-1 rounded-full bg-[rgba(212,175,55,0.2)] border border-[${COLORS.secondary}]`}>
                <Icon name="crown" size={12} color={COLORS.secondary} />
                <Text style={tw`text-[${COLORS.secondaryLight}] text-[10px] font-extrabold tracking-wide`}>GOLD MEMBER</Text>
              </TouchableOpacity>
            </View>

            {/* Settings shortcut */}
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={tw`w-[38px] h-[38px] rounded-full bg-white/12 items-center justify-center`}
            >
              <Icon name="cog-outline" size={20} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>

          {/* Stats grid */}
          <View style={tw`flex-row bg-white/10 rounded-2xl overflow-hidden`}>
            {[
              { label: 'Orders',   value: '24', icon: 'package-variant-closed' },
              { label: 'Wishlist', value: String(wishlist.length || 47), icon: 'heart-outline' },
              { label: 'Reviews',  value: '12', icon: 'star-outline' },
              { label: 'Points',   value: '2.4K', icon: 'gift-outline' },
            ].map((stat, i) => (
              <View key={stat.label} style={[
                tw`flex-1 items-center py-3 gap-0.5`,
                i < 3 && tw`border-r border-white/15`
              ]}>
                <Icon name={stat.icon} size={16} color="rgba(255,255,255,0.6)" />
                <Text style={tw`text-white text-[17px] font-extrabold`}>{stat.value}</Text>
                <Text style={tw`text-white/55 text-[10px]`}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Promo banner ─────────────────────────────────────── */}
        <TouchableOpacity style={tw`flex-row items-center mx-4 mt-3.5 mb-1 p-3.5 rounded-2xl bg-[${COLORS.primaryDark}] shadow-lg`} activeOpacity={0.85}>
          <Icon name="ticket-percent-outline" size={22} color={COLORS.secondary} />
          <View style={tw`flex-1 ml-2.5`}>
            <Text style={tw`text-white font-bold text-[13px]`}>
              You have 4 active coupons!
            </Text>
            <Text style={tw`text-white/60 text-[11px] mt-0.5`}>
              Tap to view & apply savings
            </Text>
          </View>
          <Icon name="chevron-right" size={20} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>

        {/* ── Tab switcher ─────────────────────────────────────── */}
        <View style={tw`flex-row mx-4 mt-3.5 bg-[${COLORS.surface}] rounded-[14px] border border-[${COLORS.border}] p-1`}>
          {[
            { key: 'profile', label: 'Profile',      icon: 'account-outline' },
            { key: 'orders',  label: 'My Orders',    icon: 'package-variant-closed' },
          ].map(tab => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                tw`flex-1 flex-row items-center justify-center py-2.5 gap-1.5 rounded-[10px]`,
                activeTab === tab.key && tw`bg-[${COLORS.primary}]`
              ]}
            >
              <Icon
                name={tab.icon}
                size={16}
                color={activeTab === tab.key ? '#fff' : COLORS.textSecondary}
              />
              <Text style={[
                tw`text-[13px] font-semibold`,
                activeTab === tab.key ? tw`text-white` : tw`text-[${COLORS.textSecondary}]`
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Profile Tab ──────────────────────────────────────── */}
        {activeTab === 'profile' ? (
          <View style={tw`px-4 pt-3.5 pb-8`}>
            {MENU_SECTIONS.map(section => (
              <View key={section.title} style={tw`bg-[${COLORS.surface}] rounded-2xl mb-3.5 px-3.5 border border-[${COLORS.border}] shadow-lg`}>
                <Text style={tw`text-[10px] font-bold text-[${COLORS.textMuted}] tracking-wider uppercase pt-3.5 pb-1.5`}>
                  {section.title}
                </Text>
                {section.items.map((item, i) => (
                  <View key={item.label}>
                    <MenuRow item={item} onPress={(screen) => navigation.navigate(screen)} />
                    {i < section.items.length - 1 && <View style={tw`h-px bg-[${COLORS.border}]`} />}
                  </View>
                ))}
              </View>
            ))}

            {/* Sign out */}
            <TouchableOpacity onPress={handleSignOut} style={tw`flex-row items-center justify-center gap-2 py-3.5 rounded-2xl mt-1 border-2 border-[${COLORS.primary}] bg-[${COLORS.surface}]`}>
              <Icon name="logout-variant" size={18} color={COLORS.primary} />
              <Text style={tw`text-[${COLORS.primary}] font-bold text-[15px]`}>Sign Out</Text>
            </TouchableOpacity>

            <Text style={tw`text-[${COLORS.textMuted}] text-[11px] text-center mt-4`}>
              Kapas Century v2.4.1 · Made with ♥ in India
            </Text>
          </View>
        ) : (
          /* ── Orders Tab ──────────────────────────────────────── */
          <View style={tw`px-4 pt-3.5 pb-8`}>
            {/* Quick filter chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-3`}>
              {['All', 'Active', 'Delivered', 'Cancelled'].map((f, i) => (
                <TouchableOpacity
                  key={f}
                  style={[
                    tw`px-4 py-1.5 rounded-full border border-[${COLORS.border}] bg-[${COLORS.surface}]`,
                    i === 0 && tw`bg-[${COLORS.primary}] border-[${COLORS.primary}]`,
                    i !== 0 && tw`ml-2`
                  ]}
                >
                  <Text style={[
                    tw`text-[13px] font-semibold`,
                    i === 0 ? tw`text-white` : tw`text-[${COLORS.textSecondary}]`
                  ]}>
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {ORDER_HISTORY.map(order => (
              <TouchableOpacity
                key={order.id}
                onPress={() => navigation.navigate('TrackOrder', { orderId: order.id })}
                style={tw`bg-[${COLORS.surface}] rounded-2xl mb-3 p-3.5 border border-[${COLORS.border}] shadow-lg`}
                activeOpacity={0.75}
              >
                {/* Order header */}
                <View style={tw`flex-row justify-between items-start mb-3`}>
                  <View>
                    <Text style={tw`text-[15px] font-bold text-[${COLORS.text}]`}>{order.id}</Text>
                    <Text style={tw`text-[${COLORS.textMuted}] text-xs mt-0.5`}>
                      {order.date} · {order.items} item{order.items > 1 ? 's' : ''}
                    </Text>
                  </View>
                  <View style={[tw`flex-row items-center gap-1 px-2.5 py-1.5 rounded-full`, { backgroundColor: order.statusBg }]}>
                    <Icon name={order.icon} size={12} color={order.statusColor} />
                    <Text style={[tw`text-xs font-bold`, { color: order.statusColor }]}>
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View style={tw`h-px bg-[${COLORS.border}]`} />

                {/* Order footer */}
                <View style={tw`flex-row justify-between items-center mt-3`}>
                  <Text style={tw`text-[18px] font-extrabold text-[${COLORS.primary}]`}>
                    ₹{order.amount.toLocaleString('en-IN')}
                  </Text>
                  <View style={tw`flex-row gap-1.5`}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('TrackOrder', { orderId: order.id })}
                      style={tw`flex-row items-center gap-1 px-2.5 py-1.5 rounded-[10px] border border-[${COLORS.border}]`}
                    >
                      <Icon name="map-marker-path" size={13} color={COLORS.primary} />
                      <Text style={tw`text-xs font-semibold text-[${COLORS.primary}]`}>Track</Text>
                    </TouchableOpacity>
                    {order.status !== 'Cancelled' && (
                      <TouchableOpacity style={tw`flex-row items-center gap-1 px-2.5 py-1.5 rounded-[10px] bg-[${COLORS.primary}]`}>
                        <Icon name="refresh" size={13} color="#fff" />
                        <Text style={tw`text-xs font-semibold text-white`}>Reorder</Text>
                      </TouchableOpacity>
                    )}
                    {order.status === 'Delivered' && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Returns', { orderId: order.id })}
                        style={tw`flex-row items-center gap-1 px-2.5 py-1.5 rounded-[10px] border border-[${COLORS.border}]`}
                      >
                        <Icon name="arrow-u-left-top" size={13} color={COLORS.primary} />
                        <Text style={tw`text-xs font-semibold text-[${COLORS.primary}]`}>Return</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}