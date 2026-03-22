import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ReadingPosition {
  bookId: string;
  chapter: number;
}

interface SettingsStore {
  fontSize: number;
  lastRead: ReadingPosition | null;
  loaded: boolean;
  loadSettings: () => Promise<void>;
  setFontSize: (size: number) => Promise<void>;
  setLastRead: (bookId: string, chapter: number) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  fontSize: 20,
  lastRead: null,
  loaded: false,

  loadSettings: async () => {
    try {
      const stored = await AsyncStorage.getItem('settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        set({
          fontSize: parsed.fontSize || 20,
          lastRead: parsed.lastRead || null,
          loaded: true,
        });
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

  setLastRead: async (bookId: string, chapter: number) => {
    const lastRead = { bookId, chapter };
    set({ lastRead });
    const stored = await AsyncStorage.getItem('settings');
    const settings = stored ? JSON.parse(stored) : {};
    settings.lastRead = lastRead;
    await AsyncStorage.setItem('settings', JSON.stringify(settings));
  },
}));
