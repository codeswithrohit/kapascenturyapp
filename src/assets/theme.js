// assets/theme.js - Design System
export const COLORS = {
  primary: '#8B0000',        // Deep crimson
  primaryLight: '#C41E3A',   // Rich red
  primaryDark: '#5C0000',    // Dark wine
  secondary: '#D4AF37',      // Antique gold
  secondaryLight: '#F5D060', // Light gold
  accent: '#FF6B6B',         // Coral pink
  background: '#FFF8F5',     // Warm off-white
  surface: '#FFFFFF',
  surfaceWarm: '#FFF0E8',
  text: '#1A0A0A',           // Near black with warm tint
  textSecondary: '#6B4E4E',  // Warm muted
  textMuted: '#9E7E7E',
  border: '#F0DDD8',
  success: '#2D7A4F',
  overlay: 'rgba(139,0,0,0.85)',
  gradientStart: '#8B0000',
  gradientEnd: '#C41E3A',
  cardShadow: 'rgba(139,0,0,0.12)',
  gold: '#D4AF37',
  goldLight: 'rgba(212,175,55,0.15)',
};

export const FONTS = {
  display: 'Georgia',          // Elegant serif for headings
  heading: 'Georgia',
  body: 'System',
  accent: 'Georgia',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const SHADOW = {
  card: {
    shadowColor: '#8B0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  heavy: {
    shadowColor: '#8B0000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
};

// Mock product data
export const PRODUCTS = [
  { id: '1', name: 'Banarasi Silk Saree', price: 4599, originalPrice: 7200, image: 'https://demo2-milano.myshopify.com/cdn/shop/files/fs4_2_2.jpg?v=1757989565&width=660', tag: 'BESTSELLER', rating: 4.8, reviews: 234, category: 'Sarees' },
  { id: '2', name: 'Anarkali Suit Set', price: 2899, originalPrice: 4500, image: 'https://demo2-milano.myshopify.com/cdn/shop/files/fs4_7_2.webp?v=1758097443&width=660', tag: 'NEW', rating: 4.6, reviews: 156, category: 'Suits' },
  { id: '3', name: 'Lehenga Choli', price: 6499, originalPrice: 9800, image: 'https://demo2-milano.myshopify.com/cdn/shop/files/fs4_7_2.webp?v=1758097443&width=660', tag: 'HOT', rating: 4.9, reviews: 389, category: 'Lehengas' },
  { id: '4', name: 'Palazzo Kurta', price: 1299, originalPrice: 2200, image: 'https://demo2-milano.myshopify.com/cdn/shop/files/fs4_7_2.webp?v=1758097443&width=660', tag: 'SALE', rating: 4.4, reviews: 98, category: 'Kurtas' },
  { id: '5', name: 'Embroidered Dupatta', price: 899, originalPrice: 1500, image: 'https://demo2-milano.myshopify.com/cdn/shop/files/fs4_4_2.jpg?v=1757990041&width=720', tag: 'NEW', rating: 4.5, reviews: 67, category: 'Accessories' },
  { id: '6', name: 'Chaniya Choli', price: 5299, originalPrice: 7800, image: 'https://demo2-milano.myshopify.com/cdn/shop/files/fs4_7_2.webp?v=1758097443&width=660', tag: 'HOT', rating: 4.7, reviews: 201, category: 'Lehengas' },
  { id: '7', name: 'Silk Kurti', price: 1799, originalPrice: 2800, image: 'https://demo2-milano.myshopify.com/cdn/shop/files/fs4_4_2.jpg?v=1757990041&width=720', tag: 'BESTSELLER', rating: 4.6, reviews: 145, category: 'Kurtas' },
  { id: '8', name: 'Georgette Saree', price: 3299, originalPrice: 5200, image: 'https://demo2-milano.myshopify.com/cdn/shop/files/fs4_2_2.jpg?v=1757989565&width=660', tag: 'SALE', rating: 4.3, reviews: 178, category: 'Sarees' },
];

export const CATEGORIES = [
  { id: '1', name: 'Sarees', emoji: '🥻', color: '#8B0000' },
  { id: '2', name: 'Lehengas', emoji: '👗', color: '#C41E3A' },
  { id: '3', name: 'Suits', emoji: '✨', color: '#9B2335' },
  { id: '4', name: 'Kurtas', emoji: '👘', color: '#7B1A1A' },
  { id: '5', name: 'Dupattas', emoji: '🎀', color: '#B91C1C' },
  { id: '6', name: 'Bridal', emoji: '💍', color: '#D4AF37' },
  { id: '7', name: 'Fusion', emoji: '🌟', color: '#A21C1C' },
  { id: '8', name: 'Accessories', emoji: '💎', color: '#8B0000' },
];

export const BANNERS = [
  { id: '1', title: 'Festive Collection', subtitle: 'Up to 50% off on Bridal Wear', cta: 'Shop Now', bg: '#8B0000' },
  { id: '2', title: 'New Arrivals', subtitle: 'Fresh Styles for Every Occasion', cta: 'Explore', bg: '#C41E3A' },
  { id: '3', title: 'Flash Sale', subtitle: 'Extra 20% off Today Only', cta: 'Grab Now', bg: '#5C0000' },
];
