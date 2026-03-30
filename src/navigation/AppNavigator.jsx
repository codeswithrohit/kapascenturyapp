// navigation/AppNavigator.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import { COLORS } from '../assets/theme';
import { useCart } from '../context/CartContext';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CartScreen from '../screens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

// Profile sub-screens
import EditProfileScreen from '../screens/profileScreens/EditProfileScreen';
import SavedAddressesScreen from '../screens/profileScreens/SavedAddressesScreen';
import PaymentMethodsScreen from '../screens/profileScreens/PaymentMethodsScreen';
import MyCouponsScreen from '../screens/profileScreens/MyCouponsScreen';
import TrackOrderScreen from '../screens/profileScreens/TrackOrderScreen';
import MyReviewsScreen from '../screens/profileScreens/MyReviewsScreen';
import ReturnsScreen from '../screens/profileScreens/ReturnsScreen';
import NotificationsScreen from '../screens/profileScreens/NotificationsScreen';
import SizePreferencesScreen from '../screens/profileScreens/SizePreferencesScreen';
import SupportScreen from '../screens/profileScreens/SupportScreen';
import TermsScreen from '../screens/profileScreens/TermsScreen';
import RateAppScreen from '../screens/profileScreens/RateAppScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ── Tab icon component ──────────────────────────────────────────
function TabIcon({ iconName, label, focused, badgeCount }) {
  return (
    <View style={tw`items-center`}>
      <View style={{ position: 'relative' }}>
        <Icon
          name={iconName}
          size={24}
          color={focused ? COLORS.primary : '#9CA3AF'}
        />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              top: -4,
              right: -6,
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 3,
              borderWidth: 1.5,
              borderColor: '#fff',
            }}
          >
            <Text style={{ fontSize: 8, color: '#fff', fontWeight: '800' }}>
              {badgeCount > 9 ? '9+' : badgeCount}
            </Text>
          </View>
        )}
      </View>
      <Text
        style={{
          fontSize: 10,
          marginTop: 2,
          fontWeight: focused ? '700' : '500',
          color: focused ? COLORS.primary : '#9CA3AF',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

// ── Bottom Tab Navigator ────────────────────────────────────────
function HomeTabs() {
  const insets = useSafeAreaInsets();
  const { itemCount, wishlist } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#8B0000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'home' : 'home-outline'}
              label="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'view-grid' : 'view-grid-outline'}
              label="Shop"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'cart' : 'cart-outline'}
              label="Cart"
              focused={focused}
              badgeCount={itemCount}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'heart' : 'heart-outline'}
              label="Saved"
              focused={focused}
              badgeCount={wishlist.length}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'account' : 'account-outline'}
              label="Me"
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ── Root Stack Navigator ────────────────────────────────────────
export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          {/* Main tabs */}
          <Stack.Screen name="Main" component={HomeTabs} />

          {/* Product */}
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

          {/* Profile sub-pages */}
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="SavedAddresses"
            component={SavedAddressesScreen}
          />
          <Stack.Screen
            name="PaymentMethods"
            component={PaymentMethodsScreen}
          />
          <Stack.Screen name="MyCoupons" component={MyCouponsScreen} />
          <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
          <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
          <Stack.Screen name="Returns" component={ReturnsScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen
            name="SizePreferences"
            component={SizePreferencesScreen}
          />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="Terms" component={TermsScreen} />
          <Stack.Screen name="RateApp" component={RateAppScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
