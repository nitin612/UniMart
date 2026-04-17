import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import API from '../../../api/Api';

const LikedItems = () => {
  useEffect(() => {
    getLiked();
  }, []);

  const getLiked = async () => {
    try {
      const response = API.get('/api/likes');
      console.log('liked itemsm', response);
      return response;
    } catch (err) {
      console.log('err', err);
    }
  };
  return (
    <View>
      <Text>LikedItems</Text>
    </View>
  );
};

export default LikedItems;

const styles = StyleSheet.create({});
