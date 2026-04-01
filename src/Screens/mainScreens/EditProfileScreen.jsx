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
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Camera } from 'lucide-react-native';
import {
  COLORS,
  FONT_SIZES,
  FONTS,
  RADIUS,
  SPACING,
  SCREEN,
} from '../../Constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [department, setDepartment] = useState('');
  const [major, setMajor] = useState('');

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
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={styles.profileImage}
            />

            <TouchableOpacity style={styles.cameraIcon}>
              <Camera size={16} color={COLORS.PRIMARY_BLACK} strokeWidth={2} />
            </TouchableOpacity>
          </View>
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

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
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
});
