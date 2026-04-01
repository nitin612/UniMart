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
        <TouchableOpacity style={styles.messgae}>
          <Text style={styles.messageText}>Message to a Seller</Text>
        </TouchableOpacity>
        <View style={styles.price}>
          <Text style={styles.priceText}>Price</Text>
          <Text style={styles.actualPriceText}>30.0</Text>
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
    bottom: 20,
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY_DARK1,
    width: SCREEN.width * 0.9,
    height: SCREEN.width * 0.14,
    borderRadius: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingleft: 20,
  },
  messgae: {
    paddingLeft: 40,
  },
  price: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN.width * 0.14,
    borderRadius: 30,
    paddingHorizontal: 60,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  messageText: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.md,
  },
  priceText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.sm,
  },
  actualPriceText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
  },
});
