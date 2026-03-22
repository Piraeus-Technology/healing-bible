import type { BibleTranslation } from '../store/settingsStore';

export type ChapterData = Record<string, string[]>;

const bookIds = [
  'gen','exo','lev','num','deu','jos','jdg','rut','1sa','2sa',
  '1ki','2ki','1ch','2ch','ezr','neh','est','job','psa','pro',
  'ecc','sng','isa','jer','lam','ezk','dan','hos','jol','amo',
  'oba','jon','mic','nam','hab','zep','hag','zec','mal',
  'mat','mrk','luk','jhn','act','rom','1co','2co','gal','eph',
  'php','col','1th','2th','1ti','2ti','tit','phm','heb','jas',
  '1pe','2pe','1jn','2jn','3jn','jud','rev',
];

// Build require maps (must be static for Metro bundler)
const krvFiles: Record<string, ChapterData> = {};
const kjvFiles: Record<string, ChapterData> = {};

function loadKrv(id: string): ChapterData {
  if (!krvFiles[id]) {
    const files: Record<string, any> = {
      gen: require('./bible/gen.json'), exo: require('./bible/exo.json'),
      lev: require('./bible/lev.json'), num: require('./bible/num.json'),
      deu: require('./bible/deu.json'), jos: require('./bible/jos.json'),
      jdg: require('./bible/jdg.json'), rut: require('./bible/rut.json'),
      '1sa': require('./bible/1sa.json'), '2sa': require('./bible/2sa.json'),
      '1ki': require('./bible/1ki.json'), '2ki': require('./bible/2ki.json'),
      '1ch': require('./bible/1ch.json'), '2ch': require('./bible/2ch.json'),
      ezr: require('./bible/ezr.json'), neh: require('./bible/neh.json'),
      est: require('./bible/est.json'), job: require('./bible/job.json'),
      psa: require('./bible/psa.json'), pro: require('./bible/pro.json'),
      ecc: require('./bible/ecc.json'), sng: require('./bible/sng.json'),
      isa: require('./bible/isa.json'), jer: require('./bible/jer.json'),
      lam: require('./bible/lam.json'), ezk: require('./bible/ezk.json'),
      dan: require('./bible/dan.json'), hos: require('./bible/hos.json'),
      jol: require('./bible/jol.json'), amo: require('./bible/amo.json'),
      oba: require('./bible/oba.json'), jon: require('./bible/jon.json'),
      mic: require('./bible/mic.json'), nam: require('./bible/nam.json'),
      hab: require('./bible/hab.json'), zep: require('./bible/zep.json'),
      hag: require('./bible/hag.json'), zec: require('./bible/zec.json'),
      mal: require('./bible/mal.json'), mat: require('./bible/mat.json'),
      mrk: require('./bible/mrk.json'), luk: require('./bible/luk.json'),
      jhn: require('./bible/jhn.json'), act: require('./bible/act.json'),
      rom: require('./bible/rom.json'), '1co': require('./bible/1co.json'),
      '2co': require('./bible/2co.json'), gal: require('./bible/gal.json'),
      eph: require('./bible/eph.json'), php: require('./bible/php.json'),
      col: require('./bible/col.json'), '1th': require('./bible/1th.json'),
      '2th': require('./bible/2th.json'), '1ti': require('./bible/1ti.json'),
      '2ti': require('./bible/2ti.json'), tit: require('./bible/tit.json'),
      phm: require('./bible/phm.json'), heb: require('./bible/heb.json'),
      jas: require('./bible/jas.json'), '1pe': require('./bible/1pe.json'),
      '2pe': require('./bible/2pe.json'), '1jn': require('./bible/1jn.json'),
      '2jn': require('./bible/2jn.json'), '3jn': require('./bible/3jn.json'),
      jud: require('./bible/jud.json'), rev: require('./bible/rev.json'),
    };
    krvFiles[id] = files[id];
  }
  return krvFiles[id];
}

