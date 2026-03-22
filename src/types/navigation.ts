import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainTabs: undefined;
  ChapterSelect: {
    bookId: string;
  };
  Chapter: {
    bookId: string;
    chapter: number;
  };
  Search: undefined;
  HealingAI: undefined;
};

export type TabParamList = {
  성경: undefined;
  검색: undefined;
  힐링: undefined;
  책갈피: undefined;
  더보기: undefined;
};

export type ChapterScreenProps = NativeStackScreenProps<RootStackParamList, 'Chapter'>;
