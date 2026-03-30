// screens/profile/EditProfileScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from "../profileScreens/SubPageHeader";
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const FIELDS = [
  { key: 'firstName', label: 'First Name',   icon: 'account-outline',       keyboard: 'default' },
  { key: 'lastName',  label: 'Last Name',    icon: 'account-outline',       keyboard: 'default' },
  { key: 'email',     label: 'Email',        icon: 'email-outline',         keyboard: 'email-address' },
  { key: 'phone',     label: 'Phone Number', icon: 'phone-outline',         keyboard: 'phone-pad' },
  { key: 'dob',       label: 'Date of Birth',icon: 'calendar-outline',      keyboard: 'default' },
  { key: 'gender',    label: 'Gender',       icon: 'gender-male-female',    keyboard: 'default' },
];

export default function EditProfileScreen({ navigation }) {
  const [form, setForm] = useState({
    firstName: 'Priya',
    lastName:  'Sharma',
    email:     'priya.sharma@email.com',
    phone:     '+91 98765 43210',
    dob:       '15 Aug 1995',
    gender:    'Female',
  });
  const [focused, setFocused] = useState(null);

  const handleSave = () => {
    Alert.alert('Profile Updated', 'Your profile has been saved successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader
        title="Edit Profile"
        subtitle="Update your personal information"
        navigation={navigation}
        rightIcon="check"
        onRightPress={handleSave}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar section */}
        <View style={tw`items-center py-6 bg-[${COLORS.surface}] border-b border-[${COLORS.border}]`}>
          <View style={tw`w-22 h-22 rounded-full bg-[${COLORS.secondary}] items-center justify-center border-3 border-[${COLORS.border}] mb-2.5`}>
            <Text style={tw`text-[32px] font-extrabold text-[#5C0000]`}>PS</Text>
          </View>
          <TouchableOpacity style={tw`flex-row items-center gap-1.5 px-4 py-1.5 rounded-full border-2 border-[${COLORS.primary}]`}>
            <Icon name="camera-outline" size={16} color={COLORS.primary} />
            <Text style={tw`text-[${COLORS.primary}] font-semibold text-[13px]`}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={tw`mx-4 my-4 rounded-2xl bg-[${COLORS.surface}] border border-[${COLORS.border}] px-4 shadow-lg`}>
          <Text style={tw`text-[10px] font-bold text-[${COLORS.textMuted}] tracking-wider pt-3.5 pb-1`}>
            PERSONAL INFO
          </Text>
          {FIELDS.map((field, i) => (
            <View key={field.key} style={[
              tw`flex-row items-center py-3 gap-2.5`,
              i > 0 && tw`border-t border-[${COLORS.border}]`
            ]}>
              <View style={tw`w-[34px] h-[34px] rounded-[10px] bg-[${COLORS.surfaceWarm}] items-center justify-center`}>
                <Icon name={field.icon} size={18} color={focused === field.key ? COLORS.primary : COLORS.textMuted} />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mb-0.5`}>{field.label}</Text>
                <TextInput
                  value={form[field.key]}
                  onChangeText={val => setForm(f => ({ ...f, [field.key]: val }))}
                  keyboardType={field.keyboard}
                  onFocus={() => setFocused(field.key)}
                  onBlur={() => setFocused(null)}
                  style={[
                    tw`text-sm font-medium text-[${COLORS.text}] py-0`,
                    focused === field.key && tw`text-[${COLORS.primary}]`
                  ]}
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
              <Icon name="pencil-outline" size={15} color={COLORS.textMuted} />
            </View>
          ))}
        </View>

        {/* Danger zone */}
        <View style={tw`mx-4 mb-4 rounded-2xl bg-[${COLORS.surface}] border border-[${COLORS.border}] px-4 shadow-lg`}>
          <Text style={tw`text-[10px] font-bold text-[${COLORS.textMuted}] tracking-wider pt-3.5 pb-1`}>
            ACCOUNT
          </Text>
          {[
            { icon: 'lock-reset',    label: 'Change Password', color: COLORS.text },
            { icon: 'delete-outline',label: 'Delete Account',  color: '#EF4444' },
          ].map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[
                tw`flex-row items-center py-3.5 gap-3`,
                i > 0 && tw`border-t border-[${COLORS.border}]`
              ]}
              onPress={() => Alert.alert(item.label, `Are you sure you want to ${item.label.toLowerCase()}?`)}
            >
              <Icon name={item.icon} size={19} color={item.color} />
              <Text style={[tw`flex-1 text-sm font-medium`, { color: item.color }]}>{item.label}</Text>
              <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Save button */}
        <TouchableOpacity onPress={handleSave} style={tw`flex-row items-center justify-center gap-2 mx-4 py-3.5 rounded-2xl bg-[${COLORS.primary}] shadow-md`}>
          <Icon name="content-save-outline" size={20} color="#fff" />
          <Text style={tw`text-white font-extrabold text-[15px]`}>Save Changes</Text>
        </TouchableOpacity>

        <View style={tw`h-10`} />
      </ScrollView>
    </View>
  );
}