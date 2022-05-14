import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import Color from '../../constant/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as authAction from '../../redux/actions/auth';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';

const RegisterScreen = ({navigation, route}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setconfirmPassword] = React.useState('');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const [emailError, setEmailError] = React.useState(false);
  const [pwdError, setPwdError] = React.useState(false);
  const [confirmPwdError, setconfirmPwdError] = React.useState(false);
  const [viewPwd, setViewPwd] = React.useState(true);
  const [viewConfirmPwd, setViewConfirmPwd] = React.useState(true);
  const [emailErrorMsg, setEmailErrorMsg] = React.useState('');
  const [pwdErrorMsg, setPwdErrorMsg] = React.useState(false);
  const [confiormPwdErrorMsg, setConfirmPwdErrorMsg] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(false);

  const dispatch = useDispatch();

  const ViewPassword = props => {
    const {view} = props;
    return (
      <TouchableOpacity
        onPress={() => {
          view === 'password'
            ? viewPwd
              ? setViewPwd(false)
              : setViewPwd(true)
            : viewConfirmPwd
            ? setViewConfirmPwd(false)
            : setViewConfirmPwd(true);
        }}>
        <Ionicons
          name={
            view === 'password'
              ? viewPwd
                ? 'eye-off-outline'
                : 'eye-outline'
              : viewConfirmPwd
              ? 'eye-off-outline'
              : 'eye-outline'
          }
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
      setEmailErrorMsg('Invalid email !');
    } else {
      setEmailError(false);
      setEmailErrorMsg('');
    }
  };

  const onChangePassword = (password, input) => {
    if (password.length >= 7) {
      input === 'password'
        ? setPassword(password)
        : setconfirmPassword(password);
      input === 'password' ? setPwdError(false) : setconfirmPwdError(false);
      input === 'password' ? setPwdErrorMsg('') : setConfirmPwdErrorMsg('');
    } else {
      input === 'password' ? setPwdError(true) : setconfirmPwdError(true);
      input === 'password'
        ? setPwdErrorMsg('Password should be 7 character!')
        : setConfirmPwdErrorMsg('Password should be 7 character!');
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
      let userType;
      if (password === confirmPassword) {
        if (toggleCheckBox) {
          userType = 'Jober';
        } else {
          userType = 'Company';
        }
        if (pwdError === false || confirmPwdError === false) {
          setIsCheck(true);
          await dispatch(authAction.signUp(data, userType));
          setIsCheck(false);
        }
      } else {
        Toast.show('Passowrd Not Match!');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/recruitment-agency-e0465.appspot.com/o/images%2Fdefault%2FmenOnDesk.png?alt=media&token=95557100-614f-4ab7-ba67-dcaa9f96a8d9',
        }}
      />

      <Text style={{...styles.text, fontWeight: 'bold'}}>Register</Text>

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View>
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
          <Text style={styles.errorMessage}>
            {emailErrorMsg ? emailErrorMsg : ''}
          </Text>

          <FormInput
            labelText="Password"
            labelValue={password}
            onChangeText={userPassword =>
              onChangePassword(userPassword, 'password')
            }
            placeholderText="Password"
            secureTextEntry={viewPwd}
            error={pwdError}
            onFocus={() => {
              onFocus();
            }}
          />
          <ViewPassword view="password" />
          <Text style={styles.errorMessage}>
            {pwdErrorMsg ? pwdErrorMsg : ''}
          </Text>

          <FormInput
            labelText="Confirm Password"
            labelValue={confirmPassword}
            onChangeText={confirmPassword =>
              onChangePassword(confirmPassword, 'Cpassword')
            }
            placeholderText="Confirm Password"
            secureTextEntry={viewConfirmPwd}
            error={confirmPwdError}
          />
          <ViewPassword view="confirmPassword" />
          <Text style={styles.errorMessage}>
            {confiormPwdErrorMsg ? confiormPwdErrorMsg : ''}
          </Text>

          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              boxType="square"
              style={{height: 20}}
              boxStyle={{height: 20}}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text style={{fontSize: 15}}>I am Job Seeker</Text>
          </View>
        </View>

        <AppButton
          style={styles.regbtn}
          buttonTitle={
            isCheck ? <ActivityIndicator color="white" /> : 'Register'
          }
          onPress={() => registerUser()}
        />
      </KeyboardAwareScrollView>

      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'black'}}>You have account !</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'blue'}}>Login here !</Text>
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
  image: {
    width: '70%',
    height: '40%',
    marginTop: Platform.OS === 'android' ? '-15%' : '0%',
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
    marginTop: '5%',
  },
  errorMessage: {
    color: 'red',
    marginLeft: '3%',
  },
  checkbox: {flexDirection: 'row', margin: '2%'},
});

export default RegisterScreen;
