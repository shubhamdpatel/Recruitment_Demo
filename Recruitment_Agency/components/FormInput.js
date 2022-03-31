import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {windowWidth, windowHeight} from '../utils/Dimentions';

const FormInput = ({labelValue, placeholderText, ...props}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={labelValue}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...props}
        style={styles.input}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
