// Bible text structure
// Each book is a separate JSON file loaded on demand
// Format: { "1": ["verse1", "verse2", ...], "2": ["verse1", ...] }
// Chapter keys are strings, verse arrays are 0-indexed (verse 1 = index 0)

export type ChapterData = Record<string, string[]>;

// We'll load Bible text dynamically
// For now, define the registry of all book files
const bookFiles: Record<string, () => Promise<ChapterData>> = {
  gen: () => require('./bible/gen.json'),
  exo: () => require('./bible/exo.json'),
  lev: () => require('./bible/lev.json'),
  num: () => require('./bible/num.json'),
  deu: () => require('./bible/deu.json'),
  jos: () => require('./bible/jos.json'),
  jdg: () => require('./bible/jdg.json'),
  rut: () => require('./bible/rut.json'),
  '1sa': () => require('./bible/1sa.json'),
  '2sa': () => require('./bible/2sa.json'),
  '1ki': () => require('./bible/1ki.json'),
  '2ki': () => require('./bible/2ki.json'),
  '1ch': () => require('./bible/1ch.json'),
  '2ch': () => require('./bible/2ch.json'),
  ezr: () => require('./bible/ezr.json'),
  neh: () => require('./bible/neh.json'),
  est: () => require('./bible/est.json'),
  job: () => require('./bible/job.json'),
  psa: () => require('./bible/psa.json'),
  pro: () => require('./bible/pro.json'),
  ecc: () => require('./bible/ecc.json'),
  sng: () => require('./bible/sng.json'),
  isa: () => require('./bible/isa.json'),
  jer: () => require('./bible/jer.json'),
  lam: () => require('./bible/lam.json'),
  ezk: () => require('./bible/ezk.json'),
  dan: () => require('./bible/dan.json'),
  hos: () => require('./bible/hos.json'),
  jol: () => require('./bible/jol.json'),
  amo: () => require('./bible/amo.json'),
  oba: () => require('./bible/oba.json'),
  jon: () => require('./bible/jon.json'),
  mic: () => require('./bible/mic.json'),
  nam: () => require('./bible/nam.json'),
  hab: () => require('./bible/hab.json'),
  zep: () => require('./bible/zep.json'),
  hag: () => require('./bible/hag.json'),
  zec: () => require('./bible/zec.json'),
  mal: () => require('./bible/mal.json'),
  mat: () => require('./bible/mat.json'),
  mrk: () => require('./bible/mrk.json'),
  luk: () => require('./bible/luk.json'),
  jhn: () => require('./bible/jhn.json'),
  act: () => require('./bible/act.json'),
  rom: () => require('./bible/rom.json'),
  '1co': () => require('./bible/1co.json'),
  '2co': () => require('./bible/2co.json'),
  gal: () => require('./bible/gal.json'),
  eph: () => require('./bible/eph.json'),
  php: () => require('./bible/php.json'),
  col: () => require('./bible/col.json'),
  '1th': () => require('./bible/1th.json'),
  '2th': () => require('./bible/2th.json'),
  '1ti': () => require('./bible/1ti.json'),
  '2ti': () => require('./bible/2ti.json'),
  tit: () => require('./bible/tit.json'),
  phm: () => require('./bible/phm.json'),
  heb: () => require('./bible/heb.json'),
  jas: () => require('./bible/jas.json'),
  '1pe': () => require('./bible/1pe.json'),
  '2pe': () => require('./bible/2pe.json'),
  '1jn': () => require('./bible/1jn.json'),
  '2jn': () => require('./bible/2jn.json'),
  '3jn': () => require('./bible/3jn.json'),
  jud: () => require('./bible/jud.json'),
  rev: () => require('./bible/rev.json'),
};

// Cache loaded books
const cache: Record<string, ChapterData> = {};

export function getChapter(bookId: string, chapter: number): string[] | null {
  if (!cache[bookId]) {
    const loader = bookFiles[bookId];
    if (!loader) return null;
    cache[bookId] = loader() as unknown as ChapterData;
  }
  return cache[bookId][String(chapter)] || null;
}

export function getVerse(bookId: string, chapter: number, verse: number): string | null {
  const ch = getChapter(bookId, chapter);
  if (!ch || verse < 1 || verse > ch.length) return null;
  return ch[verse - 1];
}
