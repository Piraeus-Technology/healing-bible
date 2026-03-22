import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BibleTranslation = 'krv' | 'kjv';

export const translationLabels: Record<BibleTranslation, string> = {
  krv: '개역한글',
  kjv: 'KJV (English)',
};

interface ReadingPosition {
  bookId: string;
  chapter: number;
}

interface SettingsStore {
  fontSize: number;
  lastRead: ReadingPosition | null;
  translation: BibleTranslation;
  loaded: boolean;
  loadSettings: () => Promise<void>;
  setFontSize: (size: number) => Promise<void>;
  setLastRead: (bookId: string, chapter: number) => Promise<void>;
  setTranslation: (translation: BibleTranslation) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  fontSize: 20,
  lastRead: null,
  translation: 'krv',
  loaded: false,

  loadSettings: async () => {
    try {
      const stored = await AsyncStorage.getItem('settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        set({
          fontSize: parsed.fontSize || 20,
          lastRead: parsed.lastRead || null,
          translation: parsed.translation || 'krv',
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

  setTranslation: async (translation: BibleTranslation) => {
    set({ translation });
    const stored = await AsyncStorage.getItem('settings');
    const settings = stored ? JSON.parse(stored) : {};
    settings.translation = translation;
    await AsyncStorage.setItem('settings', JSON.stringify(settings));
  },
}));
