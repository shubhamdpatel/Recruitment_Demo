import React from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation, route}) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const {userType} = route.params;

  const loginHandler = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('SignIn');
      })
      .catch(e => {
        console.log('Login Error', e);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Here</Text>

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

      <FormButton buttonTitle="Login" onPress={() => loginHandler()} />

      <Text>You Don't Have An Account ?</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Register', {
            userType,
          })
        }>
        <Text style={{color: 'blue'}}>Create Account</Text>
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
export default LoginScreen;
