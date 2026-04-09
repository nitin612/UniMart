import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/TabScreens/HomeScreen';
import CartScreen from '../Screens/TabScreens/CartScreen';
import ChatScreen from '../Screens/TabScreens/ChatScreen';
import ProfileScreen from '../Screens/TabScreens/ProfileScreen';
import AddProduct from '../Screens/TabScreens/AddProduct';
import {
  House,
  ShoppingCart,
  UserRoundPen,
  MessageSquareMore,
  Plus,
  Heart,
  ShoppingBasket,
} from 'lucide-react-native';
import { COLORS, RADIUS, SPACING } from '../Constants/theme';

const BottomTabs = () => {
  const [focused, setFocused] = useState(false);
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          paddingTop: SPACING.lg,
          borderColor: COLORS.TEXT_MUTED,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <House
              size={24}
              color={
                focused ? COLORS.PRIMARY_DARK1focused : COLORS.PRIMARY_BLACK
              }
              strokeWidth={2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarIcon: () => <ShoppingCart size={25} color="black" strokeWidth={2}/>,
        }}
      />
      <Tab.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: RADIUS.round,
                backgroundColor: COLORS.PRIMARY_DARK1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
                shadowColor: COLORS.PRIMARY_DARK1,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 4,
                elevation: 8,
              }}
            >
              <Plus size={28} color="#fff" strokeWidth={3} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarIcon: () => <MessageSquareMore size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <UserRoundPen size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
