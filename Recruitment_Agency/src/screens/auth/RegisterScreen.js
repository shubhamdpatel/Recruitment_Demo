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
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({navigation, route}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setconfirmPassword] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [pwdError, setPwdError] = React.useState(false);
  const [confirmPwdError, setconfirmPwdError] = React.useState(false);
  const [viewPwd, setViewPwd] = React.useState(true);
  const [viewConfirmPwd, setViewConfirmPwd] = React.useState(true);

  const onDismissSnackBar = () => setVisible(false);

  const {userType} = route.params;
  let utype;
  if (userType === 'Jober') {
    utype = 'Job Seeker';
  } else if (userType === 'Company') {
    utype = 'Employer';
  }
  const dispatch = useDispatch();

  const ViewPassword = view => {
    return (
      <TouchableOpacity
        onPress={() => {
          viewPwd ? setViewPwd(false) : setViewPwd(true);
        }}>
        <Ionicons
          name={viewPwd ? 'eye-off-outline' : 'eye-outline'}
          size={30}
          color={Color.primary}
          style={{position: 'absolute', right: 0, bottom: 20}}
        />
      </TouchableOpacity>
    );
  };

  const pattern =
    /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
  const result = pattern.test(email);

  const onFocus = () => {
    if (!result) {
      setEmailError(true);
      setErrorMsg('Invalid email !');
    } else {
      setEmailError(false);
      setErrorMsg('');
    }
  };

  const registerUser = async () => {
    if (email === '' || password === '' || confirmPassword === '') {
      setEmailError(true);
      setPwdError(true);
      setconfirmPwdError(true);
      setTimeout(() => {
        setEmailError(false);
        setPwdError(false);
        setconfirmPwdError(false);
      }, 1000);
    } else {
      const data = {email, password};
      if (password === confirmPassword) {
        await dispatch(authAction.signUp(data, userType));
      } else {
        setErrorMsg('Passowrd Not Match!');
        setVisible(true);
      }
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
              error={emailError}
              clearButtonMode="while-editing"
            />
            {/* <Text style={styles.errorMessage}>{errorMsg ? errorMsg : ''}</Text> */}

            <FormInput
              labelText="Password"
              labelValue={password}
              onChangeText={userPassword => setPassword(userPassword)}
              placeholderText="Password"
              secureTextEntry={viewPwd}
              error={pwdError}
              onFocus={() => {
                onFocus();
              }}
              onKeyPressEvent={() => {}}
            />

            <ViewPassword />
            <FormInput
              labelText="Confirm Password"
              labelValue={confirmPassword}
              onChangeText={confirmPassword =>
                setconfirmPassword(confirmPassword)
              }
              placeholderText="Confirm Password"
              secureTextEntry={viewPwd}
              error={confirmPwdError}
              // onFocus={() => {
              //   onKeyPressEvent();
              // }}
            />
            <ViewPassword />
          </View>

          <AppButton
            style={styles.regbtn}
            buttonTitle="Register"
            onPress={() => registerUser()}
          />

          <View style={{alignItems: 'center', top: 100}}>
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
  errorMessage: {
    color: 'red',
    marginLeft: '3%',
  },
});
export default RegisterScreen;
