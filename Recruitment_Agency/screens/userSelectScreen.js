import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {windowWidth, windowHeight} from '../utils/Dimentions';

const UserSelectScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('Login', {
            userType: 'Jober',
          });
        }}>
        <Text style={styles.button}>Jober</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('Login', {
            userType: 'Company',
          });
        }}>
        <Text style={styles.button}>Company</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#2e64e5',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
export default UserSelectScreen;
