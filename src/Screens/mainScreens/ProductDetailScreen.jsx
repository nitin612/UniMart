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
import { ArrowLeft, Heart } from 'lucide-react-native';
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
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Air Max 270 React</Text>
        </View>
        <View style={styles.upperImageView}>
          <View style={styles.mainImage}></View>
          <View style={styles.smallPhotoRow}>
            {[1, 2, 3].map(index => (
              <View key={index} style={styles.smallPhoto} />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.messageBtn}>
          <Text style={styles.messageText}>Message to a Seller</Text>
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
    marginTop: 20,
    marginBottom: 15,
  },
  headingText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.heading,
    color: COLORS.PRIMARY_DARK1,
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
});
