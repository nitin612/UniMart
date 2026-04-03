import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomLoader from '../../common/CustomLoader';
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
  LogOut,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logOut as logOutAction } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.profile);

  const listings = data?.listings?.length;
  const listingsData = data?.listings;
  const userData = data;

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CustomLoader />
      </View>
    );

  const handleLogOut = async () => {
    await AsyncStorage.clear();
    dispatch(logOutAction());
  };

  return (
    <ScrollView style={styles.Container}>
      <SafeAreaView>
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
            <Text style={styles.nameStyle}>{data?.name}</Text>
            <Text style={styles.imageDescription}>
              {data?.major} | {data?.department}
            </Text>
          </View>
          <View style={styles.basicInfoContainer}>
            <View style={styles.bacicInfo}>
              <Text style={styles.textValue}>{listings}</Text>
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
              <Text style={styles.textValue}>{data?.ratingScore}</Text>
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
              <Text style={styles.textValue}>{data?.itemsSoldCount}</Text>
              <Text style={styles.textValueName}>SOLD</Text>
            </View>
          </View>
        </View>
        <View style={styles.BottomContainer}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.statementText}>ACCOUNT SETTINGS</Text>
          </View>
          <ProfileOptionsListing
            backgroundColor={COLORS.BLUE_T}
            logo={User}
            name={'Edit Profile'}
            icon={ChevronRight}
            iconColor={'darkblue'}
            onPress={() =>
              navigation.navigate('EditProfileScreen', { userData })
            }
          />
          <ProfileOptionsListing
            backgroundColor={COLORS.ORANGE_T}
            logo={NotebookTabs}
            name={'My Listings'}
            icon={ChevronRight}
            iconColor={COLORS.orange}
            onPress={() =>
              navigation.navigate('MyListingsScreen', { listingsData })
            }
          />
          <ProfileOptionsListing
            backgroundColor={COLORS.GREEN_T}
            logo={BadgeIndianRupee}
            name={'Sold Items'}
            icon={ChevronRight}
            iconColor={COLORS.green}
          />
          {/* <ProfileOptionsListing
            backgroundColor={COLORS.PURPLE_T}
            logo={Settings}
            name={'Settings'}
            icon={ChevronRight}
            iconColor={COLORS.purple}
          /> */}
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.statementText}>SUPPORT</Text>
          </View>
          <ProfileOptionsListing
            backgroundColor={COLORS.GREY_T}
            logo={BadgeQuestionMark}
            name={'Help Center'}
            icon={ChevronRight}
            iconColor={COLORS.grey}
          />
          <TouchableOpacity style={styles.logoutView} onPress={handleLogOut}>
            <LogOut size={24} color={'red'} strokeWidth={2.5} />
            <Text style={styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
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
  logoutView: {
    marginVertical: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.RED_T,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    marginBottom: 60,
    alignSelf: 'center',
    width: SCREEN.width * 0.85,
    flexDirection: 'row',
    gap: 10,
  },
  logOutText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.red,
  },
});
