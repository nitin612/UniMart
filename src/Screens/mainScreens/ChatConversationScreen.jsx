import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Send,
  Plus,
  MoreHorizontal,
  ShieldCheck,
} from 'lucide-react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  RADIUS,
  SPACING,
} from '../../Constants/theme';
import { io, Socket } from 'socket.io-client';
import API from '../../api/Api';
import { useSelector } from 'react-redux';

const ChatConversationScreen = ({ navigation, route }) => {
  const { sellerId, tittle, itemId, image } = route?.params || {};
  const flatListRef = useRef();

  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState('');
  const [input, setInput] = useState('');
  const { data } = useSelector(state => state.profile);
  const currentUserID = data?._id;
  const [isLoading ,setIsLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setIsLoading(true);
        const res = await API.post('api/chats', {
          userId: sellerId,
          itemId: itemId,
        });
        setChatId(res?.data?._id);

        const messgaeRes = await API.get(
          `api/chats/${res?.data?._id}/messages`,
        );
        setMessages(messgaeRes?.data);
        Socket.current = io('https://my-uni-mart.onrender.com');

        Socket.current.emit('join_chat', res.data._id);

        Socket.current.on('receive_message', newMessage => {
          setMessages(prev => [...prev, newMessage]);
        });

        console.log(messgaeRes, 'kjhgjfhg');
      } catch (err) {
        console.log('errrrrrrrrr', err);
      }finally{
        setIsLoading(false);
      }
    };
    run();

    // Cleanup on unmount
    return () => {
      if (Socket.current) Socket.current.disconnect();
    };
  }, []);

  // const sendMessage = () => {
  //   if (input.trim() === '') return;

  //    const newMessage = {
  //     id: Date.now().toString(),
  //     text: input,
  //     sender: 'me',
  //     time: new Date().toLocaleTimeString([], {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //     }),
  //   };

  //   setMessages(prev => [...prev, newMessage]);
  //   setInput('');

  //   setTimeout(() => {
  //     flatListRef.current?.scrollToEnd({ animated: true });
  //   }, 100);
  // };

  const sendMessage = () => {
    if (input.trim() && chatId) {
      const messageData = {
        chatId: chatId,
        senderId: currentUserID,
        content: input,
      };

      Socket.current.emit('send_message', messageData);
      setInput('');
    }
  };
  const currentUserId = currentUserID;
  const formatTime = date => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderHeader = () => (
    <View style={styles.whiteHeader}>
      <SafeAreaView edges={['top']}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.userProfile} activeOpacity={0.7}>
            <Image
              source={{
                uri:
                  image ||
                  'https://images.unsplash.com/photo-1773332611522-06b86b48cbf1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={styles.tinyAvatar}
            />
            <View style={styles.userMeta}>
              <Text style={styles.userNameText}>{tittle || 'Seller'}</Text>
              <Text style={styles.statusText}>Active now</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moreButton}>
            <MoreHorizontal size={22} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

  const renderMessage = ({ item }) => {
    const isMe = item.sender._id === currentUserId;

    return (
      <View
        style={[
          styles.msgWrapper,
          isMe ? styles.myMsgWrapper : styles.theirMsgWrapper,
        ]}
      >
        <View
          style={[
            styles.msgBubble,
            isMe ? styles.myBubbleMinimal : styles.theirBubbleMinimal,
          ]}
        >
          <Text
            style={[
              styles.msgText,
              isMe ? styles.myMsgText : styles.theirMsgText,
            ]}
          >
            {item.content}
          </Text>

          <Text
            style={[
              styles.msgTime,
              isMe ? styles.myMsgTime : styles.theirMsgTime,
            ]}
          >
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </View>
    
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      {renderHeader()}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.msgListMinimal}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: false })
          }
          ListHeaderComponent={
            <View style={styles.minimalSafety}>
              <ShieldCheck size={14} color={COLORS.TEXT_MUTED} />
              <Text style={styles.minimalSafetyText}>
                Encrypted and secure • Meet in public
              </Text>
            </View>
          }
        />

        <View style={styles.minimalInputArea}>
          <TouchableOpacity style={styles.plusBtn}>
            <Plus size={22} color={COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>

          <View style={styles.inputFieldBox}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Message..."
              placeholderTextColor={COLORS.TEXT_MUTED}
              style={styles.textInputMinimal}
              multiline
            />
          </View>

          {input.trim().length > 0 && (
            <TouchableOpacity
              onPress={sendMessage}
              style={styles.minimalSendBtn}
            >
              <Send size={20} color={COLORS.PRIMARY_DARK1} />
            </TouchableOpacity>
          )}
        </View>
        <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fff' }} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatConversationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  whiteHeader: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  backButton: {
    padding: 8,
  },
  userProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  tinyAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  userMeta: {
    marginLeft: SPACING.sm,
  },
  userNameText: {
    fontFamily: FONTS.BOLD,
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
  },
  statusText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 10,
    color: COLORS.SUCCESS,
  },
  moreButton: {
    padding: 8,
  },
  minimalSafety: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    gap: 6,
    opacity: 0.6,
  },
  minimalSafetyText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 11,
    color: COLORS.TEXT_MUTED,
  },
  msgListMinimal: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  msgWrapper: {
    marginBottom: SPACING.md,
    maxWidth: '80%',
  },
  myMsgWrapper: {
    alignSelf: 'flex-end',
  },
  theirMsgWrapper: {
    alignSelf: 'flex-start',
  },
  msgBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  myBubbleMinimal: {
    backgroundColor: COLORS.PRIMARY_DARK1,
    borderBottomRightRadius: 4,
  },
  theirBubbleMinimal: {
    backgroundColor: '#F0F2F5',
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    lineHeight: 20,
  },
  myMsgText: {
    color: '#FFFFFF',
  },
  theirMsgText: {
    color: COLORS.TEXT_PRIMARY,
  },
  msgTime: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 9,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myMsgTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  theirMsgTime: {
    color: COLORS.TEXT_MUTED,
  },
  minimalInputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  plusBtn: {
    padding: 10,
  },
  inputFieldBox: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    maxHeight: 100,
    justifyContent: 'center',
  },
  textInputMinimal: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
    paddingVertical: Platform.OS === 'ios' ? 8 : 6,
  },
  minimalSendBtn: {
    padding: 10,
  },
});
