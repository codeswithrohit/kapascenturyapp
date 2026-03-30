// screens/profile/SavedAddressesScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Alert, Modal, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const INITIAL_ADDRESSES = [
  {
    id: '1', tag: 'Home', name: 'Priya Sharma', phone: '+91 98765 43210',
    line1: '42, Lotus Lane, Sector 18',
    line2: 'Noida, Uttar Pradesh — 201301',
    isDefault: true,
  },
  {
    id: '2', tag: 'Work', name: 'Priya Sharma', phone: '+91 98765 43210',
    line1: 'Tower B, 5th Floor, Cyber City',
    line2: 'Gurugram, Haryana — 122002',
    isDefault: false,
  },
  {
    id: '3', tag: 'Parents', name: 'Ravi Sharma', phone: '+91 91234 56789',
    line1: 'House No. 7, Ram Nagar',
    line2: 'Jaipur, Rajasthan — 302001',
    isDefault: false,
  },
];

const TAG_ICONS = { Home: 'home-outline', Work: 'briefcase-outline', Parents: 'account-group-outline', Other: 'map-marker-outline' };

export default function SavedAddressesScreen({ navigation }) {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [addModal, setAddModal]   = useState(false);
  const [newAddr, setNewAddr]     = useState({ tag: 'Home', name: '', phone: '', line1: '', line2: '' });

  const setDefault = (id) =>
    setAddresses(a => a.map(addr => ({ ...addr, isDefault: addr.id === id })));

  const deleteAddr = (id) =>
    Alert.alert('Delete Address', 'Remove this address?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setAddresses(a => a.filter(addr => addr.id !== id)) },
    ]);

  const saveNew = () => {
    if (!newAddr.name || !newAddr.line1) {
      Alert.alert('Missing Info', 'Please fill in required fields.'); return;
    }
    setAddresses(a => [...a, { ...newAddr, id: Date.now().toString(), isDefault: false }]);
    setAddModal(false);
    setNewAddr({ tag: 'Home', name: '', phone: '', line1: '', line2: '' });
  };

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader
        title="Saved Addresses"
        subtitle={`${addresses.length} addresses saved`}
        navigation={navigation}
        rightIcon="plus"
        onRightPress={() => setAddModal(true)}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4 pb-8`}>
        {addresses.map(addr => (
          <View key={addr.id} style={[
            tw`bg-[${COLORS.surface}] rounded-2xl p-4 mb-3 border border-[${COLORS.border}] shadow-lg`,
            addr.isDefault && tw`border-2 border-[${COLORS.primary}]`
          ]}>
            {/* Tag row */}
            <View style={tw`flex-row items-center gap-2 mb-2.5`}>
              <View style={tw`flex-row items-center gap-1 px-2.5 py-1 rounded-full bg-[${COLORS.surfaceWarm}] border border-[${COLORS.border}]`}>
                <Icon name={TAG_ICONS[addr.tag] || 'map-marker-outline'} size={13} color={COLORS.primary} />
                <Text style={tw`text-xs font-bold text-[${COLORS.primary}]`}>{addr.tag}</Text>
              </View>
              {addr.isDefault && (
                <View style={tw`flex-row items-center gap-1 px-2 py-0.75 rounded-full bg-[#F0FDF4]`}>
                  <Icon name="check-circle" size={11} color={COLORS.success} />
                  <Text style={tw`text-[11px] font-bold text-[${COLORS.success}]`}>Default</Text>
                </View>
              )}
            </View>

            {/* Address info */}
            <Text style={tw`text-sm font-bold text-[${COLORS.text}] mb-0.5`}>{addr.name}</Text>
            <Text style={tw`text-xs text-[${COLORS.textMuted}] mb-1`}>{addr.phone}</Text>
            <Text style={tw`text-[13px] text-[${COLORS.textSecondary}] leading-[19px]`}>{addr.line1}</Text>
            <Text style={tw`text-[13px] text-[${COLORS.textSecondary}] leading-[19px]`}>{addr.line2}</Text>

            {/* Actions */}
            <View style={tw`flex-row gap-3 mt-3 pt-2.5 border-t border-[${COLORS.border}]`}>
              {!addr.isDefault && (
                <TouchableOpacity onPress={() => setDefault(addr.id)} style={tw`flex-row items-center gap-1`}>
                  <Icon name="radiobox-blank" size={14} color={COLORS.primary} />
                  <Text style={tw`text-xs font-semibold text-[${COLORS.primary}]`}>Set Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={tw`flex-row items-center gap-1`}>
                <Icon name="pencil-outline" size={14} color={COLORS.primary} />
                <Text style={tw`text-xs font-semibold text-[${COLORS.primary}]`}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAddr(addr.id)} style={tw`flex-row items-center gap-1`}>
                <Icon name="delete-outline" size={14} color="#EF4444" />
                <Text style={tw`text-xs font-semibold text-[#EF4444]`}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity onPress={() => setAddModal(true)} style={tw`flex-row items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-[${COLORS.primary}] bg-[${COLORS.surface}]`}>
          <Icon name="plus" size={20} color={COLORS.primary} />
          <Text style={tw`text-[14px] font-bold text-[${COLORS.primary}]`}>Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add modal */}
      <Modal visible={addModal} transparent animationType="slide">
        <View style={tw`flex-1 bg-black/50 justify-end`}>
          <View style={tw`bg-[${COLORS.surface}] rounded-t-3xl p-5 pb-9`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-[17px] font-bold text-[${COLORS.text}]`}>Add New Address</Text>
              <TouchableOpacity onPress={() => setAddModal(false)}>
                <Icon name="close" size={22} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {/* Tag selector */}
            <View style={tw`flex-row gap-2 mb-4 flex-wrap`}>
              {['Home', 'Work', 'Parents', 'Other'].map(t => (
                <TouchableOpacity
                  key={t} onPress={() => setNewAddr(a => ({ ...a, tag: t }))}
                  style={[
                    tw`flex-row items-center gap-1.25 px-3 py-1.75 rounded-full border border-[${COLORS.border}] bg-[${COLORS.surface}]`,
                    newAddr.tag === t && tw`bg-[${COLORS.primary}] border-[${COLORS.primary}]`
                  ]}
                >
                  <Icon name={TAG_ICONS[t] || 'map-marker-outline'} size={14}
                    color={newAddr.tag === t ? '#fff' : COLORS.textSecondary} />
                  <Text style={[
                    tw`text-xs font-semibold text-[${COLORS.textSecondary}]`,
                    newAddr.tag === t && tw`text-white`
                  ]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {[
              { key: 'name',  placeholder: 'Full Name *',    icon: 'account-outline' },
              { key: 'phone', placeholder: 'Phone Number',   icon: 'phone-outline' },
              { key: 'line1', placeholder: 'Address Line 1 *', icon: 'map-marker-outline' },
              { key: 'line2', placeholder: 'City, State — PIN', icon: 'city-variant-outline' },
            ].map(f => (
              <View key={f.key} style={tw`flex-row items-center gap-2.5 border border-[${COLORS.border}] rounded-xl px-3 py-2.5 mb-2.5 bg-[${COLORS.surfaceWarm}]`}>
                <Icon name={f.icon} size={18} color={COLORS.textMuted} />
                <TextInput
                  placeholder={f.placeholder}
                  placeholderTextColor={COLORS.textMuted}
                  value={newAddr[f.key]}
                  onChangeText={v => setNewAddr(a => ({ ...a, [f.key]: v }))}
                  style={tw`flex-1 text-sm text-[${COLORS.text}] py-0`}
                />
              </View>
            ))}

            <TouchableOpacity onPress={saveNew} style={tw`bg-[${COLORS.primary}] rounded-2xl py-3.5 items-center mt-1.5`}>
              <Text style={tw`text-white font-extrabold text-[15px]`}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}