import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import UserSelectScreen from '../screens/userSelectScreen';
import LoginScreen from '../screens/Auth/loginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

import HomeScreen from '../screens/homeScreen';
import JobPostFormScreen from '../screens/company/jobPostFormScreen';
import JobListScreen from '../screens/company/jobListScreen';
import {Button} from 'react-native';

import auth from '@react-native-firebase/auth';

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
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <CompanyStack />
    </NavigationContainer>
  );
};

export default Navigator;
