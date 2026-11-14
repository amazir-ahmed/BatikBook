import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'batikbook_favs';
const Ctx = createContext();
export const useFavs = () => useContext(Ctx);

export function FavProvider({ children }) {
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem(KEY).then(v => v && setFavs(JSON.parse(v))).catch(() => {});
  }, []);
  const toggle = id => {
    const next = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
    setFavs(next);
    AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
  };
  return <Ctx.Provider value={{ favs, toggle, isFav: id => favs.includes(id) }}>{children}</Ctx.Provider>;
}
