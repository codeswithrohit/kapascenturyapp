// components/Footer.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import { COLORS, FONTS } from '../assets/theme';

const FOOTER_LINKS = {
  'Quick Links': ['Home', 'New Arrivals', 'Best Sellers', 'Sale', 'Blog'],
  'Help': ['Track Order', 'Returns', 'Size Guide', 'FAQ', 'Contact Us'],
  'About': ['Our Story', 'Sustainability', 'Careers', 'Press', 'Affiliates'],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <View style={{ backgroundColor: '#1A0A0A' }}>
      {/* Newsletter section */}
      <View style={[
        tw`mx-4 my-5 p-5 rounded-2xl`,
        { backgroundColor: COLORS.primary }
      ]}>
        <Text style={{
          color: COLORS.secondaryLight,
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 4,
        }}>
          ✉️ Newsletter
        </Text>
        <Text style={{
          color: '#fff',
          fontSize: 18,
          fontFamily: FONTS.heading,
          fontWeight: '700',
          marginBottom: 4,
        }}>
          Stay in Style
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, marginBottom: 16, lineHeight: 17 }}>
          Get exclusive offers, new arrivals and styling tips delivered to you.
        </Text>

        {!subscribed ? (
          <View style={tw`flex-row gap-2`}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Your email address"
              placeholderTextColor="rgba(255,255,255,0.4)"
              style={[
                tw`flex-1 px-4 py-3 rounded-xl`,
                { backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 13 }
              ]}
              keyboardType="email-address"
            />
            <TouchableOpacity
              onPress={() => email.includes('@') && setSubscribed(true)}
              style={[
                tw`px-4 py-3 rounded-xl items-center justify-center`,
                { backgroundColor: COLORS.secondary }
              ]}
            >
              <Text style={{ color: '#5C0000', fontWeight: '700', fontSize: 13 }}>→</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[
            tw`py-3 rounded-xl items-center`,
            { backgroundColor: 'rgba(255,255,255,0.15)' }
          ]}>
            <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>
              🎉 You're subscribed!
            </Text>
          </View>
        )}
      </View>

      {/* Trust badges */}
      <View style={tw`flex-row justify-around px-4 py-4`}>
        {[
          { emoji: '🔒', label: 'Secure Pay' },
          { emoji: '🚚', label: 'Free Ship' },
          { emoji: '↩️', label: 'Easy Return' },
          { emoji: '💎', label: 'Authentic' },
        ].map((badge) => (
          <View key={badge.label} style={tw`items-center gap-1`}>
            <Text style={{ fontSize: 22 }}>{badge.emoji}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>{badge.label}</Text>
          </View>
        ))}
      </View>

      {/* Divider */}
      <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginHorizontal: 16 }} />

      {/* Collapsible Link Sections */}
      {Object.entries(FOOTER_LINKS).map(([section, links]) => (
        <View key={section}>
          <TouchableOpacity
            onPress={() => setExpanded(expanded === section ? null : section)}
            style={tw`flex-row justify-between items-center px-5 py-4`}
          >
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>{section}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>
              {expanded === section ? '−' : '+'}
            </Text>
          </TouchableOpacity>

          {expanded === section && (
            <View style={tw`px-5 pb-3`}>
              {links.map((link) => (
                <TouchableOpacity key={link} style={tw`py-1.5`}>
                  <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{link}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: 16 }} />
        </View>
      ))}

      {/* Social + Brand */}
      <View style={tw`px-5 py-5 items-center`}>
        
       

        

        <Text style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 16 }}>
          © 2026 Kapas Century. All rights reserved.
        </Text>
      </View>
    </View>
  );
}
