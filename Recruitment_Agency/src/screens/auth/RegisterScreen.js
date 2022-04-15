import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import {useDispatch} from 'react-redux';
import Color from '../../constant/Color';

import * as authAction from '../../redux/actions/auth';

const RegisterScreen = ({navigation, route}) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setconfirmPassword] = React.useState(null);

  const {userType} = route.params;
  console.log(userType);
  let utype;
  if (userType === 'Jober') {
    utype = 'Job Seeker';
  } else if (userType === 'Company') {
    utype = 'Employer';
  }
  const dispatch = useDispatch();

  const registerUser = async () => {
    await dispatch(authAction.signUp(email, password, userType));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/menOnDesk.png')}
      />
      <Text style={{...styles.text, fontWeight: 'bold'}}>Register</Text>
      <Text style={{...styles.text, fontSize: 22}}>For {utype} Only</Text>

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

        <View style={styles.regbtn}>
          <AppButton buttonTitle="Register" onPress={() => registerUser()} />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Login', {
            userType,
          })
        }>
        {/* <Text style={{color: 'blue'}}>Login</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '70%',
    height: '40%',
  },
  input: {
    marginTop: '5%',
  },
  text: {
    fontSize: 28,
    color: Color.primary,
    width: '100%',
    // marginRight: '70%',
    marginBottom: '2%',
  },
  regbtn: {
    // flex: 1,
    // width: '0%',
    // height: Platform.OS === 'ios' ? '5%' : '6%',
    // justifyContent: 'center',
    // marginLeft: '70%',
    marginTop: '8%',
    alignItems: 'flex-end',
  },
});
export default RegisterScreen;
