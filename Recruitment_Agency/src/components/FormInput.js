import React from 'react';
import {StyleSheet, View} from 'react-native';
import {windowWidth, windowHeight} from '../utils/Dimentions';
import {TextInput} from 'react-native-paper';
import Color from '../constant/Color';

const FormInput = ({labelText, labelValue, placeholderText, ...props}) => {
  const {} = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        // mode="outlined"
        label={labelText}
        underlineColor={Color.primary}
        value={labelValue}
        numberOfLines={1}
        placeholder={placeholderText}
        {...props}
        style={styles.input}
      />
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
    fontSize: 17,
  },
});
