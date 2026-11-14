import React from 'react';
import { ScrollView, Text } from 'react-native';
import { C } from '../utils/theme';

export default function AboutScreen() {
  return (
    <ScrollView style={{ backgroundColor: C.wax }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 26, fontWeight: '800', color: C.indigo }}>BatikBook</Text>
      <Text style={{ marginTop: 10, lineHeight: 22 }}>
        An offline catalogue of Sri Lankan batik and handloom textile patterns. All data is stored on your device, so no internet connection is needed.
      </Text>
      <Text style={{ fontWeight: '700', marginTop: 16 }}>How to use</Text>
      <Text style={{ lineHeight: 22 }}>
        {'1. Search or filter patterns in the Patterns tab.\n2. Tap a pattern to read its history, uses and care tips.\n3. Tap the heart to save it to Favourites.\n4. Read about each method in the Techniques tab.'}
      </Text>
      <Text style={{ fontWeight: '700', marginTop: 16 }}>Credits</Text>
      <Text>Built with React Native and Expo. Dataset compiled by the student developer for ICA 03.</Text>
    </ScrollView>
  );
}
