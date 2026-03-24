// screens/ProductDetailScreen.jsx
import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image,
  Dimensions, StatusBar, ToastAndroid, Platform,
  Animated, Share
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import { COLORS, FONTS, SHADOW, PRODUCTS } from '../assets/theme';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const { width: SCREEN_W } = Dimensions.get('window');
const HEADER_H = 100;
const IMG_H = SCREEN_W * 0.9;

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function showToast(msg, isError = false) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
}

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const insets = useSafeAreaInsets();
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useCart();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [selectedSize, setSelectedSize] = useState('M');
  const [imgIndex, setImgIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const similar = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, IMG_H - 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const images = [
    product.image,
    `https://picsum.photos/seed/${product.id}b/400/500`,
    `https://picsum.photos/seed/${product.id}c/400/500`,
    `https://picsum.photos/seed/${product.id}d/400/500`,
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${product.name} on FashionHub! ₹${product.price}`,
        title: 'Share Product',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size', true);
      return;
    }
    addToCart(product, selectedSize, qty);
    showToast('Added to cart! ✨');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast('Please select a size', true);
      return;
    }
    addToCart(product, selectedSize, qty);
    navigation.navigate('Cart');
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Fixed Header */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        backgroundColor: COLORS.surface,
        paddingTop: insets.top,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        ...SHADOW.small,
      }}>
        <View style={tw`flex-row items-center justify-between px-4`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[tw`w-10 h-10 items-center justify-center rounded-full`, { backgroundColor: COLORS.surfaceWarm }]}
          >
            <Icon name="arrow-back" size={22} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={[tw`text-lg font-semibold flex-1 text-center`, { color: COLORS.text }]} numberOfLines={1}>
            {product.name}
          </Text>
          <TouchableOpacity
            onPress={handleShare}
            style={[tw`w-10 h-10 items-center justify-center rounded-full`, { backgroundColor: COLORS.surfaceWarm }]}
          >
            <Icon name="share-outline" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: insets.top + 60 }}
      >
        {/* Image Gallery */}
        <View style={{ height: IMG_H, position: 'relative', marginTop: 0 }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              setImgIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W));
            }}
          >
            {images.map((img, i) => (
              <Image
                key={i}
                source={{ uri: img }}
                style={{ width: SCREEN_W, height: IMG_H }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Wishlist Button */}
          <TouchableOpacity
            onPress={() => {
              toggleWishlist(product);
              showToast(wishlisted ? 'Removed from wishlist 💔' : 'Added to wishlist ❤️');
            }}
            style={[
              tw`absolute items-center justify-center rounded-full`,
              {
                top: 16,
                right: 16,
                width: 44,
                height: 44,
                backgroundColor: wishlisted ? COLORS.primary : 'rgba(255,255,255,0.95)',
                ...SHADOW.soft,
              }
            ]}
          >
            <Icon
              name={wishlisted ? 'heart' : 'heart-outline'}
              size={22}
              color={wishlisted ? '#fff' : COLORS.primary}
            />
          </TouchableOpacity>

          {/* Image Dots */}
          <View style={tw`absolute bottom-4 w-full flex-row justify-center gap-2`}>
            {images.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === imgIndex ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: i === imgIndex ? COLORS.primary : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </View>

          {/* Discount Badge */}
          {discount > 0 && (
            <View style={[
              tw`absolute items-center justify-center rounded-xl`,
              {
                bottom: 16,
                left: 16,
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderRadius: 12,
              }
            ]}>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '800' }}>
                {discount}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* Product Info Card */}
        <View style={[
          tw`rounded-t-3xl`,
          { 
            backgroundColor: COLORS.surface, 
            paddingTop: 20, 
            paddingHorizontal: 20, 
            paddingBottom: 8,
            marginTop: -20,
          }
        ]}>
          {/* Category & Rating */}
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View style={[
              tw`px-3 py-1.5 rounded-full flex-row items-center gap-1`,
              { backgroundColor: COLORS.surfaceWarm, borderWidth: 1, borderColor: COLORS.border }
            ]}>
              <IconMC name="tag-outline" size={12} color={COLORS.primary} />
              <Text style={{ color: COLORS.primary, fontSize: 12, fontWeight: '600' }}>
                {product.category}
              </Text>
            </View>

            <View style={tw`flex-row items-center gap-2`}>
              <View style={[
                tw`flex-row items-center px-2 py-1 rounded-lg`,
                { backgroundColor: '#FFB800' }
              ]}>
                <Icon name="star" size={14} color="#fff" />
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700', marginLeft: 4 }}>
                  {product.rating}
                </Text>
              </View>
              <Text style={{ color: COLORS.textMuted, fontSize: 12 }}>
                {product.reviews} reviews
              </Text>
            </View>
          </View>

          {/* Product Name */}
          <Text style={{
            fontSize: 24,
            fontFamily: FONTS.heading,
            fontWeight: '700',
            color: COLORS.text,
            lineHeight: 30,
            marginBottom: 12,
          }}>
            {product.name}
          </Text>

          {/* Price Section */}
          <View style={tw`flex-row items-center gap-3 mb-6`}>
            <Text style={{
              fontSize: 28,
              fontWeight: '800',
              color: COLORS.primary,
            }}>
              ₹{product.price.toLocaleString('en-IN')}
            </Text>
            {product.originalPrice > product.price && (
              <>
                <Text style={{
                  fontSize: 16,
                  color: COLORS.textMuted,
                  textDecorationLine: 'line-through',
                }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </Text>
                <View style={[
                  tw`px-2 py-1 rounded-lg`,
                  { backgroundColor: '#E8F5E9' }
                ]}>
                  <Text style={{ color: COLORS.success, fontWeight: '700', fontSize: 12 }}>
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: COLORS.border, marginBottom: 24 }} />

          {/* Size Selection */}
          <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 12 }}>
            Select Size
          </Text>
          <View style={tw`flex-row flex-wrap gap-3 mb-4`}>
            {SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[
                  tw`items-center justify-center rounded-xl`,
                  {
                    width: 56,
                    height: 48,
                    borderWidth: selectedSize === size ? 2 : 1,
                    borderColor: selectedSize === size ? COLORS.primary : COLORS.border,
                    backgroundColor: selectedSize === size ? `${COLORS.primary}10` : COLORS.surface,
                  }
                ]}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: selectedSize === size ? '700' : '500',
                  color: selectedSize === size ? COLORS.primary : COLORS.textSecondary,
                }}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Size Guide Button */}
          <TouchableOpacity style={tw`flex-row items-center gap-2 mb-6`}>
            <IconMC name="ruler" size={16} color={COLORS.primary} />
            <Text style={{ color: COLORS.primary, fontSize: 13, fontWeight: '600' }}>
              Size Guide
            </Text>
          </TouchableOpacity>

          {/* Quantity Selector */}
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.text }}>Quantity</Text>
            <View style={[
              tw`flex-row items-center rounded-xl overflow-hidden`,
              { borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surfaceWarm }
            ]}>
              <TouchableOpacity
                onPress={() => setQty(Math.max(1, qty - 1))}
                style={[tw`px-5 py-3`, { backgroundColor: COLORS.surfaceWarm }]}
              >
                <Icon name="remove" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={{
                fontSize: 18,
                fontWeight: '700',
                paddingHorizontal: 20,
                color: COLORS.text,
                minWidth: 60,
                textAlign: 'center'
              }}>
                {qty}
              </Text>
              <TouchableOpacity
                onPress={() => setQty(qty + 1)}
                style={[tw`px-5 py-3`, { backgroundColor: COLORS.surfaceWarm }]}
              >
                <Icon name="add" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Features Grid */}
          <View style={[
            tw`p-5 rounded-2xl mb-6`,
            { backgroundColor: COLORS.surfaceWarm, borderWidth: 1, borderColor: COLORS.border }
          ]}>
            <View style={tw`flex-row flex-wrap gap-4`}>
              {[
                { icon: 'truck-outline', text: 'Free Delivery', sub: 'Above ₹999' },
                { icon: 'return-up-back-outline', text: 'Easy Returns', sub: '15 days policy' },
                { icon: 'shield-checkmark-outline', text: 'Authentic', sub: '100% genuine' },
                { icon: 'card-outline', text: 'EMI Available', sub: `From ₹${Math.round(product.price / 12)}/mo` },
              ].map((f, i) => (
                <View key={i} style={tw`flex-row items-center gap-3 w-[45%]`}>
                  <View style={[tw`w-10 h-10 items-center justify-center rounded-full`, { backgroundColor: `${COLORS.primary}15` }]}>
                    <Icon name={f.icon} size={18} color={COLORS.primary} />
                  </View>
                  <View>
                    <Text style={{ color: COLORS.text, fontSize: 13, fontWeight: '600' }}>
                      {f.text}
                    </Text>
                    <Text style={{ color: COLORS.textMuted, fontSize: 11 }}>
                      {f.sub}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Product Description */}
          <View style={tw`mb-6`}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 8 }}>
              Product Details
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 14, lineHeight: 20 }}>
              {product.description || 'Premium quality product with excellent craftsmanship. Designed for comfort and style, this piece is perfect for any occasion.'}
            </Text>
          </View>

          {/* Material & Care */}
          <View style={[tw`p-4 rounded-2xl mb-6`, { backgroundColor: `${COLORS.primary}08` }]}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 8 }}>
              Material & Care
            </Text>
            <View style={tw`gap-2`}>
              <View style={tw`flex-row items-center gap-2`}>
                <Icon name="water-outline" size={14} color={COLORS.primary} />
                <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>Machine wash cold</Text>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <Icon name="sunny-outline" size={14} color={COLORS.primary} />
                <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>Do not bleach</Text>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <Icon name="leaf-outline" size={14} color={COLORS.primary} />
                <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>100% Cotton</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Similar Products */}
        {similar.length > 0 && (
          <View style={tw`py-6 bg-background`}>
            <View style={tw`flex-row justify-between items-center px-5 mb-4`}>
              <Text style={[
                tw`text-xl`,
                { fontFamily: FONTS.heading, fontWeight: '700', color: COLORS.text }
              ]}>
                You May Also Like
              </Text>
              <TouchableOpacity>
                <Text style={{ color: COLORS.primary, fontSize: 13, fontWeight: '600' }}>
                  View All →
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
            >
              {similar.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  width={SCREEN_W * 0.44}
                  onPress={() => navigation.replace('ProductDetail', { product: p })}
                />
              ))}
            </ScrollView>
          </View>
        )}

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* Sticky CTA Bar - Professional Buttons */}
      <View style={[
        tw`absolute bottom-0 left-0 right-0`,
        {
          paddingTop: 12,
          paddingBottom: insets.bottom + 12,
          paddingHorizontal: 20,
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          ...SHADOW.heavy,
        }
      ]}>
        <View style={tw`flex-row gap-3`}>
          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={handleAddToCart}
            activeOpacity={0.8}
            style={[
              tw`flex-1 py-4 rounded-2xl items-center flex-row justify-center gap-2`,
              {
                backgroundColor: inCart ? COLORS.success : 'transparent',
                borderWidth: 2,
                borderColor: inCart ? COLORS.success : COLORS.primary,
              }
            ]}
          >
            <Icon 
              name={inCart ? "checkmark-circle" : "bag-add-outline"} 
              size={20} 
              color={inCart ? COLORS.surface : COLORS.primary} 
            />
            <Text style={{ 
              color: inCart ? COLORS.surface : COLORS.primary, 
              fontWeight: '700', 
              fontSize: 16,
              letterSpacing: 0.5,
            }}>
              {inCart ? 'ADDED TO CART' : 'ADD TO CART'}
            </Text>
          </TouchableOpacity>
          
          {/* Buy Now Button */}
          <TouchableOpacity
            onPress={handleBuyNow}
            activeOpacity={0.8}
            style={[
              tw`flex-1 py-4 rounded-2xl items-center flex-row justify-center gap-2`,
              { 
                backgroundColor: COLORS.primary,
                ...SHADOW.medium,
              }
            ]}
          >
            <Icon name="flash-outline" size={18} color="#fff" />
            <Text style={{ 
              color: '#fff', 
              fontWeight: '700', 
              fontSize: 16,
              letterSpacing: 0.5,
            }}>
              BUY NOW
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Price Summary for Better UX */}
        <View style={tw`flex-row justify-between items-center mt-2 px-2`}>
          <Text style={{ color: COLORS.textMuted, fontSize: 12 }}>
            Inclusive of all taxes
          </Text>
          <Text style={{ color: COLORS.primary, fontSize: 13, fontWeight: '600' }}>
            Free Delivery
          </Text>
        </View>
      </View>
    </View>
  );
}