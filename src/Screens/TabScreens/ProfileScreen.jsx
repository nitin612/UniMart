import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../Constants/theme';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.UpperContainer}>
      </View>
      <View style={styles.BottomContainer}></View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  UpperContainer: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  BottomContainer: {
    flex: 2,
    backgroundColor: 'yellow',
  },
});
