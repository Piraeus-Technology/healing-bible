import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  Linking,
  Share,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors, fonts, spacing, radius } from '../utils/theme';
import { useThemeStore } from '../store/themeStore';

const APP_VERSION = '1.0.0';

export default function MoreScreen() {
  const colors = useColors();
  const { isDark, toggleTheme } = useThemeStore();

  const handleSendEmail = () => {
    const subject = encodeURIComponent('힐링성경 피드백');
    const url = `mailto:contact@piraeus.app?subject=${subject}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('이메일 앱 없음', 'contact@piraeus.app으로 직접 피드백을 보내주세요');
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
    >
      {/* 설정 */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>설정</Text>
      <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
        <View style={[styles.settingRow, { borderBottomColor: colors.divider }]}>
          <Ionicons name={isDark ? 'moon' : 'sunny'} size={20} color={colors.textSecondary} />
          <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>다크 모드</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* 지원 */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary, marginTop: spacing.lg }]}>
        지원
      </Text>
      <TouchableOpacity
        style={[styles.rowCard, { backgroundColor: colors.card }]}
        onPress={handleSendEmail}
        activeOpacity={0.7}
      >
        <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={{ marginRight: spacing.md }} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>피드백 보내기</Text>
          <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>버그 신고, 건의사항</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.rowCard, { backgroundColor: colors.card }]}
        onPress={() => {
          Share.share({
            message: '힐링성경 - 당신의 고민에 맞는 성경 말씀을 찾아드립니다',
          });
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="share-outline" size={20} color={colors.textSecondary} style={{ marginRight: spacing.md }} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>앱 공유하기</Text>
          <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>친구에게 추천하기</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>

      <Text style={[styles.version, { color: colors.textMuted }]}>
        힐링성경 v{APP_VERSION}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg },
  sectionTitle: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  settingsCard: {
    borderRadius: radius.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: spacing.md,
  },
  settingLabel: {
    flex: 1,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rowTitle: { fontSize: fonts.sizes.md, fontWeight: fonts.weights.semibold },
  rowSubtitle: { fontSize: fonts.sizes.sm, marginTop: 2 },
  version: {
    fontSize: fonts.sizes.xs,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
});
