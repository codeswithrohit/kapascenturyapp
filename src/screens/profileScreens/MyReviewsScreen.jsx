// screens/profile/MyReviewsScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubPageHeader from '../profileScreens/SubPageHeader';
import { COLORS, SHADOW } from '../../assets/theme';
import tw from 'twrnc';

const REVIEWS = [
  { id: '1', product: 'Banarasi Silk Saree', rating: 5, date: 'Mar 12, 2026', text: 'Absolutely beautiful! The weave is exquisite and the colour is exactly as shown. Delivery was fast too.', helpful: 12, image: '🥻' },
  { id: '2', product: 'Anarkali Suit Set',   rating: 4, date: 'Feb 20, 2026', text: 'Very nice quality. The embroidery is detailed and the fabric is comfortable. Slightly larger than expected sizing.', helpful: 8, image: '👗' },
  { id: '3', product: 'Palazzo Kurta',       rating: 5, date: 'Jan 30, 2026', text: 'Love this kurta! Perfect for casual outings. Comfortable, breathable, and the print is lovely.', helpful: 5, image: '👘' },
];

const PENDING = [
  { id: 'p1', product: 'Embroidered Dupatta', orderId: '#KP2831', image: '🎀' },
  { id: 'p2', product: 'Silk Kurti',          orderId: '#KP2831', image: '👚' },
];

