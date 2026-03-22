import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeStore {
  isDark: boolean;
  loaded: boolean;
  loadTheme: () => Promise<void>;
  toggleTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  isDark: false,
  loaded: false,

  loadTheme: async () => {
    try {
      const stored = await AsyncStorage.getItem('theme');
      if (stored) {
        set({ isDark: stored === 'dark', loaded: true });
      } else {
        set({ loaded: true });
      }
    } catch {
      set({ loaded: true });
    }
  },

  toggleTheme: async () => {
    const newValue = !get().isDark;
    set({ isDark: newValue });
    await AsyncStorage.setItem('theme', newValue ? 'dark' : 'light');
  },
}));
