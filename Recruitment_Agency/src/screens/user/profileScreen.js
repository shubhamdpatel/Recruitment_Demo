import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as userAction from '../../redux/actions/user';
import * as authAction from '../../redux/actions/auth';

import {Avatar} from 'react-native-paper';
import ProfileCard from '../../components/profileCard';

const ProfileScreen = ({navigation}) => {
  const user = useSelector(state => state.user.userProfile[0]);
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
    <View style={{flex: 1}}>
      <View style={styles.imageCard}>
        {user?.companyName ? (
          <Avatar.Image
            size={180}
            source={require('../../assets/bosleo.png')}
          />
        ) : (
          <Avatar.Image source={require('../../assets/boy.png')} size={180} />
        )}

        {user?.companyName ? (
          <Text style={styles.name}>{user?.companyName}</Text>
        ) : (
          <Text style={styles.name}>
            {user?.firstName} {user?.lastName}
          </Text>
        )}
      </View>

      <ScrollView>
        {/* <View style={styles.details}>
          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="mail-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Email </Text>
                <Text style={styles.text}>{user?.email}</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="call-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Mobile</Text>
                <Text style={styles.text}>{user?.mobile}</Text>
              </View>
            </View>
          </View>
        </View> */}
        <Text style={styles.text}>Personal Info </Text>
        <ProfileCard
          title="My Profile"
          iconName="chevron-right"
          onPress={() => navigation.navigate('Company Form')}
        />
        <ProfileCard title="My Resume" iconName="chevron-right" />

        {/* <ProfileCard
          title="Account Settings"
          iconName="chevron-right"
          onPress={() => navigation.navigate('Account Setting')}
        /> */}
        <Text style={styles.text}>Account Settings</Text>
        <ProfileCard
          title="Logout"
          iconName="logout"
          delete-outline
          onPress={() => {
            logoutHandeler();
          }}
        />
        <ProfileCard title="Delete My Account" iconName="delete" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageCard: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 8,
    elevation: 5,
    // borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    height: Platform.OS === 'ios' ? '38%' : '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Cochin',
    textAlign: 'center',
  },

  details: {
    flex: 1,
    padding: '5%',
  },
  element: {
    marginVertical: 10,
  },
  textHeading: {
    fontSize: 16,
    fontWeight: '700',
  },
  text: {
    padding: 20,
    fontSize: 18,
  },
});

export default ProfileScreen;
