import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, swatch } from '../utils/theme';
import { useFavs } from '../utils/FavContext';

export default function PatternCard({ item, onPress }) {
  const { isFav, toggle } = useFavs();
  return (
    <TouchableOpacity style={s.card} onPress={onPress}>
      <View style={s.bar}>
        {item.colors.map(c => <View key={c} style={{ flex: 1, backgroundColor: swatch[c] || '#999' }} />)}
      </View>
      <View style={s.body}>
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{item.name}</Text>
          <Text style={s.meta}>{item.region} | {item.technique}</Text>
        </View>
        <TouchableOpacity onPress={() => toggle(item.id)} hitSlop={10}>
          <Ionicons name={isFav(item.id) ? 'heart' : 'heart-outline'} size={24} color={C.clay} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
const s = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: 10, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.line },
  bar: { flexDirection: 'row', height: 36 },
  body: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  name: { fontSize: 17, fontWeight: '700', color: C.ink },
  meta: { color: '#6b6355', marginTop: 2 },
});
