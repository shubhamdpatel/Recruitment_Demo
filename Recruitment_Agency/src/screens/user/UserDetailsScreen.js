import React from 'react';
import {Button, Text, View, StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as authAction from '../../redux/actions/auth';
import * as userAction from '../../redux/actions/user';
import Color from '../../constant/Color';
import {Avatar} from 'react-native-paper';

//Icons
import MC from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const UserDetailsScreen = ({navigation}) => {
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
    <View style={{flex: 1}}>
      <View style={styles.imageCard}>
        {user ? (
          <Avatar.Image size={180} source={require('../../assets/boy.png')} />
        ) : (
          <Avatar.Image
            backgroundColor="#e3e3e3"
            size={180}
            // source={(uri = `../../assets/${}`)}
            // source={require('../../assets/company.png')}
          />
        )}
        <Text style={styles.companyName}>
          {user?.firstName}
          {user?.lastName}
        </Text>
      </View>

      <ScrollView>
        <View style={styles.details}>
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
        </View>
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
  companyName: {
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
    fontSize: 16,
  },
});

export default UserDetailsScreen;
