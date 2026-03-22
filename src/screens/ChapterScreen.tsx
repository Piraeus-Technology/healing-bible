import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors, fonts, spacing, radius } from '../utils/theme';
import { bookById } from '../data/books';
import { getChapter } from '../data/bible';
import { useBookmarkStore } from '../store/bookmarkStore';
import { useHighlightStore, HighlightColor } from '../store/highlightStore';

export default function ChapterScreen() {
  const colors = useColors();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { bookId, chapter } = route.params;
  const book = bookById[bookId];
  const verses = getChapter(bookId, chapter);

  const { isBookmarked, addBookmark, removeBookmark, loadBookmarks } = useBookmarkStore();
  const { getHighlight, loadHighlights } = useHighlightStore();

  React.useEffect(() => {
    loadBookmarks();
    loadHighlights();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${book?.name} ${chapter}장`,
    });
  }, [navigation, book, chapter]);

  const highlightColorMap: Record<HighlightColor, string> = {
    yellow: colors.highlightYellow,
    green: colors.highlightGreen,
    blue: colors.highlightBlue,
    pink: colors.highlightPink,
  };

  const goToChapter = (ch: number) => {
    navigation.replace('Chapter', { bookId, chapter: ch });
  };

  if (!book) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={{ color: colors.textPrimary }}>책을 찾을 수 없습니다</Text>
      </View>
    );
  }

  if (!verses || verses.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.bg }]}>
        <Ionicons name="book-outline" size={48} color={colors.textMuted} />
        <Text style={[styles.emptyText, { color: colors.textMuted }]}>
          본문 준비 중입니다
        </Text>
        {/* Chapter navigation */}
        <View style={styles.navRow}>
          {chapter > 1 && (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: colors.card }]}
              onPress={() => goToChapter(chapter - 1)}
            >
              <Ionicons name="chevron-back" size={18} color={colors.primary} />
              <Text style={[styles.navText, { color: colors.primary }]}>이전 장</Text>
            </TouchableOpacity>
          )}
          {chapter < book.chapters && (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: colors.card }]}
              onPress={() => goToChapter(chapter + 1)}
            >
              <Text style={[styles.navText, { color: colors.primary }]}>다음 장</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Chapter header */}
      <View style={styles.chapterHeader}>
        <Text style={[styles.chapterTitle, { color: colors.primary }]}>
          {book.name} {chapter}장
        </Text>
      </View>

      {/* Verses */}
      <View style={styles.versesContainer}>
        {verses.map((text, i) => {
          const verseNum = i + 1;
          const highlight = getHighlight(bookId, chapter, verseNum);
          const bookmarked = isBookmarked(bookId, chapter, verseNum);

          return (
            <TouchableOpacity
              key={verseNum}
              style={[
                styles.verseRow,
                highlight && { backgroundColor: highlightColorMap[highlight] },
              ]}
              onLongPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                if (bookmarked) {
                  removeBookmark(bookId, chapter, verseNum);
                } else {
                  addBookmark({ book: bookId, chapter, verse: verseNum, text });
                }
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.verseNumber, { color: colors.primary }]}>
                {verseNum}
              </Text>
              <Text style={[styles.verseText, { color: colors.textPrimary }]}>
                {text}
              </Text>
              {bookmarked && (
                <Ionicons
                  name="bookmark"
                  size={14}
                  color={colors.bookmarkColor}
                  style={styles.bookmarkIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Chapter navigation */}
      <View style={styles.navRow}>
        {chapter > 1 && (
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: colors.card }]}
            onPress={() => goToChapter(chapter - 1)}
          >
            <Ionicons name="chevron-back" size={18} color={colors.primary} />
            <Text style={[styles.navText, { color: colors.primary }]}>이전 장</Text>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }} />
        {chapter < book.chapters && (
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: colors.card }]}
            onPress={() => goToChapter(chapter + 1)}
          >
            <Text style={[styles.navText, { color: colors.primary }]}>다음 장</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyText: {
    fontSize: fonts.sizes.md,
    marginTop: spacing.md,
  },
  chapterHeader: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
  },
  versesContainer: {
    paddingHorizontal: spacing.md,
  },
  verseRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    marginBottom: 2,
  },
  verseNumber: {
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.bold,
    width: 28,
    marginTop: 3,
  },
  verseText: {
    fontSize: fonts.sizes.verse,
    lineHeight: 32,
    flex: 1,
  },
  bookmarkIcon: {
    marginLeft: spacing.xs,
    marginTop: 4,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    gap: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  navText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
  },
});
