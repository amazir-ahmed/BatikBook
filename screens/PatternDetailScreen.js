import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import patterns from '../data/patterns.json';
import { useFavs } from '../utils/FavContext';
import { C, swatch } from '../utils/theme';

const Section = ({ title, children }) => (
  <View style={{ marginTop: 16 }}><Text style={s.h2}>{title}</Text><Text style={s.p}>{children}</Text></View>
);

export default function PatternDetailScreen({ route }) {
  const p = patterns.find(x => x.id === route.params.id);
  const { isFav, toggle } = useFavs();
  return (
    <ScrollView style={{ backgroundColor: C.wax }}>
      <View style={{ flexDirection: 'row', height: 120 }}>
        {p.colors.map(c => <View key={c} style={{ flex: 1, backgroundColor: swatch[c] || '#999' }} />)}
      </View>
      <View style={{ padding: 16 }}>
        <Text style={s.h1}>{p.name}</Text>
        <Text style={s.p}>{p.region} | {p.technique}</Text>
        <TouchableOpacity style={s.btn} onPress={() => toggle(p.id)}>
          <Ionicons name={isFav(p.id) ? 'heart' : 'heart-outline'} size={20} color="#fff" />
          <Text style={{ color: '#fff', marginLeft: 8, fontWeight: '700' }}>{isFav(p.id) ? 'Remove from favourites' : 'Save to favourites'}</Text>
        </TouchableOpacity>
        <Section title="About">{p.description}</Section>
        <Section title="History">{p.history}</Section>
        <Section title="Colours">{p.colors.join(', ')}</Section>
        <Section title="Common uses">{p.uses.join(', ')}</Section>
        <Section title="Care tips">{p.careTips}</Section>
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  h1: { fontSize: 26, fontWeight: '800', color: C.indigo },
  h2: { fontSize: 17, fontWeight: '700', color: C.ink },
  p: { color: '#4a4437', lineHeight: 22, marginTop: 4 },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: C.clay, padding: 12, borderRadius: 10, marginTop: 14 },
});
