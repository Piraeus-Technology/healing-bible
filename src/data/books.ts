export interface BibleBook {
  id: string;
  name: string;
  nameEn: string;
  testament: 'old' | 'new';
  chapters: number;
}

export const books: BibleBook[] = [
  // 구약 (Old Testament)
  { id: 'gen', name: '창세기', nameEn: 'Genesis', testament: 'old', chapters: 50 },
  { id: 'exo', name: '출애굽기', nameEn: 'Exodus', testament: 'old', chapters: 40 },
  { id: 'lev', name: '레위기', nameEn: 'Leviticus', testament: 'old', chapters: 27 },
  { id: 'num', name: '민수기', nameEn: 'Numbers', testament: 'old', chapters: 36 },
  { id: 'deu', name: '신명기', nameEn: 'Deuteronomy', testament: 'old', chapters: 34 },
  { id: 'jos', name: '여호수아', nameEn: 'Joshua', testament: 'old', chapters: 24 },
  { id: 'jdg', name: '사사기', nameEn: 'Judges', testament: 'old', chapters: 21 },
  { id: 'rut', name: '룻기', nameEn: 'Ruth', testament: 'old', chapters: 4 },
  { id: '1sa', name: '사무엘상', nameEn: '1 Samuel', testament: 'old', chapters: 31 },
  { id: '2sa', name: '사무엘하', nameEn: '2 Samuel', testament: 'old', chapters: 24 },
  { id: '1ki', name: '열왕기상', nameEn: '1 Kings', testament: 'old', chapters: 22 },
  { id: '2ki', name: '열왕기하', nameEn: '2 Kings', testament: 'old', chapters: 25 },
  { id: '1ch', name: '역대상', nameEn: '1 Chronicles', testament: 'old', chapters: 29 },
  { id: '2ch', name: '역대하', nameEn: '2 Chronicles', testament: 'old', chapters: 36 },
  { id: 'ezr', name: '에스라', nameEn: 'Ezra', testament: 'old', chapters: 10 },
  { id: 'neh', name: '느헤미야', nameEn: 'Nehemiah', testament: 'old', chapters: 13 },
  { id: 'est', name: '에스더', nameEn: 'Esther', testament: 'old', chapters: 10 },
  { id: 'job', name: '욥기', nameEn: 'Job', testament: 'old', chapters: 42 },
  { id: 'psa', name: '시편', nameEn: 'Psalms', testament: 'old', chapters: 150 },
  { id: 'pro', name: '잠언', nameEn: 'Proverbs', testament: 'old', chapters: 31 },
  { id: 'ecc', name: '전도서', nameEn: 'Ecclesiastes', testament: 'old', chapters: 12 },
  { id: 'sng', name: '아가', nameEn: 'Song of Solomon', testament: 'old', chapters: 8 },
  { id: 'isa', name: '이사야', nameEn: 'Isaiah', testament: 'old', chapters: 66 },
  { id: 'jer', name: '예레미야', nameEn: 'Jeremiah', testament: 'old', chapters: 52 },
  { id: 'lam', name: '예레미야애가', nameEn: 'Lamentations', testament: 'old', chapters: 5 },
  { id: 'ezk', name: '에스겔', nameEn: 'Ezekiel', testament: 'old', chapters: 48 },
  { id: 'dan', name: '다니엘', nameEn: 'Daniel', testament: 'old', chapters: 12 },
  { id: 'hos', name: '호세아', nameEn: 'Hosea', testament: 'old', chapters: 14 },
  { id: 'jol', name: '요엘', nameEn: 'Joel', testament: 'old', chapters: 3 },
  { id: 'amo', name: '아모스', nameEn: 'Amos', testament: 'old', chapters: 9 },
  { id: 'oba', name: '오바댜', nameEn: 'Obadiah', testament: 'old', chapters: 1 },
  { id: 'jon', name: '요나', nameEn: 'Jonah', testament: 'old', chapters: 4 },
  { id: 'mic', name: '미가', nameEn: 'Micah', testament: 'old', chapters: 7 },
  { id: 'nam', name: '나훔', nameEn: 'Nahum', testament: 'old', chapters: 3 },
  { id: 'hab', name: '하박국', nameEn: 'Habakkuk', testament: 'old', chapters: 3 },
  { id: 'zep', name: '스바냐', nameEn: 'Zephaniah', testament: 'old', chapters: 3 },
  { id: 'hag', name: '학개', nameEn: 'Haggai', testament: 'old', chapters: 2 },
  { id: 'zec', name: '스가랴', nameEn: 'Zechariah', testament: 'old', chapters: 14 },
  { id: 'mal', name: '말라기', nameEn: 'Malachi', testament: 'old', chapters: 4 },

  // 신약 (New Testament)
  { id: 'mat', name: '마태복음', nameEn: 'Matthew', testament: 'new', chapters: 28 },
  { id: 'mrk', name: '마가복음', nameEn: 'Mark', testament: 'new', chapters: 16 },
  { id: 'luk', name: '누가복음', nameEn: 'Luke', testament: 'new', chapters: 24 },
  { id: 'jhn', name: '요한복음', nameEn: 'John', testament: 'new', chapters: 21 },
  { id: 'act', name: '사도행전', nameEn: 'Acts', testament: 'new', chapters: 28 },
  { id: 'rom', name: '로마서', nameEn: 'Romans', testament: 'new', chapters: 16 },
  { id: '1co', name: '고린도전서', nameEn: '1 Corinthians', testament: 'new', chapters: 16 },
  { id: '2co', name: '고린도후서', nameEn: '2 Corinthians', testament: 'new', chapters: 13 },
  { id: 'gal', name: '갈라디아서', nameEn: 'Galatians', testament: 'new', chapters: 6 },
  { id: 'eph', name: '에베소서', nameEn: 'Ephesians', testament: 'new', chapters: 6 },
  { id: 'php', name: '빌립보서', nameEn: 'Philippians', testament: 'new', chapters: 4 },
  { id: 'col', name: '골로새서', nameEn: 'Colossians', testament: 'new', chapters: 4 },
  { id: '1th', name: '데살로니가전서', nameEn: '1 Thessalonians', testament: 'new', chapters: 5 },
  { id: '2th', name: '데살로니가후서', nameEn: '2 Thessalonians', testament: 'new', chapters: 3 },
  { id: '1ti', name: '디모데전서', nameEn: '1 Timothy', testament: 'new', chapters: 6 },
  { id: '2ti', name: '디모데후서', nameEn: '2 Timothy', testament: 'new', chapters: 4 },
  { id: 'tit', name: '디도서', nameEn: 'Titus', testament: 'new', chapters: 3 },
  { id: 'phm', name: '빌레몬서', nameEn: 'Philemon', testament: 'new', chapters: 1 },
  { id: 'heb', name: '히브리서', nameEn: 'Hebrews', testament: 'new', chapters: 13 },
  { id: 'jas', name: '야고보서', nameEn: 'James', testament: 'new', chapters: 5 },
  { id: '1pe', name: '베드로전서', nameEn: '1 Peter', testament: 'new', chapters: 5 },
  { id: '2pe', name: '베드로후서', nameEn: '2 Peter', testament: 'new', chapters: 3 },
  { id: '1jn', name: '요한1서', nameEn: '1 John', testament: 'new', chapters: 5 },
  { id: '2jn', name: '요한2서', nameEn: '2 John', testament: 'new', chapters: 1 },
  { id: '3jn', name: '요한3서', nameEn: '3 John', testament: 'new', chapters: 1 },
  { id: 'jud', name: '유다서', nameEn: 'Jude', testament: 'new', chapters: 1 },
  { id: 'rev', name: '요한계시록', nameEn: 'Revelation', testament: 'new', chapters: 22 },
];

export const oldTestament = books.filter((b) => b.testament === 'old');
export const newTestament = books.filter((b) => b.testament === 'new');
export const bookById = Object.fromEntries(books.map((b) => [b.id, b]));
