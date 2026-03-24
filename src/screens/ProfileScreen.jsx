// screens/ProfileScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image, Switch
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { COLORS, FONTS, SHADOW } from '../assets/theme';

const MENU_SECTIONS = [
  {
    title: 'My Orders',
    items: [
      { icon: '📦', label: 'Track Order', badge: '2 Active' },
      { icon: '↩️', label: 'Returns & Exchanges', badge: null },
      { icon: '⭐', label: 'My Reviews', badge: '5' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: '👤', label: 'Edit Profile', badge: null },
      { icon: '📍', label: 'Saved Addresses', badge: '3' },
      { icon: '💳', label: 'Payment Methods', badge: null },
      { icon: '🎟️', label: 'My Coupons', badge: '4 active' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: '🔔', label: 'Notifications', toggle: true, defaultOn: true },
      { icon: '🌙', label: 'Dark Mode', toggle: true, defaultOn: false },
      { icon: '📏', label: 'Size Preferences', badge: null },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: '💬', label: 'Chat with Us', badge: null },
      { icon: '📞', label: 'Call Support', badge: null },
      { icon: '📄', label: 'Terms & Privacy', badge: null },
      { icon: '⭐', label: 'Rate the App', badge: null },
    ],
  },
];

const ORDER_HISTORY = [
  { id: '#KP2831', date: 'Mar 20, 2026', items: 2, amount: 7498, status: 'Delivered', statusColor: '#2D7A4F', statusBg: '#D1FAE5' },
  { id: '#KP2714', date: 'Mar 10, 2026', items: 1, amount: 4599, status: 'In Transit', statusColor: '#1D4ED8', statusBg: '#DBEAFE' },
  { id: '#KP2589', date: 'Feb 28, 2026', items: 3, amount: 9200, status: 'Delivered', statusColor: '#2D7A4F', statusBg: '#D1FAE5' },
];

