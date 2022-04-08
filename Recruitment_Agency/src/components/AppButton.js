import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {windowWidth, windowHeight} from '../utils/Dimentions';
import {Button} from 'react-native-paper';

const AppButton = ({buttonTitle, ...props}) => {
  return (
    <Button
      style={styles.buttonContainer}
      mode="contained"
      uppercase={false}
      {...props}>
      {buttonTitle}
    </Button>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
  },
});
