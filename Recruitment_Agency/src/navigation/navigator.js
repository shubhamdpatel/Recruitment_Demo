import React from 'react';
import {Button, Alert} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from '../screens/splashScreen';
import UserSelectScreen from '../screens/userSelectScreen';
import LoginScreen from '../screens/auth/loginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import JobPostFormScreen from '../screens/company/jobPostFormScreen';
import JobListScreen from '../screens/company/jobListScreen';
import JobDetailsScreen from '../screens/company/jobDetailsScreen';
import CompanyDetialsScreen from '../screens/company/companyDetialsScreen';
import {useDispatch, useSelector} from 'react-redux';
import {Init} from '../redux/actions/auth';
import Color from '../constant/Color';

import Icon from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={UserSelectScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const HomeTab = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Jobs List"
        component={JobListScreen}
        // options={{headerShown: false}}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Color.primary,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            flex: 1,
            fontSize: 14,
          },
          // tabBarLabelPosition: 'beside-icon',
          tabBarIcon: tabInfo => {
            return (
              <Icon
                name="home"
                size={24}
                color={tabInfo.focused ? Color.primary : '#8e8e93'}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Color.primary,
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontSize: 14,
          },
          // tabBarLabelPosition: 'beside-icon',
          tabBarIcon: tabInfo => {
            return (
              <Icon
                name="person"
                size={24}
                color={tabInfo.focused ? Color.primary : '#8e8e93'}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const JobCompanyDetailsTab = props => {
  const params = props.route.params;
  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name="Job Details"
        component={JobDetailsScreen}
        initialParams={params}
        options={{
          tabBarInactiveTintColor: Color.white,
          tabBarActiveTintColor: Color.white,
          tabBarStyle: {
            backgroundColor: Color.primary,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
          tabBarIndicatorStyle: {
            backgroundColor: Color.white,
          },
        }}
      />
      <TopTab.Screen
        name="Company Details"
        component={CompanyDetialsScreen}
        initialParams={params}
        options={{
          tabBarInactiveTintColor: Color.white,
          tabBarActiveTintColor: Color.white,
          tabBarStyle: {
            backgroundColor: Color.primary,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
          tabBarIndicatorStyle: {
            backgroundColor: Color.white,
          },
        }}
      />
    </TopTab.Navigator>
  );
};

const Navigator = ({navigation}) => {
  const [isLoading, setIsLoding] = React.useState(true);
  debugger;
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  console.log('token =', token);
  console.log('User Type =', user.userType);
  const dispatch = useDispatch();

  const MyStack = ({prop}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTab}
          options={{
            title: 'RECRUIT',
            headerStyle: {
              backgroundColor: Color.primary,
            },
            headerTintColor: Color.white,
            headerRight: () => (
              <Icon
                name="add"
                size={36}
                color="white"
                onPress={() => Alert.alert('Not Work')}
                // onPress={() => prop.navigation.navigate('Job Post')}
              />
            ),
          }}
          // options={{headerShown: false}}
        />
        <Stack.Screen name="Job Post" component={JobPostFormScreen} />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
        {user.userType === 'Jober' ? (
          <Stack.Screen
            name="JC Details"
            component={JobCompanyDetailsTab}
            options={{
              title: 'RECRUIT',
              headerStyle: {
                backgroundColor: Color.primary,
              },
              headerTintColor: Color.white,
              headerBackTitleVisible: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Job Details"
            component={JobDetailsScreen}
            options={{
              title: 'RECRUIT',
              headerStyle: {
                backgroundColor: Color.primary,
              },
              headerTintColor: Color.white,
              headerBackTitleVisible: false,
            }}
          />
        )}
      </Stack.Navigator>
    );
  };

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
