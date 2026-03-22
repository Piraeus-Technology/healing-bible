import { books } from '../data/books';
import { getChapter } from '../data/bible';
import type { BibleTranslation } from '../store/settingsStore';

export interface SearchResult {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

// Separate indexes per translation
const indexes: Record<string, SearchResult[]> = {};

function buildIndex(translation: BibleTranslation): SearchResult[] {
  if (indexes[translation]) return indexes[translation];
  indexes[translation] = [];
  books.forEach((book) => {
    for (let ch = 1; ch <= book.chapters; ch++) {
      const verses = getChapter(book.id, ch, translation);
      if (!verses) continue;
      verses.forEach((text, i) => {
        indexes[translation].push({
          bookId: book.id,
          bookName: book.name,
          chapter: ch,
          verse: i + 1,
          text,
        });
      });
    }
  });
  return indexes[translation];
}

export function searchBible(query: string, translation: BibleTranslation = 'krv', maxResults: number = 50): SearchResult[] {
  if (!query.trim()) return [];
  const index = buildIndex(translation);
  const q = query.trim().toLowerCase();
  const results: SearchResult[] = [];

  for (const entry of index) {
    if (entry.text.toLowerCase().includes(q)) {
      results.push(entry);
      if (results.length >= maxResults) break;
    }
  }

  return results;
}
