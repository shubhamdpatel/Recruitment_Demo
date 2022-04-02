import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as authAction from '../redux/actions/auth';

const HomeScreen = ({navigation}) => {
  const user = useSelector(state => state.user);
  console.log('user->', user);
  const dispatch = useDispatch();
  // user.length === 0 && navigation.navigate('Login');
  const logoutHandeler = async () => {
    await dispatch(authAction.logout());
  };

  return (
    <View style={{flex: 1}}>
      <Text>Welcome,</Text>
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
