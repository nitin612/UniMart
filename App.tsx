import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthStack from './src/Navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/Navigation/RootStack';

const App = () => {
  return (
  <RootStack />
  );
};

export default App;

const styles = StyleSheet.create({});
