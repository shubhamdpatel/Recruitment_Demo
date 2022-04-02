import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserSelectScreen from '../screens/userSelectScreen';
import LoginScreen from '../screens/auth/loginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

import HomeScreen from '../screens/homeScreen';
import JobPostFormScreen from '../screens/company/jobPostFormScreen';
import JobListScreen from '../screens/company/jobListScreen';
import {Button} from 'react-native';

// import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const Company = createNativeStackNavigator();
const Auth = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen name="User" component={UserSelectScreen} />
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
    </Auth.Navigator>
  );
};

const CompanyStack = () => {
  return (
    <Company.Navigator>
      <Company.Screen name="Home" component={HomeScreen} />

      <Company.Screen
        name="JobList"
        component={JobListScreen}
        options={({navigation}) => ({
          title: '',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('JobForm')}
              title="+"
              color="#2e64e5"
            />
          ),
        })}
      />

      <Company.Screen
        name="JobForm"
        component={JobPostFormScreen}
        options={() => ({
          title: '',
        })}
      />
    </Company.Navigator>
  );
};

const Navigator = () => {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(res => {
      setToken(JSON.parse(res).token);
    });
  });

  // const token = jsonValue.token;
  // console.log(token, jsonValue);
  // if (token !== '' || token !== null) {
  //   setUser(jsonValue.user);
  // }

  // if (!user) {
  //   return (
  //     <NavigationContainer>
  //       <AuthStack />
  //     </NavigationContainer>
  //   );
  // }

  return (
    <NavigationContainer>
      {token ? <CompanyStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigator;
