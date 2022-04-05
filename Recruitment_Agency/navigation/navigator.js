import React from 'react';
import {Button, Alert} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from '../screens/splashScreen';
import UserSelectScreen from '../screens/userSelectScreen';
import LoginScreen from '../screens/auth/loginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import JobPostFormScreen from '../screens/company/jobPostFormScreen';
import JobListScreen from '../screens/company/jobListScreen';
import JobDetailsScreen from '../screens/company/jobDetailsScreen';
import {useDispatch, useSelector} from 'react-redux';
import {Init} from '../redux/actions/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={UserSelectScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const CompanyTab = ({navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Jobs List"
        component={JobListScreen}
        options={{
          headerRight: () => (
            <Button
              title="Add Job"
              onPress={() => navigation.navigate('Job Post')}
            />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={CompanyTab}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Job Post" component={JobPostFormScreen} />
      <Stack.Screen name="Job Details" component={JobDetailsScreen} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const [isLoading, setIsLoding] = React.useState(true);
  debugger;
  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user.user);
  console.log('token =', token);
  console.log(user.userType);
  const dispatch = useDispatch();
  const init = async () => {
    debugger;
    await dispatch(Init());
    setIsLoding(false);
  };

  React.useEffect(() => {
    debugger;
    setTimeout(() => {
      setIsLoding(false);
    }, 1000);
    init();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {token === null ? <AuthStack /> : <MyStack />}
    </NavigationContainer>
  );
};

export default Navigator;
