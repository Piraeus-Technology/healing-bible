import { useThemeStore } from '../store/themeStore';

const lightColors = {
  primary: '#2C5F2D',
  primaryLight: '#4A7C4B',
  primaryDark: '#1A3D1B',

  accent: '#D4A84B',
  accentLight: '#FDF5E6',

  bg: '#FAFAF7',
  card: '#FFFFFF',
  searchBg: '#F2F0EB',

  textPrimary: '#1A1A1A',
  textSecondary: '#6B6B6B',
  textMuted: '#9E9E9E',

  border: '#E0DDD5',
  divider: '#F0EEEB',

  pillBg: '#F0EEEB',
  pillActiveBg: '#2C5F2D',
  pillText: '#4A4A4A',
  pillActiveText: '#FFFFFF',

  verseHighlight: '#FFF8E1',
  bookmarkColor: '#D4A84B',
  highlightYellow: '#FFF176',
  highlightGreen: '#C8E6C9',
  highlightBlue: '#BBDEFB',
  highlightPink: '#F8BBD0',
};

const darkColors = {
  primary: '#6ABF6D',
  primaryLight: '#81C784',
  primaryDark: '#A5D6A7',

  accent: '#D4A84B',
  accentLight: '#3D2E0A',

  bg: '#121210',
  card: '#1E1E1C',
  searchBg: '#2A2A28',

  textPrimary: '#F0F0F0',
  textSecondary: '#A0A0A0',
  textMuted: '#666666',

  border: '#333330',
  divider: '#2A2A28',

  pillBg: '#2A2A28',
  pillActiveBg: '#6ABF6D',
  pillText: '#A0A0A0',
  pillActiveText: '#FFFFFF',

  verseHighlight: '#3D3200',
  bookmarkColor: '#D4A84B',
  highlightYellow: '#5D4E00',
  highlightGreen: '#1B3A1B',
  highlightBlue: '#0D2137',
  highlightPink: '#2D0E1E',
};

export type ThemeColors = typeof lightColors;

export const themes = { light: lightColors, dark: darkColors };

export function useColors(): ThemeColors {
  const isDark = useThemeStore((s) => s.isDark);
  return isDark ? darkColors : lightColors;
}

export const fonts = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    hero: 34,
    verse: 20,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};
