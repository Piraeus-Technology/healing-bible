import { books } from '../data/books';
import { getChapter } from '../data/bible';

export interface SearchResult {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

// Lazy-built search index
let searchIndex: SearchResult[] | null = null;

function buildIndex(): SearchResult[] {
  if (searchIndex) return searchIndex;
  searchIndex = [];
  books.forEach((book) => {
    for (let ch = 1; ch <= book.chapters; ch++) {
      const verses = getChapter(book.id, ch);
      if (!verses) continue;
      verses.forEach((text, i) => {
        searchIndex!.push({
          bookId: book.id,
          bookName: book.name,
          chapter: ch,
          verse: i + 1,
          text,
        });
      });
    }
  });
  return searchIndex;
}

export function searchBible(query: string, maxResults: number = 50): SearchResult[] {
  if (!query.trim()) return [];
  const index = buildIndex();
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
