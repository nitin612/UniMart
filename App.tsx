import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RootStack from './src/Navigation/RootStack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
