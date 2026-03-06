import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  COLORS,
  FONT_SIZES,
  FONTS,
  RADIUS,
  SCREEN,
  SPACING,
} from '../../Constants/theme';

const ProfileOptionsListing = ({
  backgroundColor,
  logo: MainLogo,
  name,
  icon: NextIcon,
  iconColor,
  strokeWidth,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.firstView}>
        <View style={[styles.iconView, { backgroundColor: backgroundColor }]}>
          <MainLogo size={24} color={iconColor} />
        </View>
        <View style={styles.nameView}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
      <View>
        <NextIcon size={24} color={'grey'} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileOptionsListing;

const styles = StyleSheet.create({
  container: {
    width: SCREEN.width * 0.92,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: SPACING.md,
  },
  iconView: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.lg,
    // backgroundColor: COLORS.TRANSPARENT0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a19a9a',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    elevation: 6,
  },
  nameView: { alignItems: 'center', justifyContent: 'center' },
  nameText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
  },
  firstView: { flexDirection: 'row', gap: 15 },
});
