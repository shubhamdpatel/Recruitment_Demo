import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
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
          source={require('../assets/emp1.png')}
        />
        <Avatar.Image
          style={styles.avatar}
          size={150}
          source={require('../assets/Boss.png')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          style={{...styles.btn, backgroundColor: Color.accent}}
          buttonTitle="Job Seeker"
          onPress={() => {
            navigation.navigate('Login', {
              userType: 'Jober',
            });
          }}
        />

        <AppButton
          style={{...styles.btn}}
          buttonTitle="Employer"
          onPress={() => {
            navigation.navigate('Login', {
              userType: 'Company',
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: Color.white,
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
  avatarContainer: {
    flexDirection: 'row',
    marginVertical: '20%',
    marginTop: '35%',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginVertical: '10%',
    width: '80%',
    justifyContent: 'space-between',
  },
  btn: {
    width: '40%',
    height: Platform.OS === 'android' ? '38%' : '35%',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primary,
    textDecorationLine: 'underline',
  },
});
export default UserSelectScreen;
