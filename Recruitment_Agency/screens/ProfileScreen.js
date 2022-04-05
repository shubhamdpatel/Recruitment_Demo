import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as authAction from '../redux/actions/auth';

const ProfileScreen = ({navigation}) => {
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  const logoutHandeler = async () => {
    await dispatch(authAction.logout());
  };

  return (
    <View style={styles.container}>
      <Text>Company Name : {user.email}</Text>
      <Text>Emial : {user.email}</Text>
      <Text>Mobile, {user.email}</Text>
      <Text>About, {user.email}</Text>
      <Text>Address, {user.email}</Text>
      <Text>City, {user.email}</Text>
      <Text>State, {user.email}</Text>
      <Text>Country, {user.email}</Text>
      <Text>Logo, {user.email}</Text>
      <Button
        title="Logout"
        onPress={() => {
          logoutHandeler();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ProfileScreen;
