import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors, fonts, spacing } from '../utils/theme';

export default function HealingScreen() {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Ionicons name="heart-outline" size={48} color={colors.primary} />
      <Text style={[styles.title, { color: colors.textPrimary }]}>힐링</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        고민이나 걱정을 나누면{'\n'}관련된 성경 말씀을 찾아드립니다
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  title: { fontSize: fonts.sizes.xl, fontWeight: fonts.weights.bold, marginTop: spacing.md },
  subtitle: { fontSize: fonts.sizes.md, marginTop: spacing.sm, textAlign: 'center', lineHeight: 24 },
});
