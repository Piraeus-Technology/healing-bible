// Curated list of encouraging/healing verses for daily display
export interface DailyVerse {
  bookId: string;
  chapter: number;
  verse: number;
}

export const dailyVerses: DailyVerse[] = [
  { bookId: 'psa', chapter: 23, verse: 1 },    // 여호와는 나의 목자시니
  { bookId: 'jhn', chapter: 3, verse: 16 },     // 하나님이 세상을 이처럼 사랑하사
  { bookId: 'php', chapter: 4, verse: 13 },     // 내게 능력 주시는 자 안에서
  { bookId: 'rom', chapter: 8, verse: 28 },     // 모든 것이 합력하여 선을 이루느니라
  { bookId: 'isa', chapter: 41, verse: 10 },    // 두려워 말라 내가 너와 함께 함이니라
  { bookId: 'jer', chapter: 29, verse: 11 },    // 너희를 향한 나의 생각은 평안이요
  { bookId: 'psa', chapter: 46, verse: 1 },     // 하나님은 우리의 피난처시요 힘이시니
  { bookId: 'mat', chapter: 11, verse: 28 },    // 수고하고 무거운 짐 진 자들아
  { bookId: 'pro', chapter: 3, verse: 5 },      // 너는 마음을 다하여 여호와를 의뢰하고
  { bookId: 'psa', chapter: 27, verse: 1 },     // 여호와는 나의 빛이요 나의 구원이시니
  { bookId: 'jhn', chapter: 14, verse: 27 },    // 평안을 너희에게 끼치노니
  { bookId: 'rom', chapter: 15, verse: 13 },    // 소망의 하나님이 믿음 안에서
  { bookId: 'psa', chapter: 34, verse: 18 },    // 여호와는 마음이 상한 자에게 가까이 하시고
  { bookId: '2co', chapter: 12, verse: 9 },     // 내 은혜가 네게 족하도다
  { bookId: 'psa', chapter: 121, verse: 1 },    // 내가 산을 향하여 눈을 들리라
  { bookId: 'isa', chapter: 40, verse: 31 },    // 여호와를 앙망하는 자는 새 힘을 얻으리니
  { bookId: 'mat', chapter: 6, verse: 34 },     // 내일 일을 위하여 염려하지 말라
  { bookId: 'psa', chapter: 37, verse: 4 },     // 여호와를 기뻐하라
  { bookId: 'heb', chapter: 11, verse: 1 },     // 믿음은 바라는 것들의 실상이요
  { bookId: 'jhn', chapter: 16, verse: 33 },    // 세상에서는 너희가 환난을 당하나
  { bookId: 'psa', chapter: 91, verse: 1 },     // 지존자의 은밀한 곳에 거하는 자는
  { bookId: 'eph', chapter: 2, verse: 8 },      // 너희가 그 은혜를 인하여 믿음으로 말미암아
  { bookId: 'rom', chapter: 5, verse: 8 },      // 우리가 아직 죄인 되었을 때에
  { bookId: 'psa', chapter: 119, verse: 105 },  // 주의 말씀은 내 발에 등이요
  { bookId: 'isa', chapter: 53, verse: 5 },     // 그가 찔림은 우리의 허물을 인함이요
  { bookId: '1pe', chapter: 5, verse: 7 },      // 너희 염려를 다 주께 맡기라
  { bookId: 'gal', chapter: 2, verse: 20 },     // 내가 그리스도와 함께 십자가에 못 박혔나니
  { bookId: 'psa', chapter: 100, verse: 3 },    // 여호와가 우리 하나님이신 줄 너희는 알지어다
  { bookId: 'mat', chapter: 5, verse: 16 },     // 너희 빛을 사람 앞에 비취게 하여
  { bookId: 'jhn', chapter: 1, verse: 1 },      // 태초에 말씀이 계시니라
  { bookId: 'psa', chapter: 139, verse: 14 },   // 내가 주께 감사함은 나를 지으심이 신묘막측하심이라
  { bookId: 'rom', chapter: 12, verse: 2 },     // 너희는 이 세대를 본받지 말고
  { bookId: 'col', chapter: 3, verse: 23 },     // 무슨 일을 하든지 마음을 다하여
  { bookId: 'jas', chapter: 1, verse: 2 },      // 여러 가지 시험을 만나거든
  { bookId: 'psa', chapter: 46, verse: 10 },    // 너희는 가만히 있어 내가 하나님 됨을 알지어다
  { bookId: 'mat', chapter: 7, verse: 7 },      // 구하라 그러면 너희에게 주실 것이요
  { bookId: '1jn', chapter: 4, verse: 19 },     // 우리가 사랑함은 그가 먼저 우리를 사랑하셨음이라
  { bookId: 'pro', chapter: 16, verse: 3 },     // 너의 행사를 여호와께 맡기라
  { bookId: 'psa', chapter: 55, verse: 22 },    // 네 짐을 여호와께 맡기라
  { bookId: 'isa', chapter: 26, verse: 3 },     // 주께서 심지가 견고한 자를 평강에 평강으로 지키시리니
  { bookId: 'mat', chapter: 28, verse: 20 },    // 내가 세상 끝 날까지 너희와 항상 함께 있으리라
  { bookId: 'jhn', chapter: 8, verse: 32 },     // 진리를 알지니 진리가 너희를 자유케 하리라
  { bookId: 'psa', chapter: 103, verse: 1 },    // 내 영혼아 여호와를 송축하라
  { bookId: '2ti', chapter: 1, verse: 7 },      // 하나님이 우리에게 주신 것은 두려워하는 마음이 아니요
  { bookId: 'rom', chapter: 8, verse: 38 },     // 어떤 피조물이라도 우리를 끊을 수 없으리라
  { bookId: 'heb', chapter: 13, verse: 8 },     // 예수 그리스도는 어제나 오늘이나 영원토록 동일하시니라
  { bookId: 'psa', chapter: 23, verse: 4 },     // 내가 사망의 음침한 골짜기로 다닐지라도
  { bookId: 'mat', chapter: 11, verse: 29 },    // 나는 마음이 온유하고 겸손하니
  { bookId: 'jhn', chapter: 10, verse: 10 },    // 내가 온 것은 양으로 생명을 얻게 하고
  { bookId: 'psa', chapter: 18, verse: 2 },     // 여호와는 나의 반석이시요
  { bookId: 'isa', chapter: 43, verse: 2 },     // 네가 물 가운데로 지날 때에 내가 함께 할 것이라
  { bookId: 'php', chapter: 4, verse: 6 },      // 아무 것도 염려하지 말고
  { bookId: 'lam', chapter: 3, verse: 22 },     // 여호와의 인자와 긍휼이 무궁하시도다
  { bookId: 'jhn', chapter: 15, verse: 5 },     // 나는 포도나무요 너희는 가지니
  { bookId: 'psa', chapter: 30, verse: 5 },     // 그 노는 잠깐이요 그 은총은 평생이로다
  { bookId: 'mat', chapter: 6, verse: 33 },     // 너희는 먼저 그의 나라와 그의 의를 구하라
  { bookId: 'rev', chapter: 21, verse: 4 },     // 모든 눈물을 그 눈에서 씻기시매
  { bookId: 'rom', chapter: 8, verse: 31 },     // 만일 하나님이 우리를 위하시면
  { bookId: 'psa', chapter: 62, verse: 1 },     // 나의 영혼이 잠잠히 하나님만 바람이여
  { bookId: 'isa', chapter: 55, verse: 8 },     // 내 생각은 너희 생각과 다르며
  { bookId: 'jhn', chapter: 11, verse: 25 },    // 나는 부활이요 생명이니
  { bookId: 'psa', chapter: 150, verse: 6 },    // 호흡이 있는 자마다 여호와를 찬양할지어다
];

export function getVerseOfTheDay(): DailyVerse {
  const dayIndex = Math.floor(Date.now() / 86400000) % dailyVerses.length;
  return dailyVerses[dayIndex];
}
