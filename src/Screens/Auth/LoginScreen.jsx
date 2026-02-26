import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FONT_SIZES,
  FONTS,
  COLORS,
  SPACING,
  RADIUS,
  SHADOW,
  width,
  SCREEN,
} from '../../Constants/theme';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={SHADOW.card}>
        <Image
          style={[styles.imageStyle]}
          source={require('../../assets/Images/UniMartLogo.png')}
        />
      </View>
      <Text style={styles.appName}>UniMart</Text>
      <Text style={styles.heading}>Welcome</Text>
      <Text style={styles.description}>
        Please Sign in to Continue to your UniMart Store
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>University Email</Text>
        <TextInput placeholder="yourname@univerdity.edu" style={styles.input} />
        <Text style={styles.inputText}>Password</Text>
        <TextInput placeholder="Password" style={styles.input} />
      </View>
      <View style={{ width: SCREEN.width * 0.9 }}>
        <TouchableOpacity style={styles.forgetContainer}>
          <Text style={styles.forgetTxt}>Forgot Password? </Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: SCREEN.width * 0.9 }}>
        <TouchableOpacity style={styles.loginBtn} activeOpacity={0.7}>
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createAccView}>
        <Text style={styles.createAccText}>New to the community?</Text>
        <TouchableOpacity style={styles.createAccBtn}>
          <Text style={styles.createAccBtnText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.lg,
  },
  appName: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.SEMIBOLD,
  },
  heading: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    fontSize: FONT_SIZES.heading,
    fontFamily: FONTS.EXTRABOLD,
  },
  description: {
    paddingBottom: SPACING.xxxl,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.TEXT_SECONDARY,
  },
  inputContainer: {
    marginTop: SPACING.xl,
    gap: 10,
    width: SCREEN.width * 0.9,
  },
  inputText: {
    fontFamily: FONTS.SEMIBOLD,
  },
  input: {
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.INPUT_BACKGROUND,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  forgetContainer: {
    marginVertical: SPACING.md,
  },
  forgetTxt: {
    alignSelf: 'flex-end',
    color: COLORS.PRIMARY_DARK1,
    fontFamily: FONTS.SEMIBOLD,
  },
  loginBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
  },
  loginBtnText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.TEXT_COLOR,
  },
  createAccView: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 20,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  createAccText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_SECONDARY,
  },
  createAccBtn: {},
  createAccBtnText: {
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_DARK1,
  },
});
