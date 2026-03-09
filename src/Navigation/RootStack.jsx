import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const RootStack = () => {
  const [token, setToken] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
      }
    } catch (err) {
      console.error('error occured during login', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
