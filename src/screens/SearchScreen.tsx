import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors, fonts, spacing, radius } from '../utils/theme';
import { searchBible, SearchResult } from '../utils/search';
import { useSettingsStore } from '../store/settingsStore';

function highlightText(text: string, query: string, primaryColor: string, textColor: string) {
  if (!query.trim()) return <Text style={{ color: textColor }}>{text}</Text>;
  const q = query.trim().toLowerCase();
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return <Text style={{ color: textColor }}>{text}</Text>;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + query.trim().length);
  const after = text.slice(idx + query.trim().length);

  return (
    <Text style={{ color: textColor }}>
      {before}
      <Text style={{ color: primaryColor, fontWeight: '700' }}>{match}</Text>
      {after}
    </Text>
  );
}

export default function SearchScreen() {
  const colors = useColors();
  const navigation = useNavigation<any>();
  const { translation } = useSettingsStore();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchBible(query, translation);
  }, [query, translation]);

  const renderItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={[styles.resultItem, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('성경', { screen: 'Chapter', params: { bookId: item.bookId, chapter: item.chapter } })}
      activeOpacity={0.7}
    >
      <View style={styles.resultHeader}>
        <Text style={[styles.reference, { color: colors.primary }]}>
          {item.bookName} {item.chapter}:{item.verse}
        </Text>
      </View>
      <Text style={[styles.verseText, { color: colors.textPrimary }]} numberOfLines={3}>
        {highlightText(item.text, query, colors.primary, colors.textPrimary)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Search bar */}
      <View style={[styles.searchBar, { backgroundColor: colors.searchBg }]}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder="성경 구절 검색..."
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Results count */}
      {query.trim().length >= 2 && (
        <Text style={[styles.resultCount, { color: colors.textMuted }]}>
          {results.length > 0
            ? `${results.length}${results.length >= 50 ? '+' : ''} 결과`
            : '결과 없음'}
        </Text>
      )}

      {/* Results */}
      {query.trim().length >= 2 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.bookId}-${item.chapter}-${item.verse}`}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color={colors.border} />
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                검색 결과가 없습니다
              </Text>
            </View>
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="book-outline" size={48} color={colors.textMuted} />
          <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
            성경 검색
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
            두 글자 이상 입력하세요
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.md,
    gap: spacing.sm,
  },
  searchInput: { flex: 1, fontSize: fonts.sizes.md },
  resultCount: {
    fontSize: fonts.sizes.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  listContent: { paddingHorizontal: spacing.md, paddingBottom: spacing.lg },
  resultItem: {
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  reference: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
  },
  verseText: {
    fontSize: fonts.sizes.md,
    lineHeight: 24,
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
  },
  emptyText: {
    fontSize: fonts.sizes.md,
    marginTop: spacing.md,
  },
});
