import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import {useDispatch} from 'react-redux';

import * as authAction from '../../redux/actions/auth';

const RegisterScreen = ({navigation, route}) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setconfirmPassword] = React.useState(null);

  const {userType} = route.params;
  const dispatch = useDispatch();

  const registerUser = async () => {
    await dispatch(authAction.signUp(email, password, userType));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{userType} Register Here</Text>

      <FormInput
        labelValue={email}
        onChangeText={emailId => setEmail(emailId)}
        placeholderText="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={confirmPassword => setconfirmPassword(confirmPassword)}
        placeholderText="Confirm Password"
        secureTextEntry={true}
      />

      <FormButton buttonTitle="Register" onPress={() => registerUser()} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Login', {
            userType,
          })
        }>
        <Text style={{color: 'blue'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
});
export default RegisterScreen;
