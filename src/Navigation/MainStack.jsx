import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ProductDetailScreen from '../Screens/mainScreens/ProductDetailScreen';

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
    </Stack.Navigator>
  );
};

export default MainStack;
