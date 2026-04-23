import React, { useState, useRef } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Plus, MoreHorizontal, ShieldCheck } from 'lucide-react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  RADIUS,
  SPACING,
} from '../../Constants/theme';

const ChatConversationScreen = ({ navigation, route }) => {
  const { userName, userAvatar } = route?.params || {};
  const flatListRef = useRef();

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey! I saw your post for the Jordan shoes.', sender: 'me', time: '10:30 AM' },
    { id: '2', text: 'Yes, they are still available!', sender: 'seller', time: '10:31 AM' },
    { id: '3', text: 'Great! Can we meet at the Student Union building tomorrow?', sender: 'me', time: '10:32 AM' },
    { id: '4', text: 'Sure, 2 PM works for me. Does that work for you?', sender: 'seller', time: '10:35 AM' },
  ]);

  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
              source={{ uri: userAvatar || 'https://i.pravatar.cc/150?u=unknown' }} 
              style={styles.tinyAvatar} 
            />
            <View style={styles.userMeta}>
              <Text style={styles.userNameText}>{userName || 'Seller'}</Text>
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
    const isMe = item.sender === 'me';

    return (
      <View style={[styles.msgWrapper, isMe ? styles.myMsgWrapper : styles.theirMsgWrapper]}>
        <View style={[
          styles.msgBubble,
          isMe ? styles.myBubbleMinimal : styles.theirBubbleMinimal
        ]}>
          <Text style={[styles.msgText, isMe ? styles.myMsgText : styles.theirMsgText]}>
            {item.text}
          </Text>
          <Text style={[styles.msgTime, isMe ? styles.myMsgTime : styles.theirMsgTime]}>
            {item.time}
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
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.msgListMinimal}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          ListHeaderComponent={
            <View style={styles.minimalSafety}>
               <ShieldCheck size={14} color={COLORS.TEXT_MUTED} />
               <Text style={styles.minimalSafetyText}>Encrypted and secure • Meet in public</Text>
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
            <TouchableOpacity onPress={sendMessage} style={styles.minimalSendBtn}>
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