// components/SubPageHeader.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

export default function SubPageHeader({ title, subtitle, navigation, rightIcon, onRightPress }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[
      tw`bg-[${COLORS.primary}] px-3.5 pb-3.5 shadow-2xl`,
      { paddingTop: insets.top + 10 }
    ]}>
      <View style={tw`flex-row items-center gap-2.5`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-10 h-10 items-center justify-center rounded-full bg-white/15`} activeOpacity={0.7}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={tw`flex-1`}>
          <Text style={tw`text-[18px] font-bold text-white`} numberOfLines={1}>{title}</Text>
          {subtitle ? <Text style={tw`text-xs text-white/65 mt-0.5`}>{subtitle}</Text> : null}
        </View>

        {/* {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} style={tw`w-10 h-10 items-center justify-center rounded-full bg-white/15`} activeOpacity={0.7}>
            <Icon name={rightIcon} size={22} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={tw`w-10 h-10`} />
        )} */}
      </View>
    </View>
  );
}