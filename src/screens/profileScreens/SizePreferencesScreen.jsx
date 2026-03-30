// screens/profile/SizePreferencesScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const SIZE_CATEGORIES = [
  {
    category: 'Tops & Kurtis', icon: 'tshirt-crew-outline',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    selected: 'M',
  },
  {
    category: 'Bottoms', icon: 'human-female',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    selected: 'M',
  },
  {
    category: 'Sarees', icon: 'human-female-dance',
    sizes: ['Free Size', '5.5m', '6m', '6.5m'],
    selected: 'Free Size',
  },
  {
    category: 'Lehengas', icon: 'star-four-points-outline',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    selected: 'S',
  },
];

const MEASUREMENTS = [
  { label: 'Chest / Bust', unit: 'inches', placeholder: '34' },
  { label: 'Waist',        unit: 'inches', placeholder: '28' },
  { label: 'Hips',         unit: 'inches', placeholder: '36' },
  { label: 'Height',       unit: 'cm',     placeholder: '162' },
];

export default function SizePreferencesScreen({ navigation }) {
  const [categories, setCategories] = useState(SIZE_CATEGORIES);
  const [measurements, setMeasurements] = useState({ Chest: '34', Waist: '28', Hips: '36', Height: '162' });

  const selectSize = (catIdx, size) => {
    setCategories(cats => cats.map((c, i) => i === catIdx ? { ...c, selected: size } : c));
  };

  const handleSave = () => {
    Alert.alert('Saved!', 'Your size preferences have been saved.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader
        title="Size Preferences"
        subtitle="Set your default sizes"
        navigation={navigation}
        rightIcon="content-save-outline"
        onRightPress={handleSave}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4`}>

        {/* Info banner */}
        <View style={tw`flex-row items-start gap-2.5 bg-[#EFF6FF] rounded-xl p-3 border border-[#BFDBFE] mb-4`}>
          <Icon name="information-outline" size={18} color="#1D4ED8" />
          <Text style={tw`flex-1 text-xs text-[#1D4ED8] leading-[17px]`}>
            Setting your sizes helps us show better recommendations and speeds up checkout!
          </Text>
        </View>

        {/* Size selectors */}
        {categories.map((cat, i) => (
          <View key={cat.category} style={tw`bg-[${COLORS.surface}] rounded-2xl p-3.5 mb-3 border border-[${COLORS.border}] shadow-lg`}>
            <View style={tw`flex-row items-center gap-2.5 mb-3`}>
              <View style={tw`w-9 h-9 rounded-[10px] bg-[${COLORS.surfaceWarm}] items-center justify-center`}>
                <Icon name={cat.icon} size={18} color={COLORS.primary} />
              </View>
              <Text style={tw`flex-1 text-sm font-bold text-[${COLORS.text}]`}>{cat.category}</Text>
              <View style={tw`px-2.5 py-0.75 rounded-full bg-[${COLORS.primary}]`}>
                <Text style={tw`text-white text-[11px] font-bold`}>{cat.selected}</Text>
              </View>
            </View>
            <View style={tw`flex-row flex-wrap gap-2`}>
              {cat.sizes.map(size => (
                <TouchableOpacity
                  key={size}
                  onPress={() => selectSize(i, size)}
                  style={[
                    tw`px-3.5 py-1.75 rounded-full border-2 border-[${COLORS.border}] bg-[${COLORS.surface}]`,
                    cat.selected === size && tw`border-[${COLORS.primary}] bg-[${COLORS.surfaceWarm}]`
                  ]}
                >
                  <Text style={[
                    tw`text-[13px] font-semibold text-[${COLORS.textSecondary}]`,
                    cat.selected === size && tw`text-[${COLORS.primary}]`
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Measurements section */}
        <View style={tw`bg-[${COLORS.surface}] rounded-2xl p-3.5 mb-4 border border-[${COLORS.border}] shadow-lg`}>
          <View style={tw`flex-row items-center gap-2.5 mb-3.5`}>
            <Icon name="ruler" size={18} color={COLORS.primary} />
            <Text style={tw`flex-1 text-sm font-bold text-[${COLORS.text}]`}>Body Measurements</Text>
            <TouchableOpacity>
              <Text style={tw`text-xs font-semibold text-[${COLORS.primary}]`}>How to measure?</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row flex-wrap gap-3`}>
            {MEASUREMENTS.map(m => {
              const key = m.label.split(' ')[0];
              return (
                <View key={m.label} style={tw`w-[47%]`}>
                  <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mb-1.5`}>{m.label}</Text>
                  <View style={tw`flex-row items-center justify-between border border-[${COLORS.border}] rounded-[10px] px-3 py-2.25 bg-[${COLORS.surfaceWarm}]`}>
                    <Text style={tw`text-base font-bold text-[${COLORS.text}]`}>
                      {measurements[key] || m.placeholder}
                    </Text>
                    <Text style={tw`text-[11px] text-[${COLORS.textMuted}]`}>{m.unit}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <TouchableOpacity onPress={handleSave} style={tw`flex-row items-center justify-center gap-2 bg-[${COLORS.primary}] rounded-2xl py-3.5`}>
          <Icon name="content-save-outline" size={18} color="#fff" />
          <Text style={tw`text-white font-extrabold text-[15px]`}>Save Preferences</Text>
        </TouchableOpacity>

        <View style={tw`h-8`} />
      </ScrollView>
    </View>
  );
}