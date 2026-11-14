import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import patterns from '../data/patterns.json';
import PatternCard from '../components/PatternCard';
import { C } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  const [q, setQ] = useState('');
  const today = patterns[new Date().getDate() % patterns.length];
  const featured = patterns.slice(0, 3);
  const techniques = [...new Set(patterns.map(p => p.technique))];
  const results = q ? patterns.filter(p => p.name.toLowerCase().includes(q.toLowerCase())) : [];
  const open = item => navigation.navigate('Detail', { id: item.id });

  return (
    <ScrollView style={s.page} contentContainerStyle={{ padding: 16 }}>
      <Text style={s.h1}>BatikBook</Text>
      <Text style={s.sub}>Sri Lankan textile and handloom patterns, offline.</Text>
      <TextInput style={s.input} placeholder="Search patterns" value={q} onChangeText={setQ} />
      {q ? (results.length ? results.map(i => <PatternCard key={i.id} item={i} onPress={() => open(i)} />)
        : <Text style={s.empty}>No pattern matches "{q}".</Text>) : (
        <>
          <Text style={s.h2}>Pattern of the day</Text>
          <PatternCard item={today} onPress={() => open(today)} />
          <Text style={s.h2}>Browse by technique</Text>
          <View style={s.row}>
            {techniques.map(t => (
              <TouchableOpacity key={t} style={s.chip} onPress={() => navigation.navigate('Patterns', { technique: t })}>
                <Text style={{ color: '#fff' }}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={s.h2}>Featured</Text>
          {featured.map(i => <PatternCard key={i.id} item={i} onPress={() => open(i)} />)}
        </>
      )}
    </ScrollView>
  );
}
const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.wax },
  h1: { fontSize: 32, fontWeight: '800', color: C.indigo },
  sub: { color: '#6b6355', marginBottom: 12 },
  h2: { fontSize: 18, fontWeight: '700', color: C.ink, marginTop: 14, marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: C.line },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: C.clay, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  empty: { marginTop: 20, color: '#6b6355' },
});
