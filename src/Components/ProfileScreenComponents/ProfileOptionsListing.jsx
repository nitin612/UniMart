import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONT_SIZES, FONTS, RADIUS, SCREEN, SPACING } from '../../Constants/theme';

const ProfileOptionsListing = ({
  color,
  logo: MainLogo,
  name,
  icon: NextIcon,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstView}>
        <View style={styles.iconView}>
          <MainLogo size={24} />
        </View>
        <View style={styles.nameView}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
      <View>
        <NextIcon size={24} />
      </View>
    </View>
  );
};

export default ProfileOptionsListing;

const styles = StyleSheet.create({
  container: {
    width: SCREEN.width * 0.9,
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
    backgroundColor: COLORS.TRANSPARENT0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameView: { alignItems: 'center', justifyContent: 'center' },
nameText:{
    fontFamily:FONTS.BOLD,
    fontSize:FONT_SIZES.md,
},
  firstView: { flexDirection: 'row', gap: 15 },
});
