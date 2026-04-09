import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Camera } from 'lucide-react-native';
import CustomLoader from '../../common/CustomLoader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  COLORS,
  FONT_SIZES,
  FONTS,
  RADIUS,
  SPACING,
  SCREEN,
} from '../../Constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  updateUserProfile,
  fetchUserProfile,
} from '../../redux/thunkFunctions/thunkFunctions';
import { useDispatch, useSelector } from 'react-redux';

const EditProfileScreen = ({ route }) => {
  const { userData } = route?.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState(userData?.name);
  const [bio, setBio] = useState(userData?.bio);
  const [department, setDepartment] = useState(userData?.department);
  const [major, setMajor] = useState(userData?.major);
  const [avatar, setAvatar] = useState('');
  const { data, loading, error } = useSelector(state => state.updateUser);

  const handleUpdate = async () => {
    const payload = {
      name,
      bio,
      avatar,
      department,
      major,
    };
    try {
      const response = await dispatch(updateUserProfile(payload));
      dispatch(fetchUserProfile());
      if (updateUserProfile.fulfilled.match(response)) {
        Alert.alert('Success', 'Profile Uploaded Successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (err) {
      console.log('Error occured in handleUpdate', err);
    }
  };

  const openPhotos = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.9,
    });
    if (!result.didCancel && result.assets?.length > 0) {
      setAvatar(result?.assets[0]?.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.upperArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <ArrowLeft size={24} color={COLORS.BACKGROUND} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 32 }} />
        </View>

        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.imageContainer} onPress={openPhotos}>
            <Image
              source={{
                uri: avatar || userData?.avatar, 
              }}
              style={styles.profileImage}
            />

            <TouchableOpacity style={styles.cameraIcon}>
              <Camera size={16} color={COLORS.PRIMARY_BLACK} strokeWidth={2} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.bottomContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={COLORS.TEXT_MUTED}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about yourself"
            placeholderTextColor={COLORS.TEXT_MUTED}
            multiline={true}
            numberOfLines={4}
            value={bio}
            onChangeText={setBio}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Department</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Computer Science"
            placeholderTextColor={COLORS.TEXT_MUTED}
            value={department}
            onChangeText={setDepartment}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Major</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Software Engineering"
            placeholderTextColor={COLORS.TEXT_MUTED}
            value={major}
            onChangeText={setMajor}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
      {loading ? (
        <View style={styles.overLay}>
          <CustomLoader />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  upperArea: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    paddingBottom: SPACING.xxxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  backBtn: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.BACKGROUND,
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: SPACING.xl,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.round,
    borderWidth: 3,
    borderColor: COLORS.BACKGROUND,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    backgroundColor: COLORS.BACKGROUND,
    padding: 8,
    borderRadius: RADIUS.round,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_DARK1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    marginTop: -SPACING.xl,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
  },
  formGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.INPUT_BACKGROUND,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.md,
    color: COLORS.PRIMARY_BLACK,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.round,
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: 40,
    shadowColor: COLORS.PRIMARY_DARK1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
    color: COLORS.BACKGROUND,
  },
  overLay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
