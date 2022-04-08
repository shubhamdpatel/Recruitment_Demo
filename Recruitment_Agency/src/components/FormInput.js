import React from 'react';
import {StyleSheet, View} from 'react-native';
import {windowWidth, windowHeight} from '../utils/Dimentions';
import {TextInput} from 'react-native-paper';
import Color from '../constant/Color';

const FormInput = ({labelText, labelValue, placeholderText, ...props}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        // mode="outlined"
        label={labelText}
        underlineColor={Color.primary}
        value={labelValue}
        numberOfLines={1}
        {...props}
        theme={{colors: {text: Color.primary}}}
        style={styles.input}
      />
      {/* <TextInput
        value={labelValue}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...props}
        style={styles.input}
      /> */}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    fontSize: 18,
  },
});
