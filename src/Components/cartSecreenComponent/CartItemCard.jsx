import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2, ShoppingCart, Minus, Plus } from 'lucide-react-native';
import {
  COLORS,
  SPACING,
  RADIUS,
  FONTS,
  FONT_SIZES,
  SHADOW,
} from '../../Constants/theme';
import { useNavigation } from '@react-navigation/native';

const CartItemCard = ({ itemData, onDelete, onBuy, onUpdateQuantity }) => {
  const { item, quantity, _id } = itemData;
  console.log('hkgjf', item);
  if (!item) return null;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('SellerProductDetailScreen', { item })
      }
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrls?.[0] }} style={styles.image} />
        {item.condition && (
          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>{item.condition}</Text>
          </View>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity
            onPress={() => onDelete(item._id)}
            style={styles.deleteBtn}
            activeOpacity={0.7}
          >
            <Trash2 size={20} color={COLORS.ERROR} />
          </TouchableOpacity>
        </View>

        <Text style={styles.description} numberOfLines={1}>
          {item.description}
        </Text>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
            {quantity > 1 && (
              <Text style={styles.unitPrice}>
                ₹{item.price} x {quantity}
              </Text>
            )}
          </View>

          {/* <View style={styles.quantityContainer}>
            <TouchableOpacity 
              onPress={() => onUpdateQuantity(item._id, quantity - 1)}
              style={styles.qtyBtn}
              disabled={quantity <= 1}
            >
              <Minus size={16} color={quantity <= 1 ? COLORS.TEXT_MUTED : COLORS.PRIMARY_DARK1} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity 
              onPress={() => onUpdateQuantity(item._id, quantity + 1)}
              style={styles.qtyBtn}
            >
              <Plus size={16} color={COLORS.PRIMARY_DARK1} />
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.buyBtn}
            onPress={() => onBuy(item.seller)}
            activeOpacity={0.8}
          >
            <ShoppingCart
              size={18}
              color={COLORS.BACKGROUND}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.buyBtnText}>Message to seller</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.card,
    borderWidth: 1,
    borderColor: COLORS.TRANSPARENT0,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.INPUT_BACKGROUND,
  },
  conditionBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  conditionText: {
    fontSize: 8,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_DARK1,
    textTransform: 'uppercase',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.BOLD,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    marginRight: SPACING.sm,
  },
  deleteBtn: {
    padding: 4,
  },
  description: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.REGULAR,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.xs,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  price: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.EXTRABOLD,
    color: COLORS.PRIMARY_DARK1,
  },
  unitPrice: {
    fontSize: 10,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.TEXT_MUTED,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.INPUT_BACKGROUND,
    borderRadius: RADIUS.sm,
    padding: 2,
  },
  qtyBtn: {
    padding: 4,
  },
  quantityText: {
    paddingHorizontal: 8,
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_PRIMARY,
  },
  actionRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.TRANSPARENT0,
    paddingTop: SPACING.sm,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 10,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  totalPrice: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  buyBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: RADIUS.round,
  },
  buyBtnText: {
    color: COLORS.BACKGROUND,
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.sm,
  },
});

export default CartItemCard;
