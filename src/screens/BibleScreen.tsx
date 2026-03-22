import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useColors, fonts, spacing, radius } from '../utils/theme';
import { oldTestament, newTestament, bookById } from '../data/books';
import { useSettingsStore, translationLabels } from '../store/settingsStore';
import { getVerseOfTheDay } from '../data/dailyVerses';
import { getVerse } from '../data/bible';

export default function BibleScreen() {
  const colors = useColors();
  const navigation = useNavigation<any>();
  const [testament, setTestament] = useState<'old' | 'new'>('old');
  const { lastRead, translation, loadSettings } = useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, []);

  const currentBooks = testament === 'old' ? oldTestament : newTestament;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Custom header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>힐링성경</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>{translationLabels[translation]}</Text>
      </View>

      {/* Verse of the day */}
      {(() => {
        const votd = getVerseOfTheDay();
        const vBook = bookById[votd.bookId];
        const vText = getVerse(votd.bookId, votd.chapter, votd.verse, translation) || '';
        const vName = translation === 'kjv' ? vBook?.nameEn : vBook?.name;
        return (
          <TouchableOpacity
            style={[styles.votdCard, { backgroundColor: colors.card }]}
            onPress={() => navigation.navigate('Chapter', { bookId: votd.bookId, chapter: votd.chapter })}
            activeOpacity={0.7}
          >
            <Text style={[styles.votdLabel, { color: colors.accent }]}>
              {translation === 'kjv' ? 'VERSE OF THE DAY' : '오늘의 말씀'}
            </Text>
            <Text style={[styles.votdText, { color: colors.textPrimary }]} numberOfLines={2}>
              "{vText}"
            </Text>
            <Text style={[styles.votdRef, { color: colors.primary }]}>
              — {vName} {votd.chapter}:{votd.verse}
            </Text>
          </TouchableOpacity>
        );
      })()}

      {/* Continue reading */}
      {lastRead && bookById[lastRead.bookId] && (
        <TouchableOpacity
          style={[styles.continueCard, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('Chapter', { bookId: lastRead.bookId, chapter: lastRead.chapter })}
          activeOpacity={0.7}
        >
          <View style={styles.continueLeft}>
            <Ionicons name="book" size={20} color={colors.primary} />
            <View style={styles.continueInfo}>
              <Text style={[styles.continueLabel, { color: colors.textMuted }]}>이어 읽기</Text>
              <Text style={[styles.continueTitle, { color: colors.textPrimary }]}>
                {translation === 'kjv' ? bookById[lastRead.bookId].nameEn : bookById[lastRead.bookId].name} {lastRead.chapter}{translation === 'kjv' ? '' : '장'}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      )}

      {/* Testament toggle */}
      <View style={[styles.toggleRow, { backgroundColor: colors.pillBg }]}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            testament === 'old' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setTestament('old')}
        >
          <Text
            style={[
              styles.toggleText,
              { color: testament === 'old' ? '#fff' : colors.textMuted },
            ]}
          >
            구약
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            testament === 'new' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setTestament('new')}
        >
          <Text
            style={[
              styles.toggleText,
              { color: testament === 'new' ? '#fff' : colors.textMuted },
            ]}
          >
            신약
          </Text>
        </TouchableOpacity>
      </View>

      {/* Book list */}
      <FlatList
        data={currentBooks}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.bookGrid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.bookCard, { backgroundColor: colors.card }]}
            onPress={() => navigation.navigate('ChapterSelect', { bookId: item.id })}
            activeOpacity={0.7}
          >
            <Text style={[styles.bookName, { color: colors.textPrimary }]}>
              {translation === 'kjv' ? item.nameEn : item.name}
            </Text>
            <Text style={[styles.bookChapters, { color: colors.textMuted }]}>
              {item.chapters}{translation === 'kjv' ? ' ch' : '장'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 56,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  headerTitle: {
    fontSize: fonts.sizes.hero,
    fontWeight: fonts.weights.bold,
  },
  headerSubtitle: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.medium,
    marginTop: 2,
    letterSpacing: 1,
  },
  votdCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  votdLabel: {
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.bold,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  votdText: {
    fontSize: fonts.sizes.md,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: spacing.xs,
  },
  votdRef: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
  },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  continueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  continueInfo: {},
  continueLabel: {
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  continueTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    marginTop: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    margin: spacing.md,
    borderRadius: radius.md,
    padding: 3,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.md - 2,
  },
  toggleText: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.semibold,
  },
  bookGrid: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.lg,
  },
  bookCard: {
    flex: 1,
    margin: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bookName: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
    textAlign: 'center',
  },
  bookChapters: {
    fontSize: fonts.sizes.xs,
    marginTop: 4,
  },
});
