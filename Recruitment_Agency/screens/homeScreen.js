import React from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authAction from '../redux/actions/auth';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const logoutHandeler = async () => {
    await dispatch(authAction.logout());
  };

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
