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
import {useSelector, useDispatch} from 'react-redux';
import * as authAction from '../../redux/actions/auth';
import Color from '../../constant/Color';

const LoginScreen = ({navigation, route}) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const {userType} = route.params;
  let utype;
  if (userType === 'Jober') {
    utype = 'Job Seeker';
  } else if (userType === 'Company') {
    utype = 'Employer';
  }
  
  const dispach = useDispatch();

  const loginHandler = async props => {
    await dispach(authAction.signIn(email, password));
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
    flex: 1,
    width: Platform.OS === 'ios' ? '30%' : '30%',
    height: Platform.OS === 'ios' ? '5%' : '6%',
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
