import React from 'react';
import { View, Text, FlatList } from 'react-native';
import patterns from '../data/patterns.json';
import PatternCard from '../components/PatternCard';
import { useFavs } from '../utils/FavContext';
import { C } from '../utils/theme';

export default function FavouritesScreen({ navigation }) {
  const { favs } = useFavs();
  const data = patterns.filter(p => favs.includes(p.id));
  return (
    <View style={{ flex: 1, backgroundColor: C.wax, padding: 16 }}>
      <FlatList data={data} keyExtractor={i => String(i.id)}
        renderItem={({ item }) => <PatternCard item={item} onPress={() => navigation.navigate('Detail', { id: item.id })} />}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40, color: '#6b6355' }}>No favourites yet. Tap the heart on any pattern to save it here.</Text>} />
    </View>
  );
}
