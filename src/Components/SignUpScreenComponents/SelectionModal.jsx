import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import React from 'react';
import { X } from 'lucide-react-native';
import {
  FONT_SIZES,
  FONTS,
  COLORS,
  SPACING,
  RADIUS,
  SCREEN,
} from '../../Constants/theme';

const SelectionModal = ({ visible, setVisible, title, data, onSelect, selectedValue }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <X size={24} color={COLORS.PRIMARY_BLACK} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  selectedValue === item && styles.modalItemSelected
                ]}
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    selectedValue === item && styles.modalItemTextSelected
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectionModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    maxHeight: SCREEN.height * 0.7,
    padding: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? 40 : SPACING.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  modalTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.PRIMARY_BLACK,
  },
  modalItem: {
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  modalItemSelected: {
    backgroundColor: 'rgba(46, 186, 175, 0.1)',
  },
  modalItemText: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_SECONDARY,
  },
  modalItemTextSelected: {
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_DARK1,
  },
});
