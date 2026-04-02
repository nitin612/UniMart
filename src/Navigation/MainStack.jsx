import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ProductDetailScreen from '../Screens/mainScreens/ProductDetailScreen';
import EditProfileScreen from '../Screens/mainScreens/EditProfileScreen';
import ChatConversationScreen from '../Screens/mainScreens/ChatConversationScreen';
import MyListingsScreen from '../Screens/mainScreens/MyListingsScreen';
import SellerProfileScreen from '../Screens/mainScreens/SellerProfileScreen';

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="ChatConversationScreen"
        component={ChatConversationScreen}
      />
      <Stack.Screen name="MyListingsScreen" component={MyListingsScreen} />
      <Stack.Screen
        name="SellerProfileScreen"
        component={SellerProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
