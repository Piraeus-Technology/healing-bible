import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useColors, fonts, spacing } from '../utils/theme';
import { bookById } from '../data/books';

export default function ChapterScreen() {
  const colors = useColors();
  const route = useRoute<any>();
  const { bookId, chapter } = route.params;
  const book = bookById[bookId];

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {book?.name} {chapter}장
      </Text>
      <Text style={[styles.placeholder, { color: colors.textMuted }]}>
        성경 본문이 여기에 표시됩니다
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  title: { fontSize: fonts.sizes.xl, fontWeight: fonts.weights.bold, marginBottom: spacing.md },
  placeholder: { fontSize: fonts.sizes.md },
});
