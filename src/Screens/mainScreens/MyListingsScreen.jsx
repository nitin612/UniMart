import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const MyListingsScreen = ({ route }) => {
  const { listingsData } = route?.params || {};

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.imageUrls[0] }} style={styles.image} />

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{item.category}</Text>
            <Text style={styles.metaText}>{item.condition}</Text>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.likes}>❤️ {item.likesCount}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>

          {item.isSold && (
            <View style={styles.soldBadge}>
              <Text style={styles.soldText}>SOLD</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listingsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default MyListingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 180,
  },

  content: {
    padding: 12,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },

  description: {
    marginTop: 6,
    fontSize: 13,
    color: '#666',
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  metaText: {
    fontSize: 12,
    color: '#888',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },

  likes: {
    fontSize: 13,
    color: '#e74c3c',
  },

  date: {
    fontSize: 11,
    color: '#999',
  },

  soldBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  soldText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});