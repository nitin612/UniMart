import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const CustomLoader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('../assets/animations/loader2.json')}
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({});
