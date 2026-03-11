import React, { useState } from 'react';
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

const DUMMY_PRODUCTS = [
  {
    id: '1',
    title: 'Advanced Engineering Math',
    price: 45.0,
    category: 'TEXTBOOK',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    isFavorite: false,
    type: 'buyable',
    sellerName: 'Alex',
    sellerAvatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    timeAgo: '2h ago',
    condition: 'Used - Good',
  },
  {
    id: '2',
    title: 'iPad Pro M2 2022',
    price: 650.0,
    category: 'ELECTRONICS',
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    isFavorite: true,
    type: 'message',
    sellerName: 'Sam',
    sellerAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    timeAgo: '5h ago',
    condition: 'Like New',
  },
  {
    id: '3',
    title: 'Mini Fridge Black',
    price: 60.0,
    category: 'DORM',
    image:
      'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=800',
    isFavorite: false,
    type: 'message',
    sellerName: 'Jordan',
    sellerAvatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150',
    timeAgo: '1d ago',
    condition: 'Used',
  },
  {
    id: '4',
    title: 'Sony WH-1000XM4',
    price: 180.0,
    category: 'ELECTRONICS',
    image:
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
    isFavorite: false,
    type: 'buyable',
    sellerName: 'Chris',
    sellerAvatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150',
    timeAgo: '3h ago',
    condition: 'Excellent',
  },
];

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greetingText}>Hello, Scarlet!</Text>
          <Text style={styles.discoverText}>Discover great deals</Text>
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
        data={DUMMY_PRODUCTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
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
    fontSize: FONT_SIZES.xxl,
    color: COLORS.PRIMARY_DARK1, // Changed to theme brand color
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
});