function loadKjv(id: string): ChapterData {
  if (!kjvFiles[id]) {
    const files: Record<string, any> = {
      gen: require('./bible-kjv/gen.json'), exo: require('./bible-kjv/exo.json'),
      lev: require('./bible-kjv/lev.json'), num: require('./bible-kjv/num.json'),
      deu: require('./bible-kjv/deu.json'), jos: require('./bible-kjv/jos.json'),
      jdg: require('./bible-kjv/jdg.json'), rut: require('./bible-kjv/rut.json'),
      '1sa': require('./bible-kjv/1sa.json'), '2sa': require('./bible-kjv/2sa.json'),
      '1ki': require('./bible-kjv/1ki.json'), '2ki': require('./bible-kjv/2ki.json'),
      '1ch': require('./bible-kjv/1ch.json'), '2ch': require('./bible-kjv/2ch.json'),
      ezr: require('./bible-kjv/ezr.json'), neh: require('./bible-kjv/neh.json'),
      est: require('./bible-kjv/est.json'), job: require('./bible-kjv/job.json'),
      psa: require('./bible-kjv/psa.json'), pro: require('./bible-kjv/pro.json'),
      ecc: require('./bible-kjv/ecc.json'), sng: require('./bible-kjv/sng.json'),
      isa: require('./bible-kjv/isa.json'), jer: require('./bible-kjv/jer.json'),
      lam: require('./bible-kjv/lam.json'), ezk: require('./bible-kjv/ezk.json'),
      dan: require('./bible-kjv/dan.json'), hos: require('./bible-kjv/hos.json'),
      jol: require('./bible-kjv/jol.json'), amo: require('./bible-kjv/amo.json'),
      oba: require('./bible-kjv/oba.json'), jon: require('./bible-kjv/jon.json'),
      mic: require('./bible-kjv/mic.json'), nam: require('./bible-kjv/nam.json'),
      hab: require('./bible-kjv/hab.json'), zep: require('./bible-kjv/zep.json'),
      hag: require('./bible-kjv/hag.json'), zec: require('./bible-kjv/zec.json'),
      mal: require('./bible-kjv/mal.json'), mat: require('./bible-kjv/mat.json'),
      mrk: require('./bible-kjv/mrk.json'), luk: require('./bible-kjv/luk.json'),
      jhn: require('./bible-kjv/jhn.json'), act: require('./bible-kjv/act.json'),
      rom: require('./bible-kjv/rom.json'), '1co': require('./bible-kjv/1co.json'),
      '2co': require('./bible-kjv/2co.json'), gal: require('./bible-kjv/gal.json'),
      eph: require('./bible-kjv/eph.json'), php: require('./bible-kjv/php.json'),
      col: require('./bible-kjv/col.json'), '1th': require('./bible-kjv/1th.json'),
      '2th': require('./bible-kjv/2th.json'), '1ti': require('./bible-kjv/1ti.json'),
      '2ti': require('./bible-kjv/2ti.json'), tit: require('./bible-kjv/tit.json'),
      phm: require('./bible-kjv/phm.json'), heb: require('./bible-kjv/heb.json'),
      jas: require('./bible-kjv/jas.json'), '1pe': require('./bible-kjv/1pe.json'),
      '2pe': require('./bible-kjv/2pe.json'), '1jn': require('./bible-kjv/1jn.json'),
      '2jn': require('./bible-kjv/2jn.json'), '3jn': require('./bible-kjv/3jn.json'),
      jud: require('./bible-kjv/jud.json'), rev: require('./bible-kjv/rev.json'),
    };
    kjvFiles[id] = files[id];
  }
  return kjvFiles[id];
}

export function getChapter(bookId: string, chapter: number, translation: BibleTranslation = 'krv'): string[] | null {
  const data = translation === 'kjv' ? loadKjv(bookId) : loadKrv(bookId);
  if (!data) return null;
  return data[String(chapter)] || null;
}

export function getVerse(bookId: string, chapter: number, verse: number, translation: BibleTranslation = 'krv'): string | null {
  const ch = getChapter(bookId, chapter, translation);
  if (!ch || verse < 1 || verse > ch.length) return null;
  return ch[verse - 1];
}
