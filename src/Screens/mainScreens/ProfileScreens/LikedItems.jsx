import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import API from '../../../api/Api';
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  RADIUS,
  SPACING,
  SHADOW,
} from '../../../Constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../../Components/HomeScreenComponents/ProductCard';
import CustomLoader from '../../../common/CustomLoader';
import { useSelector } from 'react-redux';

const LikedItems = () => {
  const navigation = useNavigation();
  const [likedItems, setLikedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: userData } = useSelector(state => state.profile);
  const likedItemIds = userData?.likedItems || [];

  useEffect(() => {
    getLiked();
  }, []);

  useEffect(() => {
    // Sync local list with global liked IDs
    if (likedItems.length > 0) {
      setLikedItems(prev => prev.filter(item => likedItemIds.includes(item._id)));
    }
  }, [likedItemIds]);

  const getLiked = async () => {
    setIsLoading(true);
    try {
      const response = await API.get('/api/likes');
      if (response.status === 200) {
        setLikedItems(response.data);
      }
    } catch (err) {
      console.log('Error fetching liked items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerBackground}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <ArrowLeft size={24} color={COLORS.BACKGROUND} strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Liked Items</Text>
            <Text style={styles.headerSubtitle}>
              {likedItems.length} items you've favorited
            </Text>
          </View>

          <View style={styles.heartBadge}>
            <Heart size={20} color={COLORS.BACKGROUND} fill={COLORS.BACKGROUND} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}

      <FlatList
        data={likedItems}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard item={item} />
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Heart size={40} color={COLORS.TEXT_MUTED} />
              </View>
              <Text style={styles.emptyTitle}>No Liked Items</Text>
              <Text style={styles.emptySubtitle}>
                Items you like will appear here for quick access later.
              </Text>
              <TouchableOpacity
                style={styles.exploreBtn}
                onPress={() => navigation.navigate('HomeScreen')}
              >
                <Text style={styles.exploreBtnText}>Explore Products</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />

      {isLoading && (
        <View style={styles.loaderOverlay}>
          <CustomLoader />
        </View>
      )}
    </View>
  );
};

export default LikedItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    fontSize: FONT_SIZES.xl,
    color: COLORS.BACKGROUND,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: -2,
  },
  heartBadge: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  cardWrapper: {
    flex: 1,
    padding: SPACING.xs,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.INPUT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 14,
    color: COLORS.TEXT_MUTED,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.xxl,
  },
  exploreBtn: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: RADIUS.round,
    ...SHADOW.card,
  },
  exploreBtnText: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: '#FFF',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
