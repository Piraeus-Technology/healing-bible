import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Share,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { useColors, fonts, spacing, radius } from '../utils/theme';
import { bookById } from '../data/books';
import { getChapter } from '../data/bible';
import { useBookmarkStore } from '../store/bookmarkStore';
import { useHighlightStore, HighlightColor } from '../store/highlightStore';
import { useNoteStore } from '../store/noteStore';
import { useSettingsStore } from '../store/settingsStore';

const highlightOptions: { color: HighlightColor; label: string }[] = [
  { color: 'yellow', label: '노랑' },
  { color: 'green', label: '초록' },
  { color: 'blue', label: '파랑' },
  { color: 'pink', label: '분홍' },
];

export default function ChapterScreen() {
  const colors = useColors();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { bookId, chapter } = route.params;
  const book = bookById[bookId];

  const { isBookmarked, addBookmark, removeBookmark, loadBookmarks } = useBookmarkStore();
  const { getHighlight, setHighlight, removeHighlight, loadHighlights } = useHighlightStore();
  const { getNote, saveNote, deleteNote, loadNotes } = useNoteStore();
  const { fontSize, translation, loadSettings, setLastRead, setTranslation } = useSettingsStore();

  const verses = getChapter(bookId, chapter, translation);

  const [selectedVerse, setSelectedVerse] = useState<{ num: number; text: string } | null>(null);
  const [noteText, setNoteText] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  // Swipe gesture tracking
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    loadBookmarks();
    loadHighlights();
    loadNotes();
    loadSettings();
  }, []);

  React.useEffect(() => {
    setLastRead(bookId, chapter);
  }, [bookId, chapter]);

  React.useLayoutEffect(() => {
    const name = translation === 'kjv' ? book?.nameEn : book?.name;
    const suffix = translation === 'kjv' ? '' : '장';
    navigation.setOptions({
      title: `${name} ${chapter}${suffix}`,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setTranslation(translation === 'kjv' ? 'krv' : 'kjv');
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ marginRight: 8 }}
        >
          <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '600' }}>
            {translation === 'kjv' ? '한글' : 'KJV'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, book, chapter, translation, colors]);

  const highlightColorMap: Record<HighlightColor, string> = {
    yellow: colors.highlightYellow,
    green: colors.highlightGreen,
    blue: colors.highlightBlue,
    pink: colors.highlightPink,
  };

  const rawHighlightColors: Record<HighlightColor, string> = {
    yellow: '#FFF176',
    green: '#A5D6A7',
    blue: '#90CAF9',
    pink: '#F48FB1',
  };

  const goToChapter = (ch: number) => {
    navigation.replace('Chapter', { bookId, chapter: ch });
  };

  const handleVerseTap = (verseNum: number, text: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedVerse({ num: verseNum, text });
    setNoteText(getNote(bookId, chapter, verseNum) || '');
    setShowNoteInput(false);
  };

  const handleHighlight = (color: HighlightColor) => {
    if (!selectedVerse) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const current = getHighlight(bookId, chapter, selectedVerse.num);
    if (current === color) {
      removeHighlight(bookId, chapter, selectedVerse.num);
    } else {
      setHighlight(bookId, chapter, selectedVerse.num, color);
    }
    setSelectedVerse(null);
  };

  const handleBookmarkToggle = () => {
    if (!selectedVerse) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (isBookmarked(bookId, chapter, selectedVerse.num)) {
      removeBookmark(bookId, chapter, selectedVerse.num);
    } else {
      addBookmark({ book: bookId, chapter, verse: selectedVerse.num, text: selectedVerse.text });
    }
    setSelectedVerse(null);
  };

  const handleRemoveHighlight = () => {
    if (!selectedVerse) return;
    removeHighlight(bookId, chapter, selectedVerse.num);
    setSelectedVerse(null);
  };

  const handleSaveNote = () => {
    if (!selectedVerse) return;
    if (noteText.trim()) {
      saveNote(bookId, chapter, selectedVerse.num, noteText.trim());
    } else {
      deleteNote(bookId, chapter, selectedVerse.num);
    }
    setShowNoteInput(false);
    setSelectedVerse(null);
  };

  if (!book) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={{ color: colors.textPrimary }}>책을 찾을 수 없습니다</Text>
      </View>
    );
  }

  if (!verses || verses.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.bg }]}>
        <Ionicons name="book-outline" size={48} color={colors.textMuted} />
        <Text style={[styles.emptyText, { color: colors.textMuted }]}>
          본문 준비 중입니다
        </Text>
        <View style={styles.navRow}>
          {chapter > 1 && (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: colors.card }]}
              onPress={() => goToChapter(chapter - 1)}
            >
              <Ionicons name="chevron-back" size={18} color={colors.primary} />
              <Text style={[styles.navText, { color: colors.primary }]}>이전 장</Text>
            </TouchableOpacity>
          )}
          {chapter < book.chapters && (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: colors.card }]}
              onPress={() => goToChapter(chapter + 1)}
            >
              <Text style={[styles.navText, { color: colors.primary }]}>다음 장</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={styles.container}
        onTouchStart={(e) => {
          touchStart.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
        }}
        onTouchEnd={(e) => {
          if (!touchStart.current || selectedVerse) return;
          const dx = e.nativeEvent.pageX - touchStart.current.x;
          const dy = e.nativeEvent.pageY - touchStart.current.y;
          // Only trigger if horizontal swipe is dominant and long enough
          if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2) {
            if (dx < 0 && chapter < book.chapters) {
              goToChapter(chapter + 1);
            } else if (dx > 0 && chapter > 1) {
              goToChapter(chapter - 1);
            }
          }
          touchStart.current = null;
        }}
      >
        {/* Chapter header — tap to select chapter */}
        <TouchableOpacity
          style={styles.chapterHeader}
          onPress={() => navigation.navigate('ChapterSelect', { bookId })}
          activeOpacity={0.7}
        >
          <Text style={[styles.chapterTitle, { color: colors.primary }]}>
            {translation === 'kjv' ? book.nameEn : book.name} {chapter}{translation === 'kjv' ? '' : '장'}
          </Text>
          <Ionicons name="chevron-down" size={18} color={colors.textMuted} style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        {/* Verses */}
        <View style={styles.versesContainer}>
          {verses.map((text, i) => {
            const verseNum = i + 1;
            const highlight = getHighlight(bookId, chapter, verseNum);
            const bookmarked = isBookmarked(bookId, chapter, verseNum);
            const hasNote = !!getNote(bookId, chapter, verseNum);

            return (
              <TouchableOpacity
                key={verseNum}
                style={[
                  styles.verseRow,
                  highlight && { backgroundColor: highlightColorMap[highlight] },
                ]}
                onPress={() => handleVerseTap(verseNum, text)}
                activeOpacity={0.8}
              >
                <Text style={[styles.verseNumber, { color: colors.primary }]}>
                  {verseNum}
                </Text>
                <Text style={[styles.verseText, { color: colors.textPrimary, fontSize, lineHeight: fontSize * 1.6 }]}>
                  {text}
                </Text>
                <View style={styles.verseIcons}>
                  {hasNote && (
                    <Ionicons name="chatbubble" size={12} color={colors.primary} />
                  )}
                  {bookmarked && (
                    <Ionicons name="bookmark" size={14} color={colors.bookmarkColor} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Chapter navigation */}
        <View style={styles.navRow}>
          {chapter > 1 && (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: colors.card }]}
              onPress={() => goToChapter(chapter - 1)}
            >
              <Ionicons name="chevron-back" size={18} color={colors.primary} />
              <Text style={[styles.navText, { color: colors.primary }]}>이전 장</Text>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }} />
          {chapter < book.chapters && (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: colors.card }]}
              onPress={() => goToChapter(chapter + 1)}
            >
              <Text style={[styles.navText, { color: colors.primary }]}>다음 장</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Verse action modal */}
      <Modal
        visible={selectedVerse !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedVerse(null)}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={styles.modalOverlay} onPress={() => setSelectedVerse(null)}>
          <Pressable style={[styles.modalContent, { backgroundColor: colors.card }]}>
            {selectedVerse && (
              <>
                <Text style={[styles.modalReference, { color: colors.primary }]}>
                  {book.name} {chapter}:{selectedVerse.num}
                </Text>
                <Text style={[styles.modalVerse, { color: colors.textPrimary }]} numberOfLines={3}>
                  {selectedVerse.text}
                </Text>

                {/* Highlight colors */}
                <Text style={[styles.modalLabel, { color: colors.textMuted }]}>형광펜</Text>
                <View style={styles.colorRow}>
                  {highlightOptions.map((opt) => {
                    const isActive = getHighlight(bookId, chapter, selectedVerse.num) === opt.color;
                    return (
                      <TouchableOpacity
                        key={opt.color}
                        style={[
                          styles.colorButton,
                          { backgroundColor: rawHighlightColors[opt.color] },
                          isActive && styles.colorButtonActive,
                        ]}
                        onPress={() => handleHighlight(opt.color)}
                      >
                        {isActive && <Ionicons name="checkmark" size={18} color="#333" />}
                      </TouchableOpacity>
                    );
                  })}
                  {getHighlight(bookId, chapter, selectedVerse.num) && (
                    <TouchableOpacity
                      style={[styles.colorButton, { backgroundColor: colors.pillBg }]}
                      onPress={handleRemoveHighlight}
                    >
                      <Ionicons name="close" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Actions */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.pillBg }]}
                    onPress={handleBookmarkToggle}
                  >
                    <Ionicons
                      name={isBookmarked(bookId, chapter, selectedVerse.num) ? 'bookmark' : 'bookmark-outline'}
                      size={20}
                      color={isBookmarked(bookId, chapter, selectedVerse.num) ? colors.bookmarkColor : colors.textSecondary}
                    />
                    <Text style={[styles.actionText, { color: colors.textPrimary }]}>
                      {isBookmarked(bookId, chapter, selectedVerse.num) ? '책갈피 삭제' : '책갈피'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.pillBg }]}
                    onPress={() => setShowNoteInput(!showNoteInput)}
                  >
                    <Ionicons
                      name={getNote(bookId, chapter, selectedVerse.num) ? 'chatbubble' : 'chatbubble-outline'}
                      size={20}
                      color={getNote(bookId, chapter, selectedVerse.num) ? colors.primary : colors.textSecondary}
                    />
                    <Text style={[styles.actionText, { color: colors.textPrimary }]}>
                      {getNote(bookId, chapter, selectedVerse.num) ? '메모 수정' : '메모'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.pillBg }]}
                    onPress={() => {
                      Share.share({
                        message: `"${selectedVerse.text}"\n— ${book.name} ${chapter}:${selectedVerse.num} (힐링성경)`,
                      });
                    }}
                  >
                    <Ionicons name="share-outline" size={20} color={colors.textSecondary} />
                    <Text style={[styles.actionText, { color: colors.textPrimary }]}>공유</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.pillBg }]}
                    onPress={async () => {
                      await Clipboard.setStringAsync(`${selectedVerse.text}\n— ${book.name} ${chapter}:${selectedVerse.num}`);
                      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                      setSelectedVerse(null);
                    }}
                  >
                    <Ionicons name="copy-outline" size={20} color={colors.textSecondary} />
                    <Text style={[styles.actionText, { color: colors.textPrimary }]}>복사</Text>
                  </TouchableOpacity>
                </View>

                {/* Note input */}
                {showNoteInput && (
                  <View style={styles.noteSection}>
                    <TextInput
                      style={[styles.noteInput, { color: colors.textPrimary, backgroundColor: colors.pillBg, borderColor: colors.border }]}
                      placeholder="메모를 입력하세요..."
                      placeholderTextColor={colors.textMuted}
                      value={noteText}
                      onChangeText={setNoteText}
                      multiline
                      autoFocus
                    />
                    <View style={styles.noteActions}>
                      {getNote(bookId, chapter, selectedVerse.num) && (
                        <TouchableOpacity
                          style={[styles.noteButton, { backgroundColor: '#FFEBEE' }]}
                          onPress={() => {
                            deleteNote(bookId, chapter, selectedVerse.num);
                            setNoteText('');
                            setShowNoteInput(false);
                            setSelectedVerse(null);
                          }}
                        >
                          <Text style={[styles.noteButtonText, { color: '#C62828' }]}>삭제</Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={[styles.noteButton, { backgroundColor: colors.primary }]}
                        onPress={handleSaveNote}
                      >
                        <Text style={[styles.noteButtonText, { color: '#fff' }]}>저장</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </>
            )}
          </Pressable>
        </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyText: {
    fontSize: fonts.sizes.md,
    marginTop: spacing.md,
  },
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  chapterTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
  },
  versesContainer: {
    paddingHorizontal: spacing.md,
  },
  verseRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    marginBottom: 2,
  },
  verseNumber: {
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.bold,
    width: 28,
    marginTop: 3,
  },
  verseText: {
    fontSize: fonts.sizes.verse,
    lineHeight: 32,
    flex: 1,
  },
  verseIcons: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: spacing.xs,
    marginTop: 4,
    gap: 2,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    gap: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  navText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xl + 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  modalReference: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
    marginBottom: spacing.xs,
  },
  modalVerse: {
    fontSize: fonts.sizes.md,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  modalLabel: {
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorButtonActive: {
    borderWidth: 3,
    borderColor: '#333',
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    gap: spacing.sm,
  },
  actionText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.medium,
  },
  noteSection: {
    marginTop: spacing.md,
  },
  noteInput: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fonts.sizes.md,
    minHeight: 80,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  noteButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  noteButtonText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
  },
});
