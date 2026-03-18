import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Camera,
  Plus,
  ShieldCheck,
  Send,
  ChevronDown,
} from 'lucide-react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../Constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddProduct = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Sync Header from HomeScreen */}
        <View style={styles.headerContainer}>
          <Text style={styles.greetingText}>Post Your Product</Text>
          <Text style={styles.discoverText}>List your items on UniMart</Text>
        </View>

        {/* Photos Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos (up to 4)</Text>
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.mainPhotoPlaceholder}>
              <View style={styles.iconCircle}>
                <Camera size={28} color={COLORS.PRIMARY_DARK1} strokeWidth={2.5} />
              </View>
              <Text style={styles.mainPhotoText}>Add Main Photo</Text>
              <Text style={styles.subPhotoText}>Tap to open camera or gallery</Text>
            </TouchableOpacity>

            <View style={styles.smallPhotoRow}>
              {[1, 2, 3].map((item) => (
                <TouchableOpacity key={item} style={styles.smallPhotoPlaceholder}>
                  <Plus size={24} color={COLORS.TEXT_MUTED} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Input Fields Section */}
        <View style={styles.section}>
          <Text style={styles.label}>What are you selling?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Organic Chemistry Textbook (12th Ed)"
            placeholderTextColor={COLORS.TEXT_MUTED}
          />

          <Text style={styles.label}>Price</Text>
          <View style={styles.priceInputContainer}>
            <Text style={styles.currencySymbol}>0.00</Text>
          </View>

          <Text style={styles.label}>Category</Text>
          <TouchableOpacity style={styles.categoryPicker}>
            <Text style={styles.categoryText}>Select Category</Text>
            <ChevronDown size={20} color={COLORS.TEXT_MUTED} />
          </TouchableOpacity>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the condition, features, or where you'd like to meet on campus..."
            placeholderTextColor={COLORS.TEXT_MUTED}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Campus Safety Tip */}
        <View style={styles.safetyTipContainer}>
          <ShieldCheck size={20} color={COLORS.PRIMARY_DARK1} />
          <View style={styles.safetyTipTextContainer}>
            <Text style={styles.safetyTipTitle}>
              Campus Safety Tip: <Text style={styles.safetyTipBody}>Only meet in public, well-lit areas on campus. Use the university's "Safe Swap Zone" for high-value items.</Text>
            </Text>
          </View>
        </View>

        {/* Post Listing Button */}
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post Listing</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT, 
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.BIGGER,
  },
  headerContainer: {
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  greetingText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.xs,
  },
  discoverText: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.xl,
    color: COLORS.PRIMARY_DARK1, 
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.md,
  },
  photoContainer: {
    gap: SPACING.md,
  },
  mainPhotoPlaceholder: {
    height: 180,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY_LIGHT,
    borderStyle: 'dashed',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  mainPhotoText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_DARK1,
    marginBottom: SPACING.xs,
  },
  subPhotoText: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.REGULAR,
    color: COLORS.PRIMARY_DARK1,
    opacity: 0.6,
  },
  smallPhotoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  smallPhotoPlaceholder: {
    flex: 1,
    height: 100,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    borderStyle: 'dashed',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.BOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.REGULAR,
    color: COLORS.TEXT_PRIMARY,
    backgroundColor: COLORS.BACKGROUND,
  },
  priceInputContainer: {
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  currencySymbol: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.BOLD,
    color: COLORS.TEXT_SECONDARY,
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
  textArea: {
    height: 100,
    paddingTop: SPACING.md,
  },
  safetyTipContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY_LIGHT,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(173, 123, 6, 0.1)',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  safetyTipTextContainer: {
    flex: 1,
  },
  safetyTipTitle: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_DARK1,
    lineHeight: 18,
  },
  safetyTipBody: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.PRIMARY_DARK1,
    opacity: 0.8,
  },
  postButton: {
    backgroundColor: COLORS.PRIMARY_DARK1, 
    height: 56,
    borderRadius: RADIUS.round,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  postButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.BOLD,
    color: COLORS.BACKGROUND,
  },
  sendIcon: {
    transform: [{ rotate: '-15deg' }],
  },
});