import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { Mail, LockKeyhole } from 'lucide-react-native';
import * as Yup from 'yup';
import API from '../../api/Api';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/slices/authSlice';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(null);
  const dispatch = useDispatch();

  const logInSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string().required('Password is required').min(6),
  });

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await logInSchema.validate({ email, password });
      setError('');
      const response = await API.post('api/auth/login', { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      dispatch(logIn(token));
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.BACKGROUND_LIGHT }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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
            <Text style={styles.inputText}>Password</Text>
            <View style={styles.input}>
              <LockKeyhole
                size={20}
                strokeWidth={2}
                color={COLORS.TEXT_MUTED}
              />
              <TextInput
                placeholder="Password"
                style={styles.inputField}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            {error ? (
              <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>
            ) : null}
          </View>

          <View style={{ width: SCREEN.width * 0.9 }}>
            <TouchableOpacity
              style={styles.forgetContainer}
              onPress={() => navigation.navigate('ForgetPasswordScreen')}
            >
              <Text style={styles.forgetTxt}>Forgot Password? </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: SCREEN.width * 0.9 }}>
            <TouchableOpacity
              style={styles.loginBtn}
              activeOpacity={0.7}
              onPress={handleLogin}
            >
              {isloading ? (
                <ActivityIndicator size={20} color={'white'} />
              ) : (
                <Text style={styles.loginBtnText}>Log In</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.createAccView}>
            <Text style={styles.createAccText}>New to the community?</Text>
            <TouchableOpacity
              style={styles.createAccBtn}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text style={styles.createAccBtnText}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
  },
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
