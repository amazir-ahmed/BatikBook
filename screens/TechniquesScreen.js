import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import techniques from '../data/techniques.json';
import { C } from '../utils/theme';

export default function TechniquesScreen() {
  return (
    <FlatList style={{ backgroundColor: C.wax }} contentContainerStyle={{ padding: 16 }}
      data={techniques} keyExtractor={i => String(i.id)}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.t}>{item.name}</Text>
          <Text style={s.p}>{item.description}</Text>
          <Text style={s.p}>Process: {item.process}</Text>
        </View>
      )} />
  );
}
const s = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: 10, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: C.line },
  t: { fontSize: 18, fontWeight: '700', color: C.indigo },
  p: { color: '#4a4437', marginTop: 6, lineHeight: 21 },
});
