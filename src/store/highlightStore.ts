import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink';

interface Highlight {
  book: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
}

interface HighlightStore {
  highlights: Highlight[];
  loaded: boolean;
  loadHighlights: () => Promise<void>;
  setHighlight: (book: string, chapter: number, verse: number, color: HighlightColor) => Promise<void>;
  removeHighlight: (book: string, chapter: number, verse: number) => Promise<void>;
  getHighlight: (book: string, chapter: number, verse: number) => HighlightColor | null;
}

export const useHighlightStore = create<HighlightStore>((set, get) => ({
  highlights: [],
  loaded: false,

  loadHighlights: async () => {
    try {
      const stored = await AsyncStorage.getItem('highlights');
      if (stored) {
        set({ highlights: JSON.parse(stored), loaded: true });
      } else {
        set({ loaded: true });
      }
    } catch {
      set({ loaded: true });
    }
  },

  setHighlight: async (book, chapter, verse, color) => {
    const filtered = get().highlights.filter(
      (h) => !(h.book === book && h.chapter === chapter && h.verse === verse)
    );
    const updated = [...filtered, { book, chapter, verse, color }];
    set({ highlights: updated });
    await AsyncStorage.setItem('highlights', JSON.stringify(updated));
  },

  removeHighlight: async (book, chapter, verse) => {
    const updated = get().highlights.filter(
      (h) => !(h.book === book && h.chapter === chapter && h.verse === verse)
    );
    set({ highlights: updated });
    await AsyncStorage.setItem('highlights', JSON.stringify(updated));
  },

  getHighlight: (book, chapter, verse) => {
    const found = get().highlights.find(
      (h) => h.book === book && h.chapter === chapter && h.verse === verse
    );
    return found?.color || null;
  },
}));
