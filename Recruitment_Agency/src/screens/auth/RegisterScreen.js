import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import {useDispatch} from 'react-redux';
import Color from '../../constant/Color';

import * as authAction from '../../redux/actions/auth';
import {Snackbar} from 'react-native-paper';

const RegisterScreen = ({navigation, route}) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setconfirmPassword] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const onDismissSnackBar = () => setVisible(false);

  const {userType} = route.params;
  let utype;
  if (userType === 'Jober') {
    utype = 'Job Seeker';
  } else if (userType === 'Company') {
    utype = 'Employer';
  }
  const dispatch = useDispatch();

  const registerUser = async () => {
    const data = {email, password};
    if (password === confirmPassword) {
      await dispatch(authAction.signUp(data, userType));
    } else {
      setErrorMsg('Passowrd Not Match!');
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/menOnDesk.png')}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={{...styles.text, fontWeight: 'bold'}}>Register</Text>
        {/* <Text style={{...styles.text, fontSize: 22}}>For {utype} Only</Text> */}

        <ScrollView>
          <View style={styles.input}>
            <FormInput
              labelText="Email"
              labelValue={email}
              onChangeText={emailId => setEmail(emailId)}
              placeholderText="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <FormInput
              labelText="Password"
              labelValue={password}
              onChangeText={userPassword => setPassword(userPassword)}
              placeholderText="Password"
              secureTextEntry={true}
            />

            <FormInput
              labelText="Confirm Password"
              labelValue={confirmPassword}
              onChangeText={confirmPassword =>
                setconfirmPassword(confirmPassword)
              }
              placeholderText="Confirm Password"
              secureTextEntry={true}
            />
          </View>

          <AppButton
            style={styles.regbtn}
            buttonTitle="Register"
            onPress={() => registerUser()}
          />

          <View style={{alignItems: 'center', top: 120}}>
            <Text style={{color: 'black'}}>You have account !</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Login', {
                  userType,
                })
              }>
              <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                Login here !
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {errorMsg}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '5%',
  },
  image: {
    width: '70%',
    height: '40%',
    marginTop: Platform.OS === 'android' ? '-15%' : '0%',
  },
  input: {
    // marginTop: '0%',
  },
  text: {
    fontSize: 28,
    color: Color.primary,
    width: '100%',
    marginBottom: '2%',
  },
  regbtn: {
    width: Platform.OS === 'ios' ? '35%' : '33%',
    height: Platform.OS === 'ios' ? '15%' : '15%',
    marginLeft: Platform.OS === 'ios' ? '65%' : '65%',
    marginTop: '10%',
  },
});
export default RegisterScreen;
