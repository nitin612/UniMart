import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {
  Heart,
  Clock,
  Tag,
  ArrowLeft,
  MoreVertical,
  Edit3,
  Trash2,
} from 'lucide-react-native';
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
import API from '../../api/Api';
import { useDispatch } from 'react-redux';
import {
  fetchUserProfile,
  fetchItems,
} from '../../redux/thunkFunctions/thunkFunctions';
import CustomLoader from '../../common/CustomLoader';

const MyListingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { listingsData } = route?.params || {};
  const listingCount = listingsData?.length || 0;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async itemId => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsLoading(true);
            const response = await API.delete(`api/items/${itemId}`);
            if (response.status === 200 || response.status === 204) {
              setIsLoading(false);
              dispatch(fetchUserProfile());
              dispatch(fetchItems());
              navigation.goBack();
            }
          } catch (err) {
            console.warn('unable to delete', err);
            Alert.alert('Error', 'Something went wrong while deleting.');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cardContent}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('MyListingPreviewScreen', { item })
          }
        >
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item.imageUrls[0] }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            {item.isSold && (
              <View style={styles.soldOverlay}>
                <Text style={styles.soldBadgeText}>SOLD</Text>
              </View>
            )}
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.categoryLabel}>{item.category}</Text>
              <Text style={styles.itemDate}>
                {new Date(item.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>

            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </Text>

            <View style={styles.priceRow}>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
              <View style={styles.likesBadge}>
                <Heart size={10} color={COLORS.ERROR} fill={COLORS.ERROR} />
                <Text style={styles.likesCount}>{item.likesCount || 0}</Text>
              </View>
            </View>

            <View style={styles.actionToolbar}>
              <TouchableOpacity
                style={styles.actionIconBtn}
                onPress={() =>
                  navigation.navigate('EditProductScreen', { item })
                }
              >
                <Edit3 size={16} color={COLORS.TEXT_SECONDARY} />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.actionDivider} />
              <TouchableOpacity
                style={styles.actionIconBtn}
                onPress={() => handleDelete(item._id)}
              >
                <Trash2 size={16} color={COLORS.ERROR} />
                <Text style={[styles.actionText, { color: COLORS.ERROR }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
              <Text style={styles.headerTitle}>My Listings</Text>
              <Text style={styles.headerSubtitle}>
                Managing {listingCount} active items
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <FlatList
        data={listingsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Heart
              size={40}
              color={COLORS.TEXT_MUTED}
              strokeWidth={1}
              style={{ marginBottom: 12 }}
            />
            <Text style={styles.emptyText}>
              You haven't listed anything yet
            </Text>
            <TouchableOpacity
              style={styles.listBtn}
              onPress={() => navigation.navigate('AddProduct')}
            >
              <Text style={styles.listBtnText}>Post a Listing</Text>
            </TouchableOpacity>
          </View>
        }
      />
      {isLoading ? (
        <View style={styles.overLay}>
          <CustomLoader />
        </View>
      ) : null}
    </View>
  );
};

export default MyListingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  headerBackground: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    borderBottomLeftRadius: RADIUS.lg,
    borderBottomRightRadius: RADIUS.lg,
    paddingBottom: SPACING.md,
    ...SHADOW.card,
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
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
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
    fontSize: FONT_SIZES.xs + 1,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 0,
  },
  listContainer: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
    ...SHADOW.card,
    shadowOpacity: 0.05,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: SPACING.md,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.INPUT_BACKGROUND,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  soldOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soldBadgeText: {
    color: '#FFF',
    fontFamily: FONTS.EXTRABOLD,
    fontSize: 10,
    letterSpacing: 1,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryLabel: {
    fontFamily: FONTS.BOLD,
    fontSize: 9,
    color: COLORS.PRIMARY_DARK1,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemDate: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 10,
    color: COLORS.TEXT_MUTED,
  },
  itemTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  itemPrice: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.PRIMARY_DARK1,
  },
  likesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.INPUT_BACKGROUND,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.round,
    gap: 4,
  },
  likesCount: {
    fontFamily: FONTS.BOLD,
    fontSize: 10,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 1,
  },
  actionToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: COLORS.INPUT_BACKGROUND,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: RADIUS.md,
  },
  actionIconBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  actionDivider: {
    width: 1,
    height: 14,
    backgroundColor: COLORS.TEXT_MUTED,
    opacity: 0.3,
  },
  actionText: {
    fontFamily: FONTS.BOLD,
    fontSize: 11,
    color: COLORS.TEXT_SECONDARY,
  },
  emptyContainer: {
    paddingTop: 120,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_MUTED,
    textAlign: 'center',
    marginBottom: 20,
  },
  listBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: RADIUS.round,
  },
  listBtnText: {
    color: '#FFF',
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
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
