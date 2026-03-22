import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  updatedAt: number;
}

interface NoteStore {
  notes: Note[];
  loaded: boolean;
  loadNotes: () => Promise<void>;
  saveNote: (book: string, chapter: number, verse: number, text: string) => Promise<void>;
  deleteNote: (book: string, chapter: number, verse: number) => Promise<void>;
  getNote: (book: string, chapter: number, verse: number) => string | null;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],
  loaded: false,

  loadNotes: async () => {
    try {
      const stored = await AsyncStorage.getItem('notes');
      if (stored) {
        set({ notes: JSON.parse(stored), loaded: true });
      } else {
        set({ loaded: true });
      }
    } catch {
      set({ loaded: true });
    }
  },

  saveNote: async (book, chapter, verse, text) => {
    const filtered = get().notes.filter(
      (n) => !(n.book === book && n.chapter === chapter && n.verse === verse)
    );
    const updated = [...filtered, { book, chapter, verse, text, updatedAt: Date.now() }];
    set({ notes: updated });
    await AsyncStorage.setItem('notes', JSON.stringify(updated));
  },

  deleteNote: async (book, chapter, verse) => {
    const updated = get().notes.filter(
      (n) => !(n.book === book && n.chapter === chapter && n.verse === verse)
    );
    set({ notes: updated });
    await AsyncStorage.setItem('notes', JSON.stringify(updated));
  },

  getNote: (book, chapter, verse) => {
    const found = get().notes.find(
      (n) => n.book === book && n.chapter === chapter && n.verse === verse
    );
    return found?.text || null;
  },
}));
