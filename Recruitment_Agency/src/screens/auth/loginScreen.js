import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import {useDispatch} from 'react-redux';
import * as authAction from '../../redux/actions/auth';
import Color from '../../constant/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({navigation, route}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [viewPwd, setViewPwd] = React.useState(true);
  const [pwdError, setPwdError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);

  const {userType} = route.params;

  let utype;
  if (userType === 'Jober') {
    utype = 'Job Seeker';
  } else if (userType === 'Company') {
    utype = 'Employer';
  }

  const dispach = useDispatch();

  const pattern =
    /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
  const result = pattern.test(email);

  const onKeyPressEvent = () => {
    if (!result) {
      setEmailError(true);
      setErrorMsg('Invalid email !');
    } else {
      setEmailError(false);
      setErrorMsg('');
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
      await dispach(authAction.signIn(email, password));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/menOnDesk.png')}
      />

      <Text style={{...styles.text, fontWeight: 'bold'}}>Login</Text>
      <Text style={{...styles.text, fontSize: 22}}>For {utype} Only</Text>

      <ScrollView>
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
            keyboardAppearance="dark"
          />
          <Text style={styles.errorMessage}>{errorMsg ? errorMsg : ''}</Text>

          <FormInput
            labelText="Password"
            labelValue={password}
            onChangeText={userPassword => setPassword(userPassword)}
            placeholderText="Enter the password"
            secureTextEntry={viewPwd}
            error={pwdError}
            onFocus={() => {
              onKeyPressEvent();
            }}
          />

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
        </View>

        <View style={styles.loginbtn}>
          <AppButton buttonTitle="Login" onPress={() => loginHandler()} />
        </View>
      </ScrollView>

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
  image: {
    width: '70%',
    height: '40%',
  },
  text: {
    fontSize: 28,
    color: Color.primary,
    width: '100%',
    // marginRight: '70%',
    marginBottom: '2%',
  },
  input: {
    marginTop: '5%',
  },
  loginbtn: {
    // flex: 1,
    // width: Platform.OS === 'ios' ? '30%' : '30%',
    // height: Platform.OS === 'ios' ? '2%' : '6%',
    // justifyContent: 'center',
    // marginLeft: '50%',
    marginTop: '8%',
    // backgroundColor: 'red',
    alignItems: 'flex-end',
  },
  createAC: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '10%',
  },
  errorMessage: {
    color: 'red',
    marginLeft: '3%',
  },
});
export default LoginScreen;
