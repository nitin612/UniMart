import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Primary Brand
  PRIMARY_DARK: '#112473',
  PRIMARY_DARK1: '#ad7b06',
  PRIMARY_LIGHT: 'rgba(173, 123, 6, 0.2)',
  PRIMARY: '#203EE2',
  PRIMARY_BRIGHT: '#2143E7',
  PRIMARY_BLACK: '#000000',

  // Button
  BUTTON_PRIMARY: '#2563EB',
  BUTTON_PRIMARY_HOVER: '#1D4ED8',

  // Backgrounds
  BACKGROUND: '#FFFFFF',
  BACKGROUND_LIGHT: '#F9FAFB',
  INPUT_BACKGROUND: '#F3F4F6',

  // Text
  TEXT_PRIMARY: '#111827',
  TEXT_SECONDARY: '#6B7280',
  TEXT_MUTED: '#9CA3AF',
  TEXT_COLOR: '#ffffff',

  // Borders
  BORDER: '#E5E7EB',

  // Success
  SUCCESS: '#16A34A',
  SUCCESS_LIGHT: '#E6F9F0',

  // Error
  ERROR: '#DC2626',
  ERROR_LIGHT: '#FEE2E2',

  TRANSPARENT: 'rgba(0,0,0,0.2)',
  TRANSPARENT0: 'rgba(0,0,0,0.1)',
  TRANSPARENT1: 'rgba(255,255,255,0.5)',

  BLUE_T: 'rgba(173, 216, 230, 0.2)',
  BLUE_TD: 'rgba(0, 123, 255, 0.3)',

  ORANGE_T: 'rgba(255, 200, 150, 0.2)',
  ORANGE_TD: 'rgba(255, 165, 0, 0.3)',

  GREEN_T: 'rgba(144, 238, 144, 0.2)',
  GREEN_TD: 'rgba(0, 255, 0, 0.3)',

  PURPLE_T: 'rgba(216, 191, 216, 0.2)',
  PURPLE_TD: 'rgba(128, 0, 128, 0.3)',

  GREY_T: 'rgba(64, 64, 64, 0.2)',
  GREY_TD: 'rgba(200, 200, 200, 0.3)',

  RED_T: 'rgba(255, 102, 102, 0.2)',

  blue: ' #0052cc',

  orange: '#ff8c00',
  green: '#006400',
  purple: '#660099',
  grey: '#505050',
  red:"red",
};

export const FONTS = {
  REGULAR: 'OpenSans-Regular',
  MEDIUM: 'OpenSans-Medium',
  SEMIBOLD: 'OpenSans-SemiBold',
  BOLD: 'OpenSans-Bold',
  EXTRABOLD: 'OpenSans-ExtraBold',
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  heading: 28,
  hero: 34,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  BIGGER: 120,
  // xlBIGGER:140,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  round: 999,
};

export const SHADOW = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
};

export const SCREEN = {
  width,
  height,
};
