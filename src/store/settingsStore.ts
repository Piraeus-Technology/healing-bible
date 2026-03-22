import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsStore {
  fontSize: number;
  loaded: boolean;
  loadSettings: () => Promise<void>;
  setFontSize: (size: number) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  fontSize: 20,
  loaded: false,

  loadSettings: async () => {
    try {
      const stored = await AsyncStorage.getItem('settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        set({ fontSize: parsed.fontSize || 20, loaded: true });
      } else {
        set({ loaded: true });
      }
    } catch {
      set({ loaded: true });
    }
  },

  setFontSize: async (size: number) => {
    set({ fontSize: size });
    const stored = await AsyncStorage.getItem('settings');
    const settings = stored ? JSON.parse(stored) : {};
    settings.fontSize = size;
    await AsyncStorage.setItem('settings', JSON.stringify(settings));
  },
}));
