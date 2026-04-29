import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  MessageSquare,
  Edit3,
  ChevronRight,
} from 'lucide-react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  RADIUS,
  SPACING,
  SHADOW,
} from '../../Constants/theme';
import { useSelector } from 'react-redux';

const ChatScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error } = useSelector(state => state.chat);
  const users = data;

  // const users = [
  //   {
  //     id: '1',
  //     name: 'John Doe',
  //     lastMessage: 'Hey, is this still available for pick up?',
  //     time: '10:30 AM',
  //     avatar: 'https://i.pravatar.cc/150?u=1',
  //     unread: 2,
  //   },
  //   {
  //     id: '2',
  //     name: 'Sarah Smith',
  //     lastMessage: 'Thanks! I will meet you at the library.',
  //     time: 'Yesterday',
  //     avatar: 'https://i.pravatar.cc/150?u=2',
  //     unread: 0,
  //   },
  //   {
  //     id: '3',
  //     name: 'Mike Johnson',
  //     lastMessage: 'I will buy it. Is ₹500 okay?',
  //     time: '2 days ago',
  //     avatar: 'https://i.pravatar.cc/150?u=3',
  //     unread: 0,
  //   },
  //   {
  //     id: '4',
  //     name: 'Amit Kumar',
  //     lastMessage: 'Can you share more photos of the item?',
  //     time: '3 days ago',
  //     avatar: 'https://i.pravatar.cc/150?u=4',
  //     unread: 1,
  //   },
  // ];

  const filteredUsers = users.filter(user =>
    user?.item?.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const openChat = user => {
    navigation.navigate('ChatConversationScreen', {
      sellerId: user.participants[1]?._id,
      tittle:user.item?.title,
      userName: user?.otherParticipant?.name,
    });
  };

  const renderHeader = () => (
    <View style={styles.whiteHeader}>
      <SafeAreaView edges={['top']}>
        <View style={styles.headerRow}>
          <Text style={styles.minimalTitle}>Messages</Text>
          <TouchableOpacity style={styles.iconCircle}>
            <Edit3 size={20} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
        </View>

        <View style={styles.minimalSearchContainer}>
          <View style={styles.minimalSearchBar}>
            <Search size={18} color={COLORS.TEXT_MUTED} />
            <TextInput
              placeholder="Search conversations..."
              placeholderTextColor={COLORS.TEXT_MUTED}
              style={styles.minimalSearchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.minimalChatCard}
      activeOpacity={0.6}
      onPress={() => openChat(item)}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.otherParticipant?.avatar || "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg" }} style={styles.minimalAvatar} />
        {item.unread > 0 && <View style={styles.unreadDot} />}
      </View>

      <View style={styles.minimalChatInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.minimalUserName} numberOfLines={1}>
            {item.otherParticipant?.name}
          </Text>
          <Text
            style={[
              styles.minimalTime,
              item.unread > 0 && {
                color: COLORS.PRIMARY_DARK1,
                fontFamily: FONTS.BOLD,
              },
            ]}
          >
         {new Date(item?.createdAt).toLocaleDateString("en-GB")}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text
            style={[
              styles.minimalLastMessage,
              item.unread > 0 && styles.boldMessage,
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.minimalUnreadBadge}>
              <Text style={styles.minimalUnreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {renderHeader()}

      <FlatList
        data={filteredUsers}
        keyExtractor={(item,index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.minimalList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.minimalEmpty}>
            <MessageSquare size={48} color={COLORS.BORDER} strokeWidth={1.5} />
            <Text style={styles.emptyLabel}>Your inbox is empty</Text>
          </View>
        }
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  whiteHeader: {
    backgroundColor: '#FFFFFF',
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  minimalTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 24,
    color: COLORS.TEXT_PRIMARY,
    letterSpacing: -0.5,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minimalSearchContainer: {
    paddingHorizontal: SPACING.xl,
  },
  minimalSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 44,
  },
  minimalSearchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontFamily: FONTS.MEDIUM,
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  minimalList: {
    paddingTop: SPACING.md,
    paddingBottom: 100,
  },
  minimalChatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  minimalAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F0F0F0',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARY_DARK1,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  minimalChatInfo: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  minimalUserName: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  minimalTime: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 11,
    color: COLORS.TEXT_MUTED,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  minimalLastMessage: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    flex: 1,
    marginRight: SPACING.md,
  },
  boldMessage: {
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  minimalUnreadBadge: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  minimalUnreadText: {
    fontFamily: FONTS.BOLD,
    fontSize: 10,
    color: '#FFFFFF',
  },
  minimalEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150,
  },
  emptyLabel: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 14,
    color: COLORS.TEXT_MUTED,
    marginTop: SPACING.sm,
  },
});
