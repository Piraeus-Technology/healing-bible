import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors, fonts, spacing, radius } from '../utils/theme';
import { getVerseOfTheDay } from '../data/dailyVerses';
import { getVerse } from '../data/bible';
import { bookById } from '../data/books';
import { useSettingsStore } from '../store/settingsStore';

export default function HealingScreen() {
  const colors = useColors();
  const navigation = useNavigation<any>();
  const { translation } = useSettingsStore();

  const votd = getVerseOfTheDay();
  const book = bookById[votd.bookId];
  const verseText = getVerse(votd.bookId, votd.chapter, votd.verse, translation) || '';
  const bookName = translation === 'kjv' ? book?.nameEn : book?.name;
  const reference = `${bookName} ${votd.chapter}:${votd.verse}`;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
    >
      {/* Verse of the Day */}
      <View style={[styles.votdCard, { backgroundColor: colors.card }]}>
        <View style={styles.votdHeader}>
          <Ionicons name="sunny-outline" size={20} color={colors.accent} />
          <Text style={[styles.votdLabel, { color: colors.accent }]}>오늘의 말씀</Text>
        </View>
        <Text style={[styles.votdText, { color: colors.textPrimary }]}>
          "{verseText}"
        </Text>
        <Text style={[styles.votdReference, { color: colors.primary }]}>
          — {reference}
        </Text>
        <View style={styles.votdActions}>
          <TouchableOpacity
            style={[styles.votdButton, { backgroundColor: colors.pillBg }]}
            onPress={() => navigation.navigate('성경', {
              screen: 'Chapter',
              params: { bookId: votd.bookId, chapter: votd.chapter },
            })}
          >
            <Ionicons name="book-outline" size={16} color={colors.primary} />
            <Text style={[styles.votdButtonText, { color: colors.primary }]}>본문 읽기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.votdButton, { backgroundColor: colors.pillBg }]}
            onPress={() => Share.share({
              message: `"${verseText}"\n— ${reference} (힐링성경)`,
            })}
          >
            <Ionicons name="share-outline" size={16} color={colors.primary} />
            <Text style={[styles.votdButtonText, { color: colors.primary }]}>공유</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* AI feature placeholder */}
      <View style={[styles.aiCard, { backgroundColor: colors.card }]}>
        <View style={styles.aiIconContainer}>
          <Ionicons name="heart" size={32} color={colors.primary} />
        </View>
        <Text style={[styles.aiTitle, { color: colors.textPrimary }]}>
          힐링 말씀 찾기
        </Text>
        <Text style={[styles.aiDescription, { color: colors.textSecondary }]}>
          고민이나 걱정을 나누면{'\n'}관련된 성경 말씀을 찾아드립니다
        </Text>
        <View style={[styles.comingSoon, { backgroundColor: colors.pillBg }]}>
          <Text style={[styles.comingSoonText, { color: colors.textMuted }]}>
            곧 출시 예정
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md },
  votdCard: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  votdHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  votdLabel: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  votdText: {
    fontSize: fonts.sizes.xl,
    lineHeight: 34,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  votdReference: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.semibold,
    marginBottom: spacing.lg,
  },
  votdActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  votdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    gap: spacing.xs,
  },
  votdButtonText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
  },
  aiCard: {
    marginTop: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  aiIconContainer: {
    marginBottom: spacing.md,
  },
  aiTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    marginBottom: spacing.sm,
  },
  aiDescription: {
    fontSize: fonts.sizes.md,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  comingSoon: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  comingSoonText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
  },
});
