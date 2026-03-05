import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  COLORS,
  FONT_SIZES,
  FONTS,
  RADIUS,
  SCREEN,
  SPACING,
} from '../../Constants/theme';
import ProfileOptionsListing from '../../Components/ProfileScreenComponents/ProfileOptionsListing';
import {
  ChevronRight,
  User,
  BadgeIndianRupee,
  NotebookTabs,
  Settings,
  BadgeQuestionMark,
} from 'lucide-react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.UpperContainer}>
        <View style={styles.imageConatiner}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nameStyle}>Scarlet Johnson</Text>
          <Text style={styles.imageDescription}>
            Computer Science | Stanford University
          </Text>
        </View>
        <View style={styles.basicInfoContainer}>
          <View style={styles.bacicInfo}>
            <Text style={styles.textValue}>12</Text>
            <Text style={styles.textValueName}>LISTINGS</Text>
          </View>
          <View
            style={{
              height: 40,
              backgroundColor: COLORS.TRANSPARENT1,
              width: 1,
            }}
          />
          <View style={styles.bacicInfo}>
            <Text style={styles.textValue}>4.9</Text>
            <Text style={styles.textValueName}>RATING</Text>
          </View>
          <View
            style={{
              height: 40,
              backgroundColor: COLORS.TRANSPARENT1,
              width: 1,
            }}
          />
          <View style={styles.bacicInfo}>
            <Text style={styles.textValue}>28</Text>
            <Text style={styles.textValueName}>SOLD</Text>
          </View>
        </View>
      </View>
      <View style={styles.BottomContainer}>
        <View>
          <Text style={styles.statementText}>ACCOUNT SETTINGS</Text>
        </View>
        <ProfileOptionsListing
          color={COLORS.BUTTON_PRIMARY}
          logo={User}
          name={'Edit Profile'}
          icon={ChevronRight}
        />
        <ProfileOptionsListing
          logo={NotebookTabs}
          name={'My Listings'}
          icon={ChevronRight}
        />
        <ProfileOptionsListing
          logo={BadgeIndianRupee}
          name={'Transactions'}
          icon={ChevronRight}
        />
        <ProfileOptionsListing
          logo={Settings}
          name={'Settings'}
          icon={ChevronRight}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_DARK1,
  },
  UpperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_DARK1,
    gap: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    paddingTop: SPACING.md,
  },

  imageConatiner: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.round,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.round,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameStyle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.xl,
    color: COLORS.BACKGROUND,
  },
  imageDescription: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.xs,
    color: COLORS.BACKGROUND,
  },
  basicInfoContainer: {
    width: SCREEN.width * 0.7,
    backgroundColor: COLORS.TRANSPARENT,
    height: 80,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bacicInfo: {
    flex: 1,
  },
  textValue: {
    color: COLORS.BACKGROUND,
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.lg,
    textAlign: 'center',
  },
  textValueName: {
    color: COLORS.BACKGROUND,
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
  },
  BottomContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  statementText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_MUTED,
  },
});
