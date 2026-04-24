import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import {
  Camera,
  Plus,
  ShieldCheck,
  ChevronDown,
  CircleX,
  ArrowLeft,
  Save,
} from 'lucide-react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  RADIUS,
  SPACING,
} from '../../Constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import API from '../../api/Api';
import CustomLoader from '../../common/CustomLoader';
import {
  fetchItems,
  fetchUserProfile,
} from '../../redux/thunkFunctions/thunkFunctions';
import { useDispatch } from 'react-redux';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

const CATEGORIES = [
  'Electronics',
  'Books',
  'Clothing',
  'Furniture',
  'Sports',
  'Other',
];

const CONDITION = ['Excellent', 'Good', 'Average', 'Below Average'];

const EditProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { item } = route.params || {};
  console.log('rtwaegf', item);
  const id = item?._id;

  const [images, setImages] = useState([]);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [conditionModalVisible, setConditionModalVisible] = useState(false);

  const [title, setTitle] = useState(item?.title || '');
  const [price, setPrice] = useState(item?.price?.toString() || '');
  const [category, setCategory] = useState(item?.category || '');
  const [condition, setCondition] = useState(item?.condition || '');
  const [description, setDescription] = useState(item?.description || '');
  const [isSold, setIsSold] = useState(item?.isSold || '');
  const [isLoading, setLoading] = useState(false);
  const toggleSwitch = () => setIsSold(previous => !previous);

  useEffect(() => {
    if (item?.imageUrls) {
      const existingImages = item.imageUrls.map((url, index) => ({
        uri: url,
        isExisting: true,
        publicId: item.imagePublicIds ? item.imagePublicIds[index] : null,
      }));
      setImages(existingImages);
    }
  }, [item]);

  const handleUpdate = async () => {
    if (!title || !price || !category || !description || !condition) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }
    setLoading(true);
    const payload = {
      title,
      price,
      category,
      description,
      condition,
      isSold,
    };
    try {
      const response = await API.put(`api/items/${id}`, payload);
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchItems());
        dispatch(fetchUserProfile());
        Alert.alert('Success', 'Listing updated successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      console.error('Error updating item:', err);
      Alert.alert('Error', 'Failed to update listing.');
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.whiteHeader}>
      <SafeAreaView edges={['top']}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <ArrowLeft size={24} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Product</Text>
          <TouchableOpacity onPress={handleUpdate} style={styles.iconButton}>
            <Save size={22} color={COLORS.PRIMARY_DARK1} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {renderHeader()}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Photo Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              Photos <Text style={styles.subLabel}>({images.length}/4)</Text>
            </Text>
            <View style={styles.photoGrid}>
              {images.map((img, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: img.uri }} style={styles.thumbnail} />
                </View>
              ))}
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Product Title</Text>
              <TextInput
                style={styles.input}
                placeholder="What are you selling?"
                placeholderTextColor={COLORS.TEXT_MUTED}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.label}>Price (₹)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.TEXT_MUTED}
                  value={price}
                  onChangeText={setPrice}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1.2 }]}>
                <Text style={styles.label}>Category</Text>
                <TouchableOpacity
                  style={styles.picker}
                  onPress={() => setCategoryModalVisible(true)}
                >
                  <Text
                    style={[
                      styles.pickerText,
                      !category && { color: COLORS.TEXT_MUTED },
                    ]}
                  >
                    {category || 'Select'}
                  </Text>
                  <ChevronDown size={18} color={COLORS.TEXT_MUTED} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Condition</Text>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => setConditionModalVisible(true)}
              >
                <Text
                  style={[
                    styles.pickerText,
                    !condition && { color: COLORS.TEXT_MUTED },
                  ]}
                >
                  {condition || 'Select condition'}
                </Text>
                <ChevronDown size={18} color={COLORS.TEXT_MUTED} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your item..."
                placeholderTextColor={COLORS.TEXT_MUTED}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <Text style={[styles.label,{fontSize:FONT_SIZES.md}]}>Is this Item Sold ?</Text>
            <View style={styles.switch}>
              <Text style={[styles.label,{color:COLORS.PRIMARY_BLACK}]}>{isSold ? 'Yes' : 'No'}</Text>

              <Switch
                trackColor={{ false: '#ffffff', true: '#ad7b06' }}
                thumbColor={isSold ? '#ffffff' : '#ffffff'}
                ios_backgroundColor="#ffffff"
                onValueChange={toggleSwitch}
                value={isSold}
              />
            </View>

            <View style={styles.minimalSafety}>
              <ShieldCheck size={16} color={COLORS.TEXT_MUTED} />
              <Text style={styles.safetyText}>
                Honest descriptions lead to faster sales on campus.
              </Text>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleUpdate}>
              <Text style={styles.submitBtnText}>Save Changes</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Category Modal */}
      <Modal transparent visible={categoryModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '60%' }]}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {CATEGORIES.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    setCategory(cat);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      category === cat && {
                        color: COLORS.PRIMARY_DARK1,
                        fontFamily: FONTS.BOLD,
                      },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[
                styles.modalOption,
                { borderTopWidth: 1, borderColor: '#EEE' },
              ]}
              onPress={() => setCategoryModalVisible(false)}
            >
              <Text style={[styles.optionText, { color: COLORS.ERROR }]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Condition Modal */}
      <Modal transparent visible={conditionModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '60%' }]}>
            <Text style={styles.modalTitle}>Select Condition</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {CONDITION.map((cond, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    setCondition(cond);
                    setConditionModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      condition === cond && {
                        color: COLORS.PRIMARY_DARK1,
                        fontFamily: FONTS.BOLD,
                      },
                    ]}
                  >
                    {cond}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[
                styles.modalOption,
                { borderTopWidth: 1, borderColor: '#EEE' },
              ]}
              onPress={() => setConditionModalVisible(false)}
            >
              <Text style={[styles.optionText, { color: COLORS.ERROR }]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isLoading && (
        <View style={styles.loader}>
          <CustomLoader />
        </View>
      )}
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  whiteHeader: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  headerTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: COLORS.TEXT_PRIMARY,
  },
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionLabel: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.md,
  },
  subLabel: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 12,
    color: COLORS.TEXT_MUTED,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  addPhotoBox: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
    backgroundColor: '#F7F8FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 10,
    color: COLORS.TEXT_MUTED,
    marginTop: 4,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  deleteBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  form: {
    gap: SPACING.lg,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#F7F8FA',
    borderRadius: RADIUS.md,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontFamily: FONTS.MEDIUM,
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
  },
  row: {
    flexDirection: 'row',
  },
  picker: {
    backgroundColor: '#F7F8FA',
    borderRadius: RADIUS.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  minimalSafety: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    opacity: 0.7,
    marginTop: 4,
  },
  safetyText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 11,
    color: COLORS.TEXT_MUTED,
  },
  submitBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    borderRadius: RADIUS.round,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  submitBtnText: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 30,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  modalTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 17,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  optionText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
