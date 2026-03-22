import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColors, fonts, spacing, radius } from '../utils/theme';
import { books, oldTestament, newTestament } from '../data/books';
import type { RootStackParamList } from '../types/navigation';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function BibleScreen() {
  const colors = useColors();
  const navigation = useNavigation<NavProp>();
  const [testament, setTestament] = useState<'old' | 'new'>('old');

  const currentBooks = testament === 'old' ? oldTestament : newTestament;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
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
            onPress={() => navigation.navigate('Chapter', { bookId: item.id, chapter: 1 })}
            activeOpacity={0.7}
          >
            <Text style={[styles.bookName, { color: colors.textPrimary }]}>{item.name}</Text>
            <Text style={[styles.bookChapters, { color: colors.textMuted }]}>
              {item.chapters}장
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
