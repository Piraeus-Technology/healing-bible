import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useColors, fonts, spacing, radius } from '../utils/theme';
import { bookById } from '../data/books';
import { useSettingsStore } from '../store/settingsStore';

export default function ChapterSelectScreen() {
  const colors = useColors();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { bookId } = route.params;
  const book = bookById[bookId];
  const { translation } = useSettingsStore();

  React.useLayoutEffect(() => {
    const title = translation === 'kjv' ? book?.nameEn : book?.name;
    navigation.setOptions({ title: title || '' });
  }, [navigation, book, translation]);

  if (!book) return null;

  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);
  // Add invisible spacers to fill the last row
  const remainder = chapters.length % 5;
  const spacers = remainder > 0 ? 5 - remainder : 0;
  const data = [...chapters, ...Array.from({ length: spacers }, (_, i) => -(i + 1))];

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item)}
        numColumns={5}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          if (item < 0) {
            return <View style={styles.chapterButton} />;
          }
          return (
            <TouchableOpacity
              style={[styles.chapterButton, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('Chapter', { bookId, chapter: item })}
              activeOpacity={0.7}
            >
              <Text style={[styles.chapterText, { color: colors.textPrimary }]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  grid: {
    padding: spacing.md,
  },
  chapterButton: {
    flex: 1,
    margin: spacing.xs,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  chapterText: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.semibold,
  },
});
