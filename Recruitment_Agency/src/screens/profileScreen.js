import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import UserDetailsScreen from '../screens/user/UserDetailsScreen';
import CompanyDetialsScreen from '../screens/company/companyDetialsScreen';
import {useSelector, useDispatch} from 'react-redux';

const ProfileScreen = () => {
  const userType = useSelector(state => state.auth.user.userType);
  return (
    <View style={{flex: 1}}>
      {userType === 'Company' ? (
        <CompanyDetialsScreen />
      ) : (
        <UserDetailsScreen />
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
