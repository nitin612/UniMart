import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const RootStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
