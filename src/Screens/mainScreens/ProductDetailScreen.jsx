import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, MessageCircleDashed } from 'lucide-react-native';
import {
  COLORS,
  FONT_SIZES,
  FONTS,
  SCREEN,
  SPACING,
} from '../../Constants/theme';
import { useNavigation } from '@react-navigation/native';

const ProductDetailScreen = ({ item }) => {
  const navigation = useNavigation();
  const arr = [1, 2, 3];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <TouchableOpacity
          style={[styles.iconBack, { padding: 8 }]}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={26} color={COLORS.PRIMARY_BLACK} strokeWidth={2.5} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconBack,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: 15,
              gap: 10,
            },
          ]}
        >
          <View
            style={{
              padding: 8,
              backgroundColor: COLORS.BORDER,
              borderRadius: 30,
            }}
          >
            <Heart size={26} color={COLORS.PRIMARY_BLACK} strokeWidth={2.5} />
          </View>
          <Text style={styles.likeIconText}>Like</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Air Max 270 React</Text>
        </View>
        <View style={styles.upperImageView}>
          <View style={styles.mainImage}></View>
          {arr.length > 0 && (
            <View style={styles.smallPhotoRow}>
              {arr.map(index => (
                <View key={index} style={styles.smallPhoto} />
              ))}
            </View>
          )}
        </View>

        {/* Wishlist Indicator Banner */}
        <View style={styles.wishlistBanner}>
          <Heart
            size={20}
            color={COLORS.PRIMARY_DARK1}
            fill={COLORS.PRIMARY_DARK1}
          />
          <Text style={styles.wishlistBannerText}>
            <Text style={styles.wishlistBannerCount}>245</Text> people
            wishlisted this
          </Text>
        </View>

        {/* Product Details Section */}
        <View style={styles.productDetails}>
          <Text style={styles.productDetailsText}>Product Details</Text>
        </View>
        <View style={styles.productCondition}>
          <View style={styles.detailRow}>
            <Text style={styles.productConditionText}>Condition</Text>
            <Text style={styles.productConditionValue}>Good</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.productConditionText}>Type</Text>
            <Text style={styles.productConditionValue}>Clothing</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            This is a beautiful and pre-loved item in great condition. Shows
            minimal signs of wear and comes with original packaging. Perfect for
            daily wear or special occasions!
          </Text>
        </View>

        {/* Seller Info Section */}
        <View style={styles.sellerContainer}>
          <View style={styles.sellerProfile}>
            <View style={styles.sellerAvatar} />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>Sarah Parker</Text>
              <Text style={styles.listedDate}>Listed on 12 Oct, 2026</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewProfileBtn}>
            <Text style={styles.viewProfileText}>View</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* {Absolute Button} */}
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.messageBtn}>
          <Text style={styles.messageText}>Message to a Seller</Text>
          <MessageCircleDashed
            size={18}
            color={COLORS.TEXT_COLOR}
            strokeWidth={2.5}
          />
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Price</Text>
          <Text style={styles.actualPriceText}>$30.00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  iconBack: {
    borderRadius: 30,
    backgroundColor: COLORS.BACKGROUND,
    shadowColor: COLORS.TEXT_MUTED,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,

    elevation: 9,
  },
  likeIconText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.sm,
  },
  heading: {
    marginTop: 5,
    marginBottom: 15,
  },
  headingText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.heading,
    color: COLORS.PRIMARY_DARK1,
  },
  wishlistBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  wishlistBannerText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_SECONDARY,
  },
  wishlistBannerCount: {
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_BLACK,
  },
  descriptionSection: {
    marginTop: 24,
    paddingHorizontal: 4,
  },
  descriptionText: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 24,
  },
  upperImageView: {
    gap: 10,
  },
  mainImage: {
    backgroundColor: COLORS.TEXT_MUTED,
    height: SCREEN.width * 0.75,
    borderRadius: 10,
  },
  smallPhotoRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  smallPhoto: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.TEXT_MUTED,
    borderRadius: 10,
  },
  wrapper: {
    position: 'absolute',
    bottom: 24,
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY_DARK1,
    width: SCREEN.width * 0.9,
    height: 64,
    borderRadius: 32,
    alignSelf: 'center',
    shadowColor: COLORS.PRIMARY_DARK1,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 6,
  },
  messageBtn: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 26,
    paddingHorizontal: 50,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.md,
  },
  priceText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.xs + 1,
    color: COLORS.TEXT_MUTED,
    marginBottom: -2,
  },
  actualPriceText: {
    color: COLORS.PRIMARY_DARK1,
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md + 1,
  },
  productDetails: {
    marginTop: 24,
    marginBottom: 12,
  },
  productDetailsText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.PRIMARY_BLACK,
  },
  productCondition: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailDivider: {
    height: 1,
    backgroundColor: COLORS.BORDER,
  },
  productConditionText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_MUTED,
  },
  productConditionValue: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.md,
    color: COLORS.PRIMARY_BLACK,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BACKGROUND,
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sellerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.BORDER,
  },
  sellerInfo: {
    justifyContent: 'center',
  },
  sellerName: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
    color: COLORS.PRIMARY_BLACK,
    marginBottom: 2,
  },
  listedDate: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_MUTED,
  },
  viewProfileBtn: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  viewProfileText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.sm,
    color: COLORS.PRIMARY_BLACK,
  },
});
