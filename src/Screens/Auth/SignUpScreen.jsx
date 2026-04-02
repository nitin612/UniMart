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
import Api from '../../api/Api';
import SelectionModal from '../../Components/SignUpScreenComponents/SelectionModal';

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
import {
  ArrowLeft,
  User,
  Mail,
  LockKeyhole,
  NotebookTabs,
  Building2,
  ChevronDown,
} from 'lucide-react-native';
import * as Yup from 'yup';
import { register } from '../../api/apiRoutes';

const ACADEMIC_DATA = {
  'Computer Science & IT': [
    'Computer Science',
    'Software Engineering',
    'Information Technology',
    'Data Science',
    'Cybersecurity',
  ],
  Engineering: [
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
  ],
  'Business & Management': [
    'Business Administration',
    'Finance',
    'Marketing',
    'Accounting',
    'Human Resources',
  ],
  'Arts & Humanities': [
    'English Literature',
    'History',
    'Philosophy',
    'Fine Arts',
    'Languages',
  ],
  'Social Sciences': [
    'Psychology',
    'Sociology',
    'Political Science',
    'Economics',
    'Anthropology',
  ],
  'Natural Sciences': [
    'Biology',
    'Chemistry',
    'Physics',
    'Environmental Science',
    'Geology',
  ],
  'Mathematics & Statistics': [
    'Mathematics',
    'Statistics',
    'Applied Mathematics',
  ],
  'Health & Medicine': [
    'Nursing',
    'Pre-Med',
    'Public Health',
    'Pharmacy',
    'Physical Therapy',
  ],
  'Architecture & Design': [
    'Architecture',
    'Interior Design',
    'Graphic Design',
    'Urban Planning',
  ],
  Education: [
    'Elementary Education',
    'Secondary Education',
    'Special Education',
  ],
  Law: ['Law', 'Criminal Justice', 'Legal Studies'],
};

const DEPARTMENTS = Object.keys(ACADEMIC_DATA);

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [major, setMajor] = useState('');
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [majorModalVisible, setMajorModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const signUpSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    department: Yup.string().required('Department is required'),
    major: Yup.string().required('Major is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Password does not match'),
  });

  const handleDepartmentSelect = selectedDept => {
    setDepartment(selectedDept);
    setMajor('');
    setDepartmentModalVisible(false);
    setError('');
  };

  const handleSignUp = async () => {
    try {
      await signUpSchema.validate({
        name,
        email,
        department,
        major,
        password,
        confirmPassword,
      });
      setError('');
      setLoading(true);
      const response = await Api.post('api/auth/register', {
        name,
        email,
        department,
        major,
        password,
      });
      setLoading(false);
      navigation.replace('LoginScreen');
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
            <Text style={styles.inputText}>DEPARTMENT</Text>
            <TouchableOpacity
              style={styles.categoryPicker}
              onPress={() => setDepartmentModalVisible(true)}
            >
              <Text
                style={[
                  styles.categoryText,
                  department && { color: COLORS.PRIMARY_BLACK },
                ]}
              >
                {department || 'Select Department'}
              </Text>
              <ChevronDown size={20} color={COLORS.TEXT_MUTED} />
            </TouchableOpacity>

            <Text style={styles.inputText}>MAJOR</Text>
            <TouchableOpacity
              style={styles.categoryPicker}
              onPress={() => {
                if (department) {
                  setMajorModalVisible(true);
                } else {
                  setError('Please select a department first');
                }
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  major && { color: COLORS.PRIMARY_BLACK },
                ]}
              >
                {major || 'Select Major'}
              </Text>
              <ChevronDown size={20} color={COLORS.TEXT_MUTED} />
            </TouchableOpacity>
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
        </ScrollView>
      </KeyboardAvoidingView>

      <SelectionModal
        visible={departmentModalVisible}
        setVisible={setDepartmentModalVisible}
        title="Select Department"
        data={DEPARTMENTS}
        onSelect={handleDepartmentSelect}
        selectedValue={department}
      />

      <SelectionModal
        visible={majorModalVisible}
        setVisible={setMajorModalVisible}
        title="Select Major"
        data={department ? ACADEMIC_DATA[department] : []}
        onSelect={setMajor}
        selectedValue={major}
      />
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
    marginTop: 10,
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
  categoryPicker: {
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BACKGROUND,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.REGULAR,
    color: COLORS.TEXT_SECONDARY,
  },
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
