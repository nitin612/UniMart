import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Heart, Plus } from 'lucide-react-native';
import {
  COLORS,
  SPACING,
  RADIUS,
  FONTS,
  SHADOW,
  FONT_SIZES,
} from '../../Constants/theme';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - SPACING.lg * 2 - SPACING.md) / 2;

export default function ProductCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>

        <TouchableOpacity style={styles.favoriteBtn}>
          <Heart
            fill={item.isFavorite ? COLORS.ERROR : 'transparent'}
            color={item.isFavorite ? COLORS.ERROR : COLORS.TEXT_PRIMARY}
            size={18}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.conditionText}>{item.condition}</Text>

        <View style={styles.footerRow}>
          <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.actionBtn}>
            <Plus color={COLORS.BACKGROUND} size={18} strokeWidth={3} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    ...SHADOW.card,
    borderWidth: 1,
    borderColor: COLORS.TRANSPARENT0,
  },
  imageContainer: {
    height: CARD_WIDTH * 1.1,
    width: '100%',
    position: 'relative',
    backgroundColor: COLORS.INPUT_BACKGROUND,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryTag: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  categoryText: {
    color: COLORS.TEXT_PRIMARY,
    fontFamily: FONTS.BOLD,
    fontSize: 9,
  },
  favoriteBtn: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: RADIUS.round,
    padding: 6,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  title: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
    lineHeight: 18,
    height: 36,
  },
  conditionText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 11,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.PRIMARY_DARK1,
  },
  actionBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    width: 32,
    height: 32,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
