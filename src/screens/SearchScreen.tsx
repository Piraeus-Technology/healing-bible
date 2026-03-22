import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors, fonts, spacing } from '../utils/theme';

export default function SearchScreen() {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Ionicons name="search-outline" size={48} color={colors.textMuted} />
      <Text style={[styles.title, { color: colors.textPrimary }]}>검색</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        성경 구절을 검색하세요
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  title: { fontSize: fonts.sizes.xl, fontWeight: fonts.weights.bold, marginTop: spacing.md },
  subtitle: { fontSize: fonts.sizes.md, marginTop: spacing.sm },
});
