import React from 'react';
import {Button, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const logoutHandeler = () => {
  auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
    });
};

const HomeScreen = () => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Logout"
        onPress={() => {
          logoutHandeler();
        }}
      />
    </View>
  );
};

export default HomeScreen;
