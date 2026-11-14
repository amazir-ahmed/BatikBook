import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { FavProvider } from './utils/FavContext';
import { C } from './utils/theme';
import HomeScreen from './screens/HomeScreen';
import PatternListScreen from './screens/PatternListScreen';
import PatternDetailScreen from './screens/PatternDetailScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import TechniquesScreen from './screens/TechniquesScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const icons = { Home: 'home', Patterns: 'grid', Favourites: 'heart', Techniques: 'color-palette', About: 'information-circle' };

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
        tabBarActiveTintColor: C.indigo,
        headerStyle: { backgroundColor: C.indigo },
        headerTintColor: '#fff',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Patterns" component={PatternListScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Techniques" component={TechniquesScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FavProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Detail" component={PatternDetailScreen}
            options={{ title: 'Pattern details', headerStyle: { backgroundColor: C.indigo }, headerTintColor: '#fff' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavProvider>
  );
}
