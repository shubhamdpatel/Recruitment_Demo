import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as authAction from '../../redux/actions/auth';
import * as userAction from '../../redux/actions/user';

const ProfileScreen = ({navigation}) => {
  debugger;
  const userType = useSelector(state => state.auth.user.userType);
  const user = useSelector(state => state.user.userProfile[0]);
  console.log('User --->', user);
  debugger;
  const dispatch = useDispatch();
  // Fetch Job
  const fetchUser = async () => {
    await dispatch(userAction.fetchUser());
  };

  React.useEffect(() => {
    fetchUser();
  }, [dispatch]);

  // Logout
  const logoutHandeler = async () => {
    await dispatch(authAction.logout());
  };

  return (
    <View style={styles.container}>
      {userType === 'Company' ? (
        <View>
          <Text style={styles.text}>Company Name : {user?.companyName}</Text>
          <Text style={styles.text}>Email : {user?.email}</Text>
          <Text style={styles.text}>Mobile : {user?.mobile}</Text>
          <Text style={styles.text}>About : {user?.about}</Text>
          <Text style={styles.text}>Address : {user?.address}</Text>
          <Text style={styles.text}>City : {user?.city}</Text>
          <Text style={styles.text}>State : {user?.state}</Text>
          <Text style={styles.text}>Country : {user?.country}</Text>
          <Text style={styles.text}>Logo : {user?.companyLogo}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>
            Name : {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.text}>Email : {user?.email}</Text>
          <Text style={styles.text}>Mobile : {user?.mobile}</Text>
          <Text style={styles.text}>Resume : {user?.resume}</Text>
        </View>
      )}
      <Button
        title="Edit"
        onPress={() => {
          navigation.navigate('Edit Profile');
        }}
      />
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
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  text: {
    margin: 5,
    fontSize: 16,
    color: '#051d5f',
  },
});

export default ProfileScreen;
