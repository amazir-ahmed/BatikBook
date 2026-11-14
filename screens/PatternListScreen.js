import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import patterns from '../data/patterns.json';
import PatternCard from '../components/PatternCard';
import { C } from '../utils/theme';

const regions = [...new Set(patterns.map(p => p.region))].sort();
const techs = [...new Set(patterns.map(p => p.technique))].sort();

function Chips({ options, value, onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8, flexGrow: 0 }}>
      {options.map(o => (
        <TouchableOpacity key={o} onPress={() => onChange(value === o ? null : o)}
          style={[s.chip, value === o && s.chipOn]}>
          <Text style={{ color: value === o ? '#fff' : C.ink }}>{o}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default function PatternListScreen({ navigation, route }) {
  const [q, setQ] = useState('');
  const [region, setRegion] = useState(null);
  const [tech, setTech] = useState(null);
  const [asc, setAsc] = useState(true);

  useEffect(() => { if (route.params?.technique) setTech(route.params.technique); }, [route.params]);

  const data = useMemo(() => patterns
    .filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
    .filter(p => !region || p.region === region)
    .filter(p => !tech || p.technique === tech)
    .sort((a, b) => (asc ? 1 : -1) * a.name.localeCompare(b.name)), [q, region, tech, asc]);

  return (
    <View style={s.page}>
      <TextInput style={s.input} placeholder="Search by name" value={q} onChangeText={setQ} />
      <Chips options={regions} value={region} onChange={setRegion} />
      <Chips options={techs} value={tech} onChange={setTech} />
      <View style={s.bar}>
        <Text style={{ color: '#6b6355' }}>{data.length} patterns</Text>
        <TouchableOpacity onPress={() => setAsc(!asc)}><Text style={{ color: C.clay, fontWeight: '700' }}>Sort: {asc ? 'A to Z' : 'Z to A'}</Text></TouchableOpacity>
      </View>
      <FlatList data={data} keyExtractor={i => String(i.id)}
        renderItem={({ item }) => <PatternCard item={item} onPress={() => navigation.navigate('Detail', { id: item.id })} />}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 30 }}>Nothing found. Clear a filter or change the search.</Text>} />
    </View>
  );
}
const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.wax, padding: 16 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: C.line },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: C.line, backgroundColor: '#fff', marginRight: 8 },
  chipOn: { backgroundColor: C.indigo, borderColor: C.indigo },
  bar: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
});
