import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { COLORS, SPACING, RADIUS, FONTS, SHADOW } from '../../Constants/theme';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Search color={COLORS.TEXT_MUTED} size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search for books, electronics..."
        placeholderTextColor={COLORS.TEXT_MUTED}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    height: 52,
    marginVertical: SPACING.sm,
    ...SHADOW.card,
  },
  icon: {
    marginRight: SPACING.md,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.MEDIUM,
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
  },
});
