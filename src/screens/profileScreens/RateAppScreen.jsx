// screens/profile/RateAppScreen.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const FEATURES = [
  { icon: 'shopping-bag-outline',    label: 'Shopping Experience' },
  { icon: 'truck-delivery-outline',  label: 'Delivery Speed' },
  { icon: 'package-variant-closed',  label: 'Product Quality' },
  { icon: 'headset',                 label: 'Customer Support' },
  { icon: 'cash-refund',             label: 'Returns Process' },
];

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'];

export default function RateAppScreen({ navigation }) {
  const [rating, setRating]             = useState(0);
  const [hovered, setHovered]           = useState(0);
  const [featureRatings, setFeatureRatings] = useState({});
  const [feedback, setFeedback]         = useState('');
  const [submitted, setSubmitted]       = useState(false);

  const activeRating = hovered || rating;

  const setFeature = (label, val) =>
    setFeatureRatings(r => ({ ...r, [label]: val }));

  const handleSubmit = () => {
    if (!rating) { Alert.alert('Please rate us!', 'Select a star rating to continue.'); return; }
    if (rating >= 4) {
      Alert.alert(
        '🎉 Thank you!',
        'We\'re glad you love Kapas Century! Would you like to rate us on the Play Store?',
        [
          { text: 'Not now', style: 'cancel', onPress: () => setSubmitted(true) },
          { text: 'Rate on Play Store', onPress: () => { Linking.openURL('market://details?id=com.kapascentury.app'); setSubmitted(true); } },
        ]
      );
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <View style={tw`flex-1 bg-[${COLORS.background}]`}>
        <SubPageHeader title="Rate the App" navigation={navigation} />
        <View style={tw`flex-1 items-center justify-center p-8`}>
          <Text style={tw`text-[72px] mb-4`}>🙏</Text>
          <Text style={tw`text-[22px] font-extrabold text-[${COLORS.text}] mb-2.5`}>
            Thank you for your feedback!
          </Text>
          <Text style={tw`text-sm text-[${COLORS.textSecondary}] text-center leading-[21px] mb-7`}>
            Your feedback helps us improve Kapas Century for everyone.
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`bg-[${COLORS.primary}] rounded-2xl py-3.5 px-10`}>
            <Text style={tw`text-white font-extrabold text-[15px]`}>Back to Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader title="Rate the App" navigation={navigation} />

      <View style={tw`flex-1 p-4`}>
        {/* Hero */}
        <View style={tw`bg-[${COLORS.surface}] rounded-2xl p-5 items-center mb-3.5 border border-[${COLORS.border}] shadow-lg`}>
          <Text style={tw`text-[52px] mb-2.5`}>🥻</Text>
          <Text style={tw`text-[20px] font-extrabold text-[${COLORS.text}] mb-1.5`}>
            Enjoying Kapas Century?
          </Text>
          <Text style={tw`text-[13px] text-[${COLORS.textSecondary}] text-center leading-[19px] mb-5`}>
            Tell us how we're doing. Your feedback helps us serve you better!
          </Text>

          {/* Star rating */}
          <View style={tw`flex-row gap-1.5 mb-2.5`}>
            {[1, 2, 3, 4, 5].map(s => (
              <TouchableOpacity
                key={s}
                onPress={() => setRating(s)}
                onPressIn={() => setHovered(s)}
                onPressOut={() => setHovered(0)}
                style={tw`p-1`}
                activeOpacity={0.7}
              >
                <Icon
                  name={s <= activeRating ? 'star' : 'star-outline'}
                  size={44}
                  color={s <= activeRating ? '#F59E0B' : COLORS.border}
                />
              </TouchableOpacity>
            ))}
          </View>

          {rating > 0 && (
            <View style={tw`px-5 py-1.5 rounded-full bg-[${COLORS.surfaceWarm}] border border-[${COLORS.border}]`}>
              <Text style={tw`text-sm font-bold text-[${COLORS.primary}]`}>{RATING_LABELS[rating]}</Text>
            </View>
          )}
        </View>

        {/* Feature ratings */}
        <View style={tw`bg-[${COLORS.surface}] rounded-2xl p-3.5 mb-3 border border-[${COLORS.border}] shadow-lg`}>
          <Text style={tw`text-sm font-bold text-[${COLORS.text}] mb-3`}>Rate specific features</Text>
          {FEATURES.map(f => (
            <View key={f.label} style={tw`flex-row items-center justify-between py-2`}>
              <View style={tw`flex-row items-center gap-2`}>
                <Icon name={f.icon} size={16} color={COLORS.primary} />
                <Text style={tw`text-[13px] text-[${COLORS.textSecondary}]`}>{f.label}</Text>
              </View>
              <View style={tw`flex-row gap-0.5`}>
                {[1, 2, 3, 4, 5].map(s => (
                  <TouchableOpacity key={s} onPress={() => setFeature(f.label, s)}>
                    <Icon
                      name={s <= (featureRatings[f.label] || 0) ? 'star' : 'star-outline'}
                      size={20}
                      color={s <= (featureRatings[f.label] || 0) ? '#F59E0B' : COLORS.border}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Feedback text */}
        <View style={tw`bg-[${COLORS.surface}] rounded-2xl p-3.5 mb-3.5 border border-[${COLORS.border}] shadow-lg`}>
          <Text style={tw`text-sm font-bold text-[${COLORS.text}] mb-3`}>Additional feedback</Text>
          <TextInput
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Share any suggestions or issues..."
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={3}
            style={tw`border border-[${COLORS.border}] rounded-[10px] p-2.5 text-[13px] text-[${COLORS.text}] bg-[${COLORS.surfaceWarm}] min-h-[80px]`}
            textAlignVertical="top"
          />
        </View>

        {/* Submit */}
        <TouchableOpacity onPress={handleSubmit} style={tw`flex-row items-center justify-center gap-2 bg-[${COLORS.primary}] rounded-2xl py-3.5`}>
          <Icon name="send" size={18} color="#fff" />
          <Text style={tw`text-white font-extrabold text-[15px]`}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}