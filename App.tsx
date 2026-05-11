import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RootStack from './src/Navigation/RootStack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={true} 
      />
      <RootStack />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
