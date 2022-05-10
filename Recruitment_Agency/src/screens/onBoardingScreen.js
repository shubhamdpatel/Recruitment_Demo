import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {Avatar} from 'react-native-paper';
import Color from '../constant/Color';
import AppButton from '../components/AppButton';

const OnBoardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          style={styles.avatar}
          size={150}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/recruitment-agency-e0465.appspot.com/o/images%2Fdefault%2Femp.png?alt=media&token=2a121d43-fc46-43a0-a74c-faeabfd15806',
          }}
        />
        <Avatar.Image
          style={styles.avatar}
          size={150}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/recruitment-agency-e0465.appspot.com/o/images%2Fdefault%2FBoss.png?alt=media&token=ce49f2e6-99e7-463b-ab0c-0fc12012e113',
          }}
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

export default OnBoardingScreen;
