import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Bookmark {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  createdAt: number;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  loaded: boolean;
  loadBookmarks: () => Promise<void>;
  addBookmark: (bookmark: Omit<Bookmark, 'createdAt'>) => Promise<void>;
  removeBookmark: (book: string, chapter: number, verse: number) => Promise<void>;
  isBookmarked: (book: string, chapter: number, verse: number) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],
  loaded: false,

  loadBookmarks: async () => {
    try {
      const stored = await AsyncStorage.getItem('bookmarks');
      if (stored) {
        set({ bookmarks: JSON.parse(stored), loaded: true });
      } else {
        set({ loaded: true });
      }
    } catch {
      set({ loaded: true });
    }
  },

  addBookmark: async (bookmark) => {
    const updated = [{ ...bookmark, createdAt: Date.now() }, ...get().bookmarks];
    set({ bookmarks: updated });
    await AsyncStorage.setItem('bookmarks', JSON.stringify(updated));
  },

  removeBookmark: async (book, chapter, verse) => {
    const updated = get().bookmarks.filter(
      (b) => !(b.book === book && b.chapter === chapter && b.verse === verse)
    );
    set({ bookmarks: updated });
    await AsyncStorage.setItem('bookmarks', JSON.stringify(updated));
  },

  isBookmarked: (book, chapter, verse) => {
    return get().bookmarks.some(
      (b) => b.book === book && b.chapter === chapter && b.verse === verse
    );
  },
}));
