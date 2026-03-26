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
} from '../../redux/thunkFunctions/thunkFunctions';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.items);

  const dataSaab = data?.items;

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchUserProfile());
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greetingText}>Hello, Scarlet!</Text>
          <Text style={styles.discoverText}>UniMart discover great deals</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Bell color={COLORS.PRIMARY_DARK1} size={24} />
          <View style={styles.badge} />
        </TouchableOpacity>
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
        data={dataSaab}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ProductCard item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loaderContainer}>
              <LottieView
                source={require('../../assets/animations/loader.json')}
                autoPlay
                loop
                style={{ width: 150, height: 150 }}
              />
            </View>
          ) : (
            <Text style={styles.emptyText}>No items found</Text>
          )
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
