import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ProfileCard from '../../components/profileCard';
import * as authAction from '../../redux/actions/auth';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const AccountSettingScreen = () => {
  const dispatch = useDispatch();
  // Logout
  const logoutHandeler = async () => {
    await dispatch(authAction.logout());
  };

  return (
    <View style={{marginTop: 20}}>
      <ProfileCard
        title="Logout"
        iconName="logout"
        delete-outline
        onPress={() => {
          logoutHandeler();
        }}
      />
      <ProfileCard title="Delete My Account" iconName="delete" />
    </View>
  );
};

const styles = StyleSheet.create({});
export default AccountSettingScreen;