function StarSelector({ value, onChange }) {
  return (
    <View style={tw`flex-row gap-1.5`}>
      {[1, 2, 3, 4, 5].map(s => (
        <TouchableOpacity key={s} onPress={() => onChange(s)}>
          <Icon name={s <= value ? 'star' : 'star-outline'} size={30} color={s <= value ? '#F59E0B' : COLORS.border} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function MyReviewsScreen({ navigation }) {
  const [tab, setTab] = useState('given');
  const [writeModal, setWriteModal] = useState(null); // pending item
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const submitReview = () => {
    setWriteModal(null);
    setRating(0);
    setReviewText('');
  };

  return (
    <View style={tw`flex-1 bg-[${COLORS.background}]`}>
      <SubPageHeader title="My Reviews" subtitle={`${REVIEWS.length} reviews given`} navigation={navigation} />

      {/* Tabs */}
      <View style={tw`flex-row mx-3.5 mt-3.5 bg-[${COLORS.surface}] rounded-xl border border-[${COLORS.border}] p-1`}>
        {[
          { key: 'given',   label: `Given (${REVIEWS.length})` },
          { key: 'pending', label: `Pending (${PENDING.length})` },
        ].map(t => (
          <TouchableOpacity key={t.key} onPress={() => setTab(t.key)}
            style={[
              tw`flex-1 py-2 rounded-lg items-center`,
              tab === t.key && tw`bg-[${COLORS.primary}]`
            ]}>
            <Text style={[
              tw`text-[13px] font-semibold`,
              tab === t.key ? tw`text-white` : tw`text-[${COLORS.textSecondary}]`
            ]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`px-4 pb-8`}>
        {tab === 'given' ? (
          REVIEWS.map(review => (
            <View key={review.id} style={tw`bg-[${COLORS.surface}] rounded-2xl p-3.5 mb-3 border border-[${COLORS.border}] shadow-lg`}>
              {/* Header */}
              <View style={tw`flex-row items-center gap-2.5 mb-2.5`}>
                <View style={tw`w-12 h-12 rounded-xl bg-[${COLORS.surfaceWarm}] items-center justify-center`}>
                  <Text style={tw`text-[26px]`}>{review.image}</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-sm font-bold text-[${COLORS.text}]`}>{review.product}</Text>
                  <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mt-0.5`}>{review.date}</Text>
                </View>
                <TouchableOpacity style={tw`w-8 h-8 rounded-lg bg-[${COLORS.surfaceWarm}] items-center justify-center`}>
                  <Icon name="pencil-outline" size={15} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              {/* Stars */}
              <View style={tw`flex-row items-center gap-0.5 mb-2`}>
                {[1,2,3,4,5].map(s => (
                  <Icon key={s} name={s <= review.rating ? 'star' : 'star-outline'} size={16} color={s <= review.rating ? '#F59E0B' : COLORS.border} />
                ))}
                <Text style={tw`text-xs font-bold text-[${COLORS.text}] ml-1`}>{review.rating}.0</Text>
              </View>

              {/* Text */}
              <Text style={tw`text-[13px] text-[${COLORS.textSecondary}] leading-5`}>{review.text}</Text>

              {/* Helpful */}
              <View style={tw`flex-row mt-2.5 pt-2.5 border-t border-[${COLORS.border}]`}>
                <TouchableOpacity style={tw`flex-row items-center gap-1.25`}>
                  <Icon name="thumb-up-outline" size={13} color={COLORS.textMuted} />
                  <Text style={tw`text-xs text-[${COLORS.textMuted}]`}>Helpful ({review.helpful})</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <>
            <Text style={tw`text-[13px] text-[${COLORS.textSecondary}] leading-[18px] mb-3`}>
              🛍 You haven't reviewed these items yet. Share your experience!
            </Text>
            {PENDING.map(item => (
              <View key={item.id} style={tw`flex-row items-center gap-3 bg-[${COLORS.surface}] rounded-2xl p-3 mb-2.5 border border-[${COLORS.border}] shadow-lg`}>
                <View style={tw`w-12 h-12 rounded-xl bg-[${COLORS.surfaceWarm}] items-center justify-center`}>
                  <Text style={tw`text-[26px]`}>{item.image}</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-sm font-bold text-[${COLORS.text}]`}>{item.product}</Text>
                  <Text style={tw`text-[11px] text-[${COLORS.textMuted}] mt-0.5`}>Order {item.orderId}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setWriteModal(item)}
                  style={tw`flex-row items-center gap-1.25 px-3 py-1.75 rounded-[10px] bg-[${COLORS.primary}]`}
                >
                  <Icon name="star-edit-outline" size={14} color="#fff" />
                  <Text style={tw`text-white font-bold text-xs`}>Write</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* Write Review Modal */}
      <Modal visible={!!writeModal} transparent animationType="slide">
        <View style={tw`flex-1 bg-black/50 justify-end`}>
          <View style={tw`bg-[${COLORS.surface}] rounded-t-3xl p-5 pb-9`}>
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <Text style={tw`text-[17px] font-bold text-[${COLORS.text}]`}>Write a Review</Text>
              <TouchableOpacity onPress={() => setWriteModal(null)}>
                <Icon name="close" size={22} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <Text style={tw`text-sm text-[${COLORS.textSecondary}] mb-4`}>{writeModal?.product}</Text>

            <Text style={tw`text-xs font-bold text-[${COLORS.textMuted}] mb-2`}>Your Rating</Text>
            <StarSelector value={rating} onChange={setRating} />

            <Text style={[tw`text-xs font-bold text-[${COLORS.textMuted}] mb-2`, tw`mt-4`]}>Your Review</Text>
            <TextInput
              value={reviewText}
              onChangeText={setReviewText}
              placeholder="Share your experience with this product..."
              placeholderTextColor={COLORS.textMuted}
              multiline
              numberOfLines={4}
              style={tw`border border-[${COLORS.border}] rounded-xl p-3 text-sm text-[${COLORS.text}] min-h-[100px] bg-[${COLORS.surfaceWarm}] mb-4`}
              textAlignVertical="top"
            />

            <TouchableOpacity onPress={submitReview} style={tw`flex-row items-center justify-center gap-2 bg-[${COLORS.primary}] rounded-2xl py-3.5`}>
              <Icon name="send" size={16} color="#fff" />
              <Text style={tw`text-white font-extrabold text-[15px]`}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}