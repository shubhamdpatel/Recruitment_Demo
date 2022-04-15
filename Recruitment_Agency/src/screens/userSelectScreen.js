import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import Color from '../constant/Color';
import {windowWidth, windowHeight} from '../utils/Dimentions';
import AppButton from '../components/AppButton';
const UserSelectScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          style={styles.avatar}
          size={150}
          source={require('../assets/boy.png')}
        />
        <Avatar.Image
          style={styles.avatar}
          size={150}
          source={require('../assets/boy.png')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          style={{backgroundColor: Color.accent}}
          buttonTitle="Job Seeker"
          onPress={() => {
            navigation.navigate('Login', {
              userType: 'Jober',
            });
          }}
        />

        <AppButton
          buttonTitle="Employer"
          onPress={() => {
            navigation.navigate('Login', {
              userType: 'Company',
            });
          }}
        />
      </View>

      {/* <TouchableOpacity
        onPress={() =>
          navigation.navigate('Login', {
            userType: '',
          })
        }>
        <Text style={styles.text}>Existing User? Login</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    // flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'center',
    // paddingVertical: '20%',
    marginHorizontal: '5%',
  },
  avatarContainer: {
    flexDirection: 'row',
    marginVertical: '10%',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginVertical: '10%',
    width: '80%',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primary,
    textDecorationLine: 'underline',
  },
});
export default UserSelectScreen;
