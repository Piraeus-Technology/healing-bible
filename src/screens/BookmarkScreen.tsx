import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors, fonts, spacing } from '../utils/theme';

export default function BookmarkScreen() {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Ionicons name="bookmark-outline" size={48} color={colors.accent} />
      <Text style={[styles.title, { color: colors.textPrimary }]}>책갈피</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        저장한 말씀이 여기에 표시됩니다
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  title: { fontSize: fonts.sizes.xl, fontWeight: fonts.weights.bold, marginTop: spacing.md },
  subtitle: { fontSize: fonts.sizes.md, marginTop: spacing.sm },
});
