import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {windowWidth, windowHeight} from '../utils/Dimentions';

const FormButton = ({buttonTitle, ...props}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...props}>
      <Text style={styles.button}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
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
