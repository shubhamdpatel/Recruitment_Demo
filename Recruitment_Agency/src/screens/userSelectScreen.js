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
          style={{...styles.button, backgroundColor: Color.accent}}
          buttonTitle="Job Seeker"
          onPress={() => {
            navigation.navigate('Login', {
              userType: 'Jober',
            });
          }}
        />

        <AppButton
          style={{...styles.button, fontSize: 30}}
          buttonTitle="Employer"
          onPress={() => {
            navigation.navigate('Login', {
              userType: 'Company',
            });
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Login', {
            userType: '',
          })
        }>
        <Text style={styles.text}>Existing User? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  avatar: {
    // flex: 1z,
    backgroundColor: Color.white,
    // justifyContent:'center',
    paddingVertical: '20%',
    marginHorizontal: '5%',
  },
  avatarContainer: {
    flexDirection: 'row',
  },

  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    // flex:1,
    width: '35%',
    height: '30%',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: '10%',
  },
  text: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: Color.primary,
    textDecorationLine: 'underline',
  },
});
export default UserSelectScreen;
