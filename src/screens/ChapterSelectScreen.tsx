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

export default function ChapterSelectScreen() {
  const colors = useColors();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { bookId } = route.params;
  const book = bookById[bookId];

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: book?.name || '' });
  }, [navigation, book]);

  if (!book) return null;

  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <FlatList
        data={chapters}
        keyExtractor={(item) => String(item)}
        numColumns={5}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.chapterButton, { backgroundColor: colors.card }]}
            onPress={() => navigation.navigate('Chapter', { bookId, chapter: item })}
            activeOpacity={0.7}
          >
            <Text style={[styles.chapterText, { color: colors.textPrimary }]}>{item}</Text>
          </TouchableOpacity>
        )}
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
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chapterText: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.semibold,
  },
});
