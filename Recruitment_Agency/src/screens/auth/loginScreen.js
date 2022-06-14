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
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import {useDispatch} from 'react-redux';
import * as authAction from '../../redux/actions/auth';
import Color from '../../constant/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation, route}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [pwdError, setPwdError] = React.useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = React.useState(false);
  const [pwdErrorMsg, setPwdErrorMsg] = React.useState(false);
  const [viewPwd, setViewPwd] = React.useState(true);
  const [isLoading, setIsLoding] = React.useState(true);
  const [isCheck, setIsCheck] = React.useState(false);
  const dispatch = useDispatch();

  const pattern =
    /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
  const result = pattern.test(email);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoding(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  const onFocus = () => {
    if (!result) {
      setEmailError(true);
      setEmailErrorMsg('Invalid email !');
    } else {
      setEmailError(false);
      setEmailErrorMsg('');
    }
  };

  const onChangePassword = password => {
    if (password.length >= 7) {
      setPassword(password);
      setPwdError(false);
      setPwdErrorMsg('');
    } else {
      setPwdError(true);
      setPwdErrorMsg('Password should be 7 character!');
    }
  };

  const loginHandler = async () => {
    if (email === '' || password === '') {
      setEmailError(true);
      setPwdError(true);
      setTimeout(() => {
        setEmailError(false);
        setPwdError(false);
      }, 1000);
    } else {
      if (pwdError === false) {
        setIsCheck(true);
        const resData = await dispatch(authAction.signIn(email, password));
        setIsCheck(false);

        // try {
        //   const jsonValue = JSON.stringify({
        //     user: resData,
        //   });

        //   await AsyncStorage.setItem('user', jsonValue);
        //   dispatch(authAction.authentication(resData.token, resData.user));
        // } catch (error) {
        //   console.log('Data Not Save In Async-Storage', error);
        // }
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

      <Text style={{...styles.text, fontWeight: 'bold'}}>Login</Text>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.input}>
          <FormInput
            labelText="Email"
            labelValue={email}
            onChangeText={emailId => setEmail(emailId)}
            placeholderText="Enter the email"
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
            onChangeText={userPassword => onChangePassword(userPassword)}
            placeholderText="Enter the password"
            secureTextEntry={viewPwd}
            error={pwdError}
            onFocus={() => {
              onFocus();
            }}
            onKeyPress={() => {}}
          />

          <TouchableOpacity
            onPress={() => {
              viewPwd ? setViewPwd(false) : setViewPwd(true);
            }}>
            <Ionicons
              name={viewPwd ? 'eye-outline' : 'eye-off-outline'}
              size={30}
              color={Color.primary}
              style={{position: 'absolute', right: 0, bottom: 20}}
            />
          </TouchableOpacity>
          <Text style={styles.errorMessage}>
            {pwdErrorMsg ? pwdErrorMsg : ''}
          </Text>
        </View>

        <AppButton
          style={styles.loginbtn}
          buttonTitle={isCheck ? <ActivityIndicator color="white" /> : 'Login'}
          onPress={() => loginHandler()}
        />
      </KeyboardAwareScrollView>

      <View style={styles.createAC}>
        <Text style={{color: 'black'}}>You Don't Have An Account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color: Color.primary}}>Create Account</Text>
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
  },
  text: {
    fontSize: 28,
    color: Color.primary,
    width: '100%',
    marginBottom: '2%',
  },
  input: {
    marginTop: '5%',
  },
  loginbtn: {
    width: Platform.OS === 'ios' ? '30%' : '33%',
    height: Platform.OS === 'ios' ? '20%' : '18%',
    marginLeft: Platform.OS === 'ios' ? '70%' : '65%',
    marginTop: '8%',
  },
  createAC: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '5%',
  },
  errorMessage: {
    color: 'red',
    marginLeft: '3%',
  },
});

export default LoginScreen;
