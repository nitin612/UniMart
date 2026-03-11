import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ShoppingBag,
  BookOpen,
  Armchair,
  Laptop,
  Ticket,
} from 'lucide-react-native';
import {
  COLORS,
  SPACING,
  FONTS,
  RADIUS,
  FONT_SIZES,
} from '../../Constants/theme';

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Text style={styles.headerSubtitle}>0 items</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.emptyStateContainer}>
          <View style={styles.iconWrapper}>
            <ShoppingBag
              color={COLORS.PRIMARY_DARK1}
              size={56}
              strokeWidth={1.5}
            />
          </View>
          <Text style={styles.emptyTitle}>Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added any gear, textbooks, or dorm essentials
            yet.
          </Text>

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Browse Deals</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT, // Matches HomeScreen background
  },
  headerContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  headerTitle: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.hero - 8,
    color: COLORS.TEXT_PRIMARY,
  },
  headerSubtitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.BIGGER,
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    marginVertical: SPACING.xxxl * 1.5,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    shadowColor: COLORS.PRIMARY_DARK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  emptyTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.xl,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.xxxl,
  },
  primaryButton: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: RADIUS.round, 
    shadowColor: COLORS.PRIMARY_DARK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFF',
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.md,
  },
  browseContainer: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.lg,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xs,
  },
  categoryWrap: {
    alignItems: 'center',
    gap: SPACING.sm,
  },
  categoryIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryLabel: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
});
