import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/TabScreens/HomeScreen';
import CartScreen from '../Screens/TabScreens/CartScreen';
import ChatScreen from '../Screens/TabScreens/ChatScreen';
import ProfileScreen from '../Screens/TabScreens/ProfileScreen';
import AddProduct from '../Screens/TabScreens/AddProduct';
import BottomTabs from './BottomTabs';

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='BottomTabs'
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;
