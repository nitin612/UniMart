import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FONT_SIZES,
  FONTS,
  COLORS,
  SPACING,
  RADIUS,
  SCREEN,
} from '../../Constants/theme';
import { useNavigation } from '@react-navigation/native';
import { Mail, ArrowLeft } from 'lucide-react-native';
import * as Yup from 'yup';

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const forgetPasswordSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
  });

  const handleResetPassword = async () => {
    try {
      await forgetPasswordSchema.validate({ email });
      setError('');
      console.log('Reset link sent to:', email);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
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
              <ArrowLeft size={25} strokeWidth={2.5} color={COLORS.PRIMARY_BLACK} />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.heading}>Forgot Password?</Text>
            <Text style={styles.description}>
              Don't worry! It happens. Please enter the email address associated with your account.
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>University Email</Text>
              <View style={styles.input}>
                <Mail size={20} strokeWidth={2} color={COLORS.TEXT_MUTED} />
                <TextInput
                  placeholder="yourname@university.edu"
                  style={styles.inputField}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setSuccess(false);
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
              {success ? (
                <Text style={styles.successText}>Password reset link has been sent to your email.</Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.resetBtn}
              activeOpacity={0.7}
              onPress={handleResetPassword}
            >
              <Text style={styles.resetBtnText}>Send Reset Link</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    marginTop: 60,
    marginLeft: SPACING.lg,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: RADIUS.round,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  heading: {
    fontSize: FONT_SIZES.hero,
    fontFamily: FONTS.EXTRABOLD,
    color: COLORS.PRIMARY_BLACK,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 24,
    marginBottom: SPACING.xxxl,
  },
  inputContainer: {
    gap: 10,
    marginBottom: SPACING.xxxl,
  },
  inputText: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_PRIMARY,
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
    flex: 1,
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_PRIMARY,
    padding: 0,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.MEDIUM,
    marginTop: 4,
  },
  successText: {
    color: COLORS.SUCCESS,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.MEDIUM,
    marginTop: 4,
  },
  resetBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.xl,
  },
  resetBtnText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.TEXT_COLOR,
  },
});