import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { useColors, fonts, spacing, radius } from '../utils/theme';
import { useBookmarkStore } from '../store/bookmarkStore';
import { bookById } from '../data/books';
import { getVerse } from '../data/bible';
import { useSettingsStore } from '../store/settingsStore';

export default function BookmarkScreen() {
  const colors = useColors();
  const navigation = useNavigation<any>();
  const { bookmarks, loadBookmarks, removeBookmark } = useBookmarkStore();
  const { translation } = useSettingsStore();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const renderDeleteAction = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.deleteAction}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
        </Animated.View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: typeof bookmarks[0] }) => {
    const book = bookById[item.book];
    const bookName = translation === 'kjv' ? (book?.nameEn || item.book) : (book?.name || item.book);
    const displayText = getVerse(item.book, item.chapter, item.verse, translation) || item.text;

    return (
      <Swipeable
        renderRightActions={renderDeleteAction}
        onSwipeableOpen={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          removeBookmark(item.book, item.chapter, item.verse);
        }}
        overshootRight={false}
      >
        <TouchableOpacity
          style={[styles.bookmarkItem, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('성경', { screen: 'Chapter', params: { bookId: item.book, chapter: item.chapter } })}
          activeOpacity={0.7}
        >
          <View style={styles.bookmarkHeader}>
            <Ionicons name="bookmark" size={16} color={colors.bookmarkColor} />
            <Text style={[styles.reference, { color: colors.primary }]}>
              {bookName} {item.chapter}:{item.verse}
            </Text>
          </View>
          <Text style={[styles.verseText, { color: colors.textPrimary }]} numberOfLines={2}>
            {displayText}
          </Text>
          <Text style={[styles.dateText, { color: colors.textMuted }]}>
            {new Date(item.createdAt).toLocaleDateString('ko-KR')}
          </Text>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => `${item.book}-${item.chapter}-${item.verse}`}
        renderItem={renderItem}
        contentContainerStyle={bookmarks.length === 0 ? styles.emptyList : styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
              책갈피가 없습니다
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
              성경 구절을 길게 눌러 책갈피를 추가하세요
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: spacing.md },
  emptyList: { flex: 1 },
  bookmarkItem: {
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bookmarkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  reference: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
  },
  verseText: {
    fontSize: fonts.sizes.md,
    lineHeight: 24,
    marginBottom: spacing.xs,
  },
  dateText: {
    fontSize: fonts.sizes.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    fontSize: fonts.sizes.md,
    marginTop: spacing.sm,
    textAlign: 'center',
    lineHeight: 22,
  },
  deleteAction: {
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
});
