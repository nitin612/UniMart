import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../redux/slices/authSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = () => {
  const Stack = createNativeStackNavigator();
  const { token, isUserValid } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('token');

      if (savedToken) {
        dispatch(logIn(savedToken));
      }
    } catch (err) {
      console.error('error occurred during login', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isUserValid ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <Stack.Screen name="MainStack" component={MainStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
