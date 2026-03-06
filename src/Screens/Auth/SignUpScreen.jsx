import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import API from '../../api/Api';

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
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, User, Mail, LockKeyhole } from 'lucide-react-native';
import * as Yup from 'yup';
import { register } from '../../api/apiRoutes';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const signUpSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Password does not match'),
  });

  const handleSignUp = async () => {
    try {
      await signUpSchema.validate({
        name,
        email,
        password,
        confirmPassword,
      });
      setError('');
      setLoading(true);
      await register(name, email, password);
      setLoading(false);
      navigation.replace("LoginScreen")
      console.log('User is signed Up');

    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={25} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          <View style={styles.upperContainer}>
            <Text style={styles.createAccText}>Create Account</Text>
            <Text style={styles.descriptionText}>
              join your University's secure trading network.
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.iconContainerRow}>
              <View style={styles.twoRow}>
                <Image
                  source={require('../../assets/Images/UniMartLogo.png')}
                  style={[styles.imageStyle]}
                />
              </View>
              <View>
                <Text style={styles.iconContainerHeadText}>UniMart</Text>
                <Text style={styles.iconContainerDescriptionText}>
                  Varified Student Community
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>FULL NAME</Text>
            <View style={styles.input}>
              <User size={20} strokeWidth={2} color={COLORS.TEXT_MUTED} />
              <TextInput
                placeholder="Full Name"
                style={styles.inputField}
                value={name}
                onChangeText={setName}
              />
            </View>
            <Text style={styles.inputText}>UNIVERSITY EMAIL</Text>
            <View style={styles.input}>
              <Mail size={20} strokeWidth={2} color={COLORS.TEXT_MUTED} />
              <TextInput
                placeholder="yourname@univerdity.edu"
                style={styles.inputField}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <Text style={styles.inputText}>PASSWORD</Text>
            <View style={styles.input}>
              <LockKeyhole
                size={20}
                strokeWidth={2}
                color={COLORS.TEXT_MUTED}
              />
              <TextInput
                placeholder="Atleast 8 characters"
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <Text style={styles.inputText}>CONFIRM PASSWORD</Text>
            <View style={styles.input}>
              <LockKeyhole
                size={20}
                strokeWidth={2}
                color={COLORS.TEXT_MUTED}
              />
              <TextInput
                placeholder="Re-enter password"
                style={styles.inputField}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
            {error ? (
              <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>
            ) : null}

            <View style={styles.createAccView}>
              <Text style={styles.createAccText2}>
                Already have an Account?
              </Text>
              <TouchableOpacity
                style={styles.createAccBtn}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.createAccBtnText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signBtn}
              activeOpacity={0.7}
              onPress={handleSignUp}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="#2EBAAF" />
              ) : (
                <Text style={styles.signBtnText}>Create Secure Account</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  backButton: {
    marginTop: 60,
    marginBottom: SPACING.lg,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: RADIUS.round,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperContainer: {},
  createAccText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.xxl,
    color: COLORS.PRIMARY_BLACK,
  },
  descriptionText: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_MUTED,
  },
  iconContainer: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    marginVertical: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY_DARK1,
    paddingHorizontal: SPACING.lg,
  },
  iconContainerRow: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  twoRow: {},
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.md,
  },
  iconContainerHeadText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.lg,
  },
  iconContainerDescriptionText: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.sm,
  },
  inputContainer: {
    marginTop: SPACING.xl,
    gap: 10,
    width: SCREEN.width * 0.9,
    alignSelf: 'center',
  },
  inputText: {
    fontFamily: FONTS.SEMIBOLD,
  },
  input: {
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.INPUT_BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: 10,
  },
  inputField: {
    backgroundColor: COLORS.INPUT_BACKGROUND,
    flex: 1,
  },
  createAccView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    alignSelf: 'center',
    paddingVertical: SPACING.lg,
  },
  createAccText2: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_SECONDARY,
  },
  createAccBtn: {},
  createAccBtnText: {
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_DARK1,
  },
  buttonContainer: {
    width: SCREEN.width * 0.9,
    marginTop: SPACING.xl,
    alignSelf: 'center',
  },
  signBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
  },
  signBtnText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_COLOR,
  },
});
