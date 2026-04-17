import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Briefcase,
  Calendar,
  Linkedin,
  Instagram,
  UserCheck,
  UserPlus,
  Package,
  Star,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import CustomLoader from '../../common/CustomLoader';
import { fetchUserDetails } from '../../redux/thunkFunctions/thunkFunctions';
import {
  COLORS,
  FONT_SIZES,
  FONTS,
  SCREEN,
  SPACING,
} from '../../Constants/theme';
import {
  followUser,
  getFollowers,
  getFollowing,
} from '../../redux/thunkFunctions/thunkFunctions';

const UserDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const id = route?.params?.id;
  const dispatch = useDispatch();
  const { data: userData } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, [id, dispatch]);

  const { data, loading } = useSelector(state => state.userDetails);
  const userId = data?._id;
  const [isFollow, setIsFollow] = useState(
    userData?.following.some(p => p.item === userId),
  );

  const {
    data: followData,
    followers,
    following,
    loading: followLoading,
    error,
  } = useSelector(state => state.follow);

  const handleFollow = () => {
    const newFollow = !isFollow;
    setIsFollow(newFollow);
    dispatch(followUser(userId));
    console.log('Follow handled');
  };

  const renderListingItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.push('SellerProductDetailScreen', { item })}
      style={styles.productCard}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrls[0] }} style={styles.productImg} />
        <View style={styles.conditionBadge}>
          <Text style={styles.conditionText}>{item.condition}</Text>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text numberOfLines={1} style={styles.productTitle}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderCenter}>
        <CustomLoader />
      </View>
    );
  }

  const ListHeader = () => (
    <View>
      {/* PROFILE INFO SECTION */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarInner}>
            <Image source={{ uri: data?.avatar }} style={styles.avatar} />
          </View>
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.name}>{data?.name}</Text>
          <View style={styles.ratingRow}>
            <Star
              size={16}
              color={COLORS.PRIMARY_DARK1}
              fill={COLORS.PRIMARY_DARK1}
            />
            <Text style={styles.ratingText}>
              {data?.ratingScore?.toFixed(1) || '0.0'}
            </Text>
          </View>
          {(data?.university || data?.campusLocation) && (
            <View style={styles.locationContainer}>
              <MapPin size={14} color={COLORS.TEXT_SECONDARY} />
              <Text style={styles.locationText}>
                {data?.university} {data?.campusLocation}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.bio}>{data?.bio || 'No bio provided'}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.followBtn,
              isFollow ? styles.followingBtn : styles.followBtnPrimary,
            ]}
            onPress={handleFollow}
          >
            {isFollow ? (
              <UserCheck size={18} color={COLORS.PRIMARY_DARK1} />
            ) : (
              <UserPlus size={18} color="#FFF" />
            )}
            <Text
              style={[
                styles.followText,
                {
                  color: isFollow ? COLORS.PRIMARY_DARK1 : '#FFF',
                },
              ]}
            >
              {isFollow ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>

          <View style={styles.socialRow}>
            {data?.socialLinks?.linkedin ? (
              <TouchableOpacity style={styles.socialIcon}>
                <Linkedin size={20} color={COLORS.PRIMARY_DARK1} />
              </TouchableOpacity>
            ) : null}
            {data?.socialLinks?.instagram ? (
              <TouchableOpacity style={styles.socialIcon}>
                <Instagram size={20} color={COLORS.PRIMARY_DARK1} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>

      {/* STATS BOARD */}
      <View style={styles.statsBoard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{data?.listings?.length || 0}</Text>
          <Text style={styles.statLabel}>Listings</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{data?.followersCount || 0}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{data?.followingCount || 0}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* ABOUT SECTION */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>About Seller</Text>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <View style={styles.infoIconBox}>
            <Briefcase size={20} color={COLORS.PRIMARY_DARK1} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>Dept.</Text>
            <Text numberOfLines={1} style={styles.infoValue}>
              {data?.department || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconBox}>
            <GraduationCap size={20} color={COLORS.PRIMARY_DARK1} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>Major</Text>
            <Text numberOfLines={1} style={styles.infoValue}>
              {data?.major || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconBox}>
            <Calendar size={20} color={COLORS.PRIMARY_DARK1} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>Year</Text>
            <Text numberOfLines={1} style={styles.infoValue}>
              {data?.yearOfStudy || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconBox}>
            <Package size={20} color={COLORS.PRIMARY_DARK1} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>Sold</Text>
            <Text numberOfLines={1} style={styles.infoValue}>
              {data?.itemsSoldCount || 0} Items
            </Text>
          </View>
        </View>
      </View>

      {/* LISTINGS SECTION */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Listings</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{data?.listings?.length || 0}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.BACKGROUND_LIGHT}
      />
      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color={COLORS.PRIMARY_BLACK} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Seller Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={data?.listings}
          keyExtractor={item => item._id}
          renderItem={renderListingItem}
          ListHeaderComponent={ListHeader}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No listings yet</Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  safeArea: {
    flex: 1,
  },
  loaderCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_BLACK,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.BIGGER,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  avatarWrapper: {
    padding: 4,
    borderRadius: SCREEN.width * 0.15 + 8,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_DARK1,
    shadowColor: COLORS.PRIMARY_DARK1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarInner: {
    padding: 2,
    borderRadius: SCREEN.width * 0.15 + 4,
    backgroundColor: COLORS.BACKGROUND,
  },
  avatar: {
    width: SCREEN.width * 0.3,
    height: SCREEN.width * 0.3,
    borderRadius: SCREEN.width * 0.15,
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  name: {
    fontSize: FONT_SIZES.xxl,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_BLACK,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_DARK1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  locationText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  bio: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.REGULAR,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  followBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    gap: 8,
    minWidth: 140,
  },
  followBtnPrimary: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    shadowColor: COLORS.PRIMARY_DARK1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  followingBtn: {
    backgroundColor: COLORS.BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY_DARK1,
  },
  followText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.BOLD,
  },
  socialRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  statsBoard: {
    flexDirection: 'row',
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 20,
    paddingVertical: SPACING.lg,
    marginVertical: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_BLACK,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.TEXT_MUTED,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: COLORS.BORDER,
    alignSelf: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    gap: 8,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_BLACK,
  },
  countBadge: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_DARK1,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  infoCard: {
    width: (SCREEN.width - SPACING.lg * 2 - SPACING.md) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    padding: SPACING.md,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.TEXT_MUTED,
  },
  infoValue: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.PRIMARY_BLACK,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  productCard: {
    width: (SCREEN.width - SPACING.lg * 2 - SPACING.md) / 2,
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  productImg: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.INPUT_BACKGROUND,
  },
  conditionBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  conditionText: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: FONTS.BOLD,
  },
  productInfo: {
    padding: SPACING.md,
  },
  productTitle: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.PRIMARY_BLACK,
  },
  productPrice: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY_DARK1,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: SPACING.BIGGER,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.TEXT_MUTED,
  },
});

export default UserDetailScreen;
