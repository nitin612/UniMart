import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Heart, ArrowLeft, Edit3, Trash2 } from 'lucide-react-native';
import {
  COLORS,
  SPACING,
  RADIUS,
  FONTS,
  SHADOW,
  FONT_SIZES,
} from '../../Constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';

const MyListingPreviewScreen = ({ route }) => {
  const navigation = useNavigation();
  const { width: windowWidth } = useWindowDimensions();
  const { item } = route?.params || {};
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  
  if (!item) {
      return null;
  }

  const cardWidth = windowWidth - SPACING.lg * 2;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerBackground}>
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <ArrowLeft
                size={24}
                color={COLORS.BACKGROUND}
                strokeWidth={2.5}
              />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Listing Preview</Text>
              <Text style={styles.headerSubtitle} numberOfLines={1}>
                Reviewing "{item.title}"
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.absoluteContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>₹{item.price.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Set Price</Text>
          </View>
          <View style={styles.vDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{item.likesCount}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.vDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{item.category || 'Other'}</Text>
            <Text style={styles.statLabel}>Category</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.previewContent}>
            <View style={styles.fullImageWrapper}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={e => {
                  const slide = Math.round(
                    e.nativeEvent.contentOffset.x / cardWidth,
                  );
                  setActiveImageIndex(slide);
                }}
              >
                {item.imageUrls.map((url, index) => (
                  <Image
                    key={index}
                    source={{ uri: url }}
                    style={[styles.fullImage, { width: cardWidth }]}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>

              {item.imageUrls.length > 1 && (
                <View style={styles.imageCountBadge}>
                  <Text style={styles.imageCountText}>
                    {activeImageIndex + 1} of {item.imageUrls.length}
                  </Text>
                </View>
              )}

              {item.isSold && (
                <View style={styles.soldOverlay}>
                  <Text style={styles.soldBadgeText}>SOLD</Text>
                </View>
              )}
            </View>

            <View style={styles.previewDetails}>
              <View style={styles.badgeRow}>
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryPillText}>{item.category}</Text>
                </View>
                <Text style={styles.dateLabel}>
                  Posted {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>

              <Text style={styles.largeTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>

              <View style={styles.metaDivider} />

              {/* <View style={styles.actionRow}>
                <TouchableOpacity style={styles.editBtn}>
                  <Edit3 size={18} color="#FFF" />
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn}>
                  <Trash2 size={18} color={COLORS.ERROR} />
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.primaryBtnText}>Back to Inventory</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default MyListingPreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerBackground: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: SPACING.xl + 20,
    ...SHADOW.card,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: SPACING.lg,
  },
  headerTitle: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.xxl,
    color: COLORS.BACKGROUND,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: -2,
  },
  absoluteContainer: {
    position: 'absolute',
    top: 145,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.BACKGROUND,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.card,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: 15,
    color: COLORS.PRIMARY_DARK1,
  },
  statLabel: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 8,
    color: COLORS.TEXT_MUTED,
    textTransform: 'uppercase',
  },
  vDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.BORDER,
  },
  scrollContainer: {
    paddingTop: 50,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: COLORS.BACKGROUND,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOW.card,
    overflow: 'hidden',
  },
  previewContent: {
    width: '100%',
  },
  fullImageWrapper: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.INPUT_BACKGROUND,
    position: 'relative',
  },
  fullImage: {
    height: '100%',
  },
  imageCountBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    right: SPACING.md,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.round,
    zIndex: 10,
  },
  imageCountText: {
    color: '#FFF',
    fontFamily: FONTS.BOLD,
    fontSize: 10,
  },
  previewDetails: {
    padding: SPACING.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryPill: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
  },
  categoryPillText: {
    color: COLORS.PRIMARY_DARK1,
    fontFamily: FONTS.BOLD,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  dateLabel: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 11,
    color: COLORS.TEXT_MUTED,
  },
  largeTitle: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.xl,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  itemDescription: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  metaDivider: {
    height: 1,
    backgroundColor: COLORS.BORDER,
    marginBottom: SPACING.lg,
    opacity: 0.5,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  editBtn: {
    flex: 1.5,
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY_DARK1,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...SHADOW.card,
    shadowColor: COLORS.PRIMARY_DARK1,
    shadowOpacity: 0.3,
  },
  editBtnText: {
    fontFamily: FONTS.BOLD,
    fontSize: 14,
    color: '#FFF',
  },
  deleteBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#FEE2E2',
  },
  deleteBtnText: {
    fontFamily: FONTS.BOLD,
    fontSize: 14,
    color: COLORS.ERROR,
  },
  primaryBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    marginHorizontal: SPACING.lg,
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    marginTop: SPACING.md,
    ...SHADOW.card,
    shadowColor: COLORS.PRIMARY_DARK1,
    shadowOpacity: 0.2,
  },
  primaryBtnText: {
    color: '#FFF',
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
  },
});
