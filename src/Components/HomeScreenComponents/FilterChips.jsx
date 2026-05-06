import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '../../Constants/theme';

const OPTIONS = [
  'All',
  'Electronics',
  'Books',
  'Clothing',
  'Furniture',
  'Sports',
  'Other',
];

const FilterChips = React.memo(({ selected, onSelect }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {OPTIONS.map(item => {
          const isSelected = item === selected;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onSelect(item)}
            >
              <Text style={[styles.text, isSelected && styles.textSelected]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
});

export default FilterChips;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.sm,
  },
  container: {
    paddingRight: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.round,
    marginRight: SPACING.md,
    backgroundColor: COLORS.INPUT_BACKGROUND,
  },
  chipSelected: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },
  text: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },
  textSelected: {
    color: COLORS.PRIMARY_DARK1,
    fontFamily: FONTS.BOLD,
  },
});
