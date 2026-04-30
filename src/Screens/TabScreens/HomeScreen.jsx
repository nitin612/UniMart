import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  COLORS,
  SPACING,
  FONTS,
  RADIUS,
  FONT_SIZES,
} from '../../Constants/theme';
import SearchBar from '../../Components/HomeScreenComponents/SearchBar';
import FilterChips from '../../Components/HomeScreenComponents/FilterChips';
import ProductCard from '../../Components/HomeScreenComponents/ProductCard';
import { Bell } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  fetchUserProfile,
  fetchItems,
  getChats,
} from '../../redux/thunkFunctions/thunkFunctions';
import { useDispatch, useSelector } from 'react-redux';
import CustomLoader from '../../common/CustomLoader';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.items);
  const { data: userData } = useSelector(state => state.profile);

  const dataSaab = data?.items;
  const userName = userData?.name;

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchItems(1));
    dispatch(getChats());
  }, []);

  const handleLoadMore = () => {
    if (!loading && data?.page < data?.totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      dispatch(fetchItems(nextPage));
    }
  };

  const filterData = (dataSaab || []).filter(item => {
    const matchesCategory =
      selectedFilter === 'All' ||
      selectedFilter.toLowerCase() === item.category.toLowerCase();

    const searchItem = item?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
    item.category?.toLowerCase()?.includes(search?.toLowerCase());

    return matchesCategory && searchItem
  });

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greetingText}>
            {' '}
            Hello, {loading ? '...' : userName}!
          </Text>
          <Text style={styles.discoverText}>UniMart discover great deals</Text>
        </View>
        {/* <TouchableOpacity style={styles.notificationBtn}>
          <Bell color={COLORS.PRIMARY_DARK1} size={24} />
          <View style={styles.badge} />
        </TouchableOpacity> */}
      </View>

      <SearchBar value={search} onChangeText={setSearch} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
      </View>
      <FilterChips selected={selectedFilter} onSelect={setSelectedFilter} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured For You</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filterData}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ProductCard item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          loading && page === 1 ? (
            <View style={styles.loaderContainer}>
              <CustomLoader />
            </View>
          ) : (
            <Text style={styles.emptyText}>No items found</Text>
          )
        }
        ListFooterComponent={
          loading && page > 1 ? (
            <View style={{ paddingVertical: 20 }}>
              <CustomLoader />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.BIGGER,
  },
  headerContainer: {
    marginBottom: SPACING.md,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  notificationBtn: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 14,
    width: 8,
    height: 8,
    backgroundColor: COLORS.ERROR,
    borderRadius: RADIUS.round,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  sectionHeader: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.TEXT_PRIMARY,
  },
  row: {
    justifyContent: 'space-between',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 130,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: COLORS.TEXT_SECONDARY,
    fontFamily: FONTS.MEDIUM,
  },
});