function MenuRow({ item }) {
  const [isOn, setIsOn] = useState(item.defaultOn ?? false);
  return (
    <TouchableOpacity
      style={tw`flex-row items-center justify-between py-3.5`}
      activeOpacity={item.toggle ? 1 : 0.7}
    >
      <View style={tw`flex-row items-center gap-3`}>
        <View style={[
          tw`items-center justify-center rounded-xl`,
          { width: 38, height: 38, backgroundColor: COLORS.surfaceWarm }
        ]}>
          <Text style={{ fontSize: 18 }}>{item.icon}</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.text }}>{item.label}</Text>
      </View>

      {item.toggle ? (
        <Switch
          value={isOn}
          onValueChange={setIsOn}
          trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
          thumbColor={isOn ? COLORS.primary : '#f4f3f4'}
        />
      ) : (
        <View style={tw`flex-row items-center gap-2`}>
          {item.badge && (
            <View style={[
              tw`px-2 py-0.5 rounded-full`,
              { backgroundColor: COLORS.surfaceWarm, borderWidth: 1, borderColor: COLORS.border }
            ]}>
              <Text style={{ fontSize: 10, fontWeight: '600', color: COLORS.primary }}>{item.badge}</Text>
            </View>
          )}
          <Text style={{ color: COLORS.textMuted, fontSize: 16 }}>›</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'orders'

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Profile Header */}
        <View style={[
          tw`pt-6 pb-8 px-5`,
          {
            backgroundColor: COLORS.primary,
            paddingTop: insets.top + 16,
          }
        ]}>
          {/* Avatar + info */}
          <View style={tw`flex-row items-center gap-4 mb-6`}>
            <View style={{ position: 'relative' }}>
              <View style={[
                tw`rounded-full items-center justify-center`,
                {
                  width: 72, height: 72,
                  backgroundColor: COLORS.secondary,
                  borderWidth: 3,
                  borderColor: 'rgba(255,255,255,0.3)',
                }
              ]}>
                <Text style={{ fontSize: 30 }}>👩</Text>
              </View>
              <TouchableOpacity style={[
                tw`absolute bottom-0 right-0 rounded-full items-center justify-center`,
                { width: 24, height: 24, backgroundColor: '#fff' }
              ]}>
                <Text style={{ fontSize: 11 }}>✏️</Text>
              </TouchableOpacity>
            </View>

            <View style={tw`flex-1`}>
              <Text style={{ fontSize: 20, fontFamily: FONTS.heading, fontWeight: '700', color: '#fff' }}>
                Priya Sharma
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 2 }}>
                priya.sharma@email.com
              </Text>
              <View style={[
                tw`self-start mt-2 px-3 py-1 rounded-full flex-row items-center gap-1`,
                { backgroundColor: 'rgba(212,175,55,0.25)', borderWidth: 1, borderColor: COLORS.secondary }
              ]}>
                <Text style={{ fontSize: 12 }}>👑</Text>
                <Text style={{ color: COLORS.secondaryLight, fontSize: 11, fontWeight: '700' }}>
                  GOLD MEMBER
                </Text>
              </View>
            </View>
          </View>

          {/* Stats Row */}
          <View style={[
            tw`flex-row rounded-2xl overflow-hidden`,
            { backgroundColor: 'rgba(255,255,255,0.12)' }
          ]}>
            {[
              { label: 'Orders', value: '24' },
              { label: 'Wishlist', value: '47' },
              { label: 'Reviews', value: '12' },
              { label: 'Points', value: '2.4K' },
            ].map((stat, i) => (
              <View
                key={stat.label}
                style={[
                  tw`flex-1 items-center py-3`,
                  i < 3 && { borderRightWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }
                ]}
              >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '800' }}>{stat.value}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 1 }}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tab switcher */}
        <View style={[
          tw`flex-row mx-4 rounded-xl mt-4 p-1`,
          { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border }
        ]}>
          {[
            { key: 'profile', label: '👤 Profile' },
            { key: 'orders', label: '📦 Orders' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                tw`flex-1 py-2.5 rounded-lg items-center`,
                activeTab === tab.key && { backgroundColor: COLORS.primary }
              ]}
            >
              <Text style={{
                fontSize: 13,
                fontWeight: '600',
                color: activeTab === tab.key ? '#fff' : COLORS.textSecondary,
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'profile' ? (
          /* Profile Menu */
          <View style={tw`px-4 mt-4 pb-8`}>
            {MENU_SECTIONS.map((section) => (
              <View
                key={section.title}
                style={[
                  tw`mb-4 rounded-2xl px-4`,
                  { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.soft }
                ]}
              >
                <Text style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: COLORS.textMuted,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  paddingTop: 14,
                  paddingBottom: 4,
                }}>
                  {section.title}
                </Text>
                {section.items.map((item, i) => (
                  <View key={item.label}>
                    <MenuRow item={item} />
                    {i < section.items.length - 1 && (
                      <View style={{ height: 1, backgroundColor: COLORS.border }} />
                    )}
                  </View>
                ))}
                <View style={{ height: 4 }} />
              </View>
            ))}

            {/* Logout */}
            <TouchableOpacity style={[
              tw`py-4 rounded-2xl items-center mt-2`,
              { borderWidth: 1.5, borderColor: COLORS.primary }
            ]}>
              <Text style={{ color: COLORS.primary, fontWeight: '700', fontSize: 15 }}>
                🚪 Sign Out
              </Text>
            </TouchableOpacity>

            <Text style={{ color: COLORS.textMuted, fontSize: 11, textAlign: 'center', marginTop: 16 }}>
              Kapas Century v2.4.1 · Made with ♥ in India
            </Text>
          </View>
        ) : (
          /* Orders Tab */
          <View style={tw`px-4 mt-4 pb-8`}>
            {ORDER_HISTORY.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={[
                  tw`mb-3 p-4 rounded-2xl`,
                  { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.soft }
                ]}
              >
                <View style={tw`flex-row justify-between items-start mb-3`}>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: COLORS.text }}>
                      {order.id}
                    </Text>
                    <Text style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 2 }}>
                      {order.date} · {order.items} item{order.items > 1 ? 's' : ''}
                    </Text>
                  </View>
                  <View style={[
                    tw`px-3 py-1.5 rounded-full`,
                    { backgroundColor: order.statusBg }
                  ]}>
                    <Text style={{ color: order.statusColor, fontSize: 12, fontWeight: '700' }}>
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View style={{ height: 1, backgroundColor: COLORS.border, marginBottom: 12 }} />

                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={{ fontSize: 17, fontWeight: '800', color: COLORS.primary }}>
                    ₹{order.amount.toLocaleString('en-IN')}
                  </Text>
                  <View style={tw`flex-row gap-2`}>
                    <TouchableOpacity style={[
                      tw`px-3 py-2 rounded-lg`,
                      { borderWidth: 1, borderColor: COLORS.border }
                    ]}>
                      <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>Track</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[
                      tw`px-3 py-2 rounded-lg`,
                      { backgroundColor: COLORS.primary }
                    ]}>
                      <Text style={{ fontSize: 12, color: '#fff', fontWeight: '600' }}>Reorder</Text>
                    </TouchableOpacity>
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
