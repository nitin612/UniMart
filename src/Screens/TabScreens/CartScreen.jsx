import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ShoppingBag,
  Trash2,
  ChevronRight,
  CreditCard,
} from 'lucide-react-native';
import {
  COLORS,
  SPACING,
  FONTS,
  RADIUS,
  FONT_SIZES,
  SHADOW,
} from '../../Constants/theme';
import {
  getCart,
  deleteCartItem,
  clearUserCart,
} from '../../redux/thunkFunctions/thunkFunctions';
import { useDispatch, useSelector } from 'react-redux';
import CartItemCard from '../../Components/cartSecreenComponent/CartItemCard';
import CustomLoader from '../../common/CustomLoader';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, getCartloading } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () =>
            dispatch(clearUserCart()).then(() => dispatch(getCart())),
        },
      ],
    );
  };

  const handleDeleteItem = itemId => {
    dispatch(deleteCartItem(itemId)).then(() => {
      dispatch(getCart());
    });
  };

  const handleBuyItem = sellerId => {
    console.log('message seller:', sellerId);
    navigation.navigate('ChatConversationScreen', { sellerId });
  };

  // const handleUpdateQuantity = (id, newQty) => {
  //   // Logic for updating quantity if API exists
  //   console.log('Updating quantity:', id, newQty);
  // };

  const calculateTotal = () => {
    if (!data?.cart) return 0;
    return data.cart.reduce(
      (total, item) => total + item.item?.price * item.quantity,
      0,
    );
  };

  const cartItemsCount = data?.cart?.length || 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.BACKGROUND_LIGHT}
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>My Cart</Text>
          <Text style={styles.headerSubtitle}>
            {' '}
            {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'} in your
            bag
          </Text>
        </View>
        {cartItemsCount > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.clearAllBtn}
            onPress={handleClearCart}
          >
            <Trash2 size={18} color={COLORS.ERROR} style={{ marginRight: 4 }} />
            <Text style={styles.clearAllText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.container}>
        {getCartloading ? (
          <View style={styles.loaderContainer}>
            <CustomLoader />
          </View>
        ) : cartItemsCount > 0 ? (
          <>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {data.cart.map(cartItem => (
                <CartItemCard
                  key={cartItem._id}
                  itemData={cartItem}
                  onDelete={handleDeleteItem}
                  onBuy={handleBuyItem}
                  // onUpdateQuantity={handleUpdateQuantity}
                />
              ))}

              {/* Order Summary Preview */}
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>
                    ₹{calculateTotal().toLocaleString()}
                  </Text>
                </View>
                {/* <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery</Text>
                  <Text
                    style={[styles.summaryValue, { color: COLORS.SUCCESS }]}
                  >
                    FREE
                  </Text>
                </View> */}
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalValue}>
                    ₹{calculateTotal().toLocaleString()}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </>
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.iconWrapper}>
              <ShoppingBag
                color={COLORS.PRIMARY_DARK1}
                size={60}
                strokeWidth={1.5}
              />
            </View>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Looks like you haven't added anything to your cart yet. Explore
              our products and find something you love!
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.primaryButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.TRANSPARENT0,
  },
  headerTitle: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.xxl,
    color: COLORS.TEXT_PRIMARY,
  },
  headerSubtitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  clearAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.ERROR_LIGHT,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  clearAllText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.xs,
    color: COLORS.ERROR,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.BIGGER,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
    ...SHADOW.card,
  },
  summaryTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_SECONDARY,
  },
  summaryValue: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_PRIMARY,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.TRANSPARENT0,
    marginTop: SPACING.sm,
    paddingTop: SPACING.md,
    marginBottom: 0,
  },
  totalLabel: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_PRIMARY,
  },
  totalValue: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.PRIMARY_DARK1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.TRANSPARENT0,
    ...SHADOW.card,
  },
  footerPriceContainer: {
    flex: 1,
  },
  footerTotalLabel: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 10,
    color: COLORS.TEXT_SECONDARY,
    textTransform: 'uppercase',
  },
  footerTotalPrice: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.xl,
    color: COLORS.TEXT_PRIMARY,
  },
  checkoutBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    borderRadius: RADIUS.round,
    shadowColor: COLORS.PRIMARY_DARK1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutBtnText: {
    color: COLORS.BACKGROUND,
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
    marginRight: 4,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxxl,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOW.card,
  },
  emptyTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.xxl,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.xxxl,
  },
  primaryButton: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: RADIUS.round,
    ...SHADOW.card,
    shadowColor: COLORS.PRIMARY_DARK1,
  },
  primaryButtonText: {
    color: COLORS.BACKGROUND,
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
  },
});
