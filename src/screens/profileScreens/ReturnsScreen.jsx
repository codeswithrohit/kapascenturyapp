// screens/profile/ReturnsScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const STEPS = ['Select Item', 'Reason', 'Pickup', 'Confirm'];
const REASONS = [
  'Wrong size / fit issue',
  'Product looks different from image',
  'Defective / damaged product',
  'Wrong item delivered',
  'Changed my mind',
  'Better price elsewhere',
];

export default function ReturnsScreen({ navigation }) {
  const [step, setStep]         = useState(0);
  const [selectedReason, setSelectedReason] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <View style={tw`flex-1 bg-[${COLORS.background}]`}>
        <SubPageHeader title="Return Request" navigation={navigation} />
        <View style={tw`flex-1 items-center justify-center p-6`}>
          <View style={tw`w-[100px] h-[100px] rounded-full bg-[#F0FDF4] items-center justify-center mb-5`}>
            <Icon name="check-circle" size={56} color={COLORS.success} />
          </View>
          <Text style={tw`text-2xl font-extrabold text-[${COLORS.text}] mb-2.5`}>
            Return Initiated!
          </Text>
          <Text style={tw`text-sm text-[${COLORS.textSecondary}] text-center leading-[21px] mb-6`}>
            Your return request has been submitted.{'\n'}
            Pickup scheduled for Mar 16, 2026 between 10AM–2PM.
          </Text>
          <View style={tw`w-full bg-[${COLORS.surface}] rounded-2xl p-3.5 border border-[${COLORS.border}] mb-5`}>
            {[
              { icon: 'ticket-outline', label: 'Request ID', value: '#RT82744' },
              { icon: 'calendar-outline', label: 'Pickup Date', value: 'Mar 16, 2026' },
              { icon: 'cash-refund', label: 'Refund', value: '₹4,599 in 5–7 days' },
            ].map(item => (
              <View key={item.label} style={tw`flex-row items-center gap-2.5 py-2.25`}>
                <Icon name={item.icon} size={16} color={COLORS.primary} />
                <Text style={tw`flex-1 text-[13px] text-[${COLORS.textSecondary}]`}>{item.label}</Text>
                <Text style={tw`text-[13px] font-bold text-[${COLORS.text}]`}>{item.value}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('TrackOrder')} style={tw`bg-[${COLORS.primary}] rounded-2xl py-3.5 px-10`}>
            <Text style={tw`text-white font-extrabold text-[15px]`}>Track Return</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader title="Returns & Exchanges" subtitle="Easy 15-day returns" navigation={navigation} />

      {/* Stepper */}
      <View style={tw`flex-row justify-center items-start py-3.5 px-2.5 bg-[${COLORS.surface}] border-b border-[${COLORS.border}]`}>
        {STEPS.map((s, i) => (
          <View key={s} style={tw`items-center flex-1 relative`}>
            <View style={[
              tw`w-7 h-7 rounded-full bg-[${COLORS.border}] items-center justify-center mb-1.25`,
              i <= step && tw`bg-[${COLORS.primary}]`
            ]}>
              {i < step
                ? <Icon name="check" size={13} color="#fff" />
                : <Text style={[
                    tw`text-xs font-bold text-[${COLORS.textMuted}]`,
                    i === step && tw`text-white`
                  ]}>{i + 1}</Text>
              }
            </View>
            <Text style={[
              tw`text-[9px] text-[${COLORS.textMuted}] text-center font-semibold`,
              i === step && tw`text-[${COLORS.primary}]`
            ]}>{s}</Text>
            {i < STEPS.length - 1 && (
              <View style={[
                tw`absolute top-3.5 left-[55%] right-[-45%] h-0.5 bg-[${COLORS.border}]`,
                i < step && tw`bg-[${COLORS.primary}]`
              ]} />
            )}
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4 pb-8`}>
        {step === 0 && (
          <View>
            <Text style={tw`text-base font-bold text-[${COLORS.text}] mb-3.5`}>Select Item to Return</Text>
            <TouchableOpacity onPress={() => setStep(1)} style={[
              tw`flex-row items-center gap-3 bg-[${COLORS.surface}] rounded-2xl p-3.5 border-2 border-[${COLORS.border}] shadow-lg`,
              tw`border-[${COLORS.primary}] bg-[${COLORS.surfaceWarm}]`
            ]}>
              <View style={tw`w-[52px] h-[52px] rounded-[10px] bg-[${COLORS.background}] items-center justify-center`}>
                <Text style={tw`text-[28px]`}>🥻</Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-sm font-bold text-[${COLORS.text}]`}>Banarasi Silk Saree</Text>
                <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mt-0.5`}>Size M · Order #KP2714</Text>
                <Text style={tw`text-[13px] font-bold text-[${COLORS.primary}] mt-1`}>₹4,599</Text>
              </View>
              <Icon name="checkbox-marked-circle" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        )}

        {step === 1 && (
          <View>
            <Text style={tw`text-base font-bold text-[${COLORS.text}] mb-3.5`}>Why are you returning?</Text>
            {REASONS.map(reason => (
              <TouchableOpacity
                key={reason}
                onPress={() => setSelectedReason(reason)}
                style={[
                  tw`flex-row items-center gap-3 py-3.25 px-3.5 rounded-xl mb-2 border border-[${COLORS.border}] bg-[${COLORS.surface}]`,
                  selectedReason === reason && tw`border-[${COLORS.primary}] bg-[${COLORS.surfaceWarm}]`
                ]}
              >
                <View style={[
                  tw`w-5 h-5 rounded-full border-2 border-[${COLORS.border}] items-center justify-center`,
                  selectedReason === reason && tw`border-[${COLORS.primary}]`
                ]}>
                  {selectedReason === reason && <View style={tw`w-2.5 h-2.5 rounded-full bg-[${COLORS.primary}]`} />}
                </View>
                <Text style={[
                  tw`text-sm text-[${COLORS.textSecondary}]`,
                  selectedReason === reason && tw`text-[${COLORS.text}] font-semibold`
                ]}>
                  {reason}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => selectedReason && setStep(2)}
              style={[
                tw`bg-[${COLORS.primary}] rounded-2xl py-3.5 items-center mt-4`,
                !selectedReason && tw`bg-[${COLORS.border}]`
              ]}
            >
              <Text style={tw`text-white font-extrabold text-[15px]`}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={tw`text-base font-bold text-[${COLORS.text}] mb-3.5`}>Pickup Address</Text>
            <View style={tw`flex-row items-start gap-2.5 bg-[${COLORS.surface}] rounded-2xl p-3.5 border border-[${COLORS.border}] mb-3 shadow-lg`}>
              <Icon name="map-marker-outline" size={18} color={COLORS.primary} />
              <View style={tw`flex-1`}>
                <Text style={tw`text-sm font-bold text-[${COLORS.text}]`}>Priya Sharma</Text>
                <Text style={tw`text-xs text-[${COLORS.textSecondary}] mt-0.75 leading-[17px]`}>
                  42, Lotus Lane, Sector 18, Noida — 201301
                </Text>
              </View>
              <TouchableOpacity style={tw`px-2.5 py-1 rounded-full border border-[${COLORS.primary}]`}>
                <Text style={tw`text-xs font-semibold text-[${COLORS.primary}]`}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row items-center gap-2.5 bg-[#F0FDF4] rounded-2xl p-3.5 border border-[#BBF7D0]`}>
              <Icon name="cash-refund" size={20} color={COLORS.success} />
              <View style={tw`flex-1`}>
                <Text style={tw`text-sm font-bold text-[${COLORS.success}]`}>Refund: ₹4,599</Text>
                <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mt-0.5`}>Will be credited in 5–7 business days</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setStep(3)} style={tw`bg-[${COLORS.primary}] rounded-2xl py-3.5 items-center mt-4`}>
              <Text style={tw`text-white font-extrabold text-[15px]`}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={tw`text-base font-bold text-[${COLORS.text}] mb-3.5`}>Confirm Return</Text>
            {[
              { label: 'Item',    value: 'Banarasi Silk Saree' },
              { label: 'Reason',  value: selectedReason },
              { label: 'Pickup',  value: 'Mar 16, 2026, 10AM–2PM' },
              { label: 'Refund',  value: '₹4,599 in 5–7 days' },
            ].map(row => (
              <View key={row.label} style={tw`flex-row justify-between items-center py-3 border-b border-[${COLORS.border}]`}>
                <Text style={tw`text-[13px] text-[${COLORS.textSecondary}]`}>{row.label}</Text>
                <Text style={tw`text-[13px] font-semibold text-[${COLORS.text}] flex-1 text-right ml-2`}>{row.value}</Text>
              </View>
            ))}
            <TouchableOpacity onPress={() => setSubmitted(true)} style={tw`bg-[${COLORS.primary}] rounded-2xl py-3.5 items-center mt-4`}>
              <Text style={tw`text-white font-extrabold text-[15px]`}>Submit Return Request</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}