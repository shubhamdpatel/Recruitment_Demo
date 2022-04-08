import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import {useSelector, useDispatch} from 'react-redux';
import * as authAction from '../../redux/actions/auth';
import Color from '../../constant/Color';

const LoginScreen = ({navigation, route}) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const {userType} = route.params;
  const dispach = useDispatch();

  const loginHandler = async props => {
    await dispach(authAction.signIn(email, password));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/menOnDesk.png')}
      />
      <Text style={styles.text}>Login</Text>
      <View>
        <FormInput
          labelText="Email"
          labelValue={email}
          onChangeText={emailId => setEmail(emailId)}
          placeholderText="Enter the email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelText="Password"
          labelValue={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholderText="Enter the password"
          secureTextEntry={true}
        />
      </View>

      <AppButton
        style={styles.loginbtn}
        buttonTitle="Login"
        onPress={() => loginHandler()}
      />

      <View style={styles.createAC}>
        <Text>You Don't Have An Account ?</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Register', {
              userType,
            })
          }>
          <Text style={{color: Color.primary, textDecorationLine: 'underline'}}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '5%',
  },
  tinyLogo: {
    width: '70%',
    height: '40%',
  },
  text: {
    fontSize: 28,
    color: Color.primary,
    marginRight: '80%',
    marginBottom: '5%',
  },
  loginbtn: {
    width: '30%',
    height: '5%',
    justifyContent: 'center',
    marginLeft: '70%',
    marginTop: '8%',
  },
  createAC: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '10%',
  },
});
export default LoginScreen;
