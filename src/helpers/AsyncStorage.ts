import { createMMKV } from 'react-native-mmkv'

export const storage =  createMMKV();

// Sauvegarde
export const storeData = (key: string, value: string) => {
  try {
    storage.set(key, value);
  } catch (e) {
    console.error('Erreur de sauvegarde :', e);
  }
};


// Lecture
export const getData = (key: string): string | null => {
  try {
    const value = storage.getString(key);
    return value ?? null;
  } catch (e) {
    console.error('Erreur de lecture :', e);
    return null;
  }
};


// Suppression
export const removeData = (key: string) => {
  try {
    storage.remove(key);
  } catch (e) {
    console.error('Erreur de suppression :', e);
  }
};