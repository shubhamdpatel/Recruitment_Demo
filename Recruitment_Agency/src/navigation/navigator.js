// import 'react-native-gesture-handler';
import React from 'react';
import {Alert, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from '../screens/splashScreen';
import UserSelectScreen from '../screens/userSelectScreen';

import LoginScreen from '../screens/auth/loginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

import ProfileScreen from '../screens/profileScreen';
import EditProfileScreen from '../screens/jober/editProfileScreen';

import JobDetailsScreen from '../screens/job/jobDetailsScreen';
import JobPostFormScreen from '../screens/job/jobPostEditFormScreen';
import JobListScreen from '../screens/job/jobListScreen';
import ApplicationScreen from '../screens/job/applicationScreen';

import CompanyDetialsScreen from '../screens/company/companyDetialsScreen';
import CompanyFormScreen from '../screens/company/companyPostEditFormScreen';
import CompanyProfileScreen from '../screens/company/companyProfileScreen';

import NotificationScreen from '../screens/notificationScreen';
import FavouriteScreen from '../screens/jober/favouriteScreen';
import MessageScreen from '../screens/messageScreen';

import {useDispatch, useSelector} from 'react-redux';
import {Init} from '../redux/actions/auth';
import Color from '../constant/Color';

import Icon from 'react-native-vector-icons/Ionicons';
import MI from 'react-native-vector-icons/MaterialIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import JoberDetialsScreen from '../screens/jober/joberDetialsScreen';

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
            fontSize: 14,
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
            fontSize: 14,
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
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  console.log('token =', token);
  console.log('User Type =', user?.userType);
  const dispatch = useDispatch();

  const HomeTab = () => {
    const params = {userId: user?._id};
    // console.log('params', params);
    return (
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Jobs List"
          component={JobListScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: Color.primary,
            tabBarLabel: 'Job',
            tabBarLabelStyle: {
              flex: 1,
              fontSize: 14,
            },
            tabBarIcon: tabInfo => {
              return (
                <MI
                  name="work"
                  size={24}
                  color={tabInfo.focused ? Color.primary : '#8e8e93'}
                />
              );
            },
          }}
        />

        <BottomTab.Screen
          name="Applies"
          component={ApplicationScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: Color.primary,
            tabBarLabel: 'Applies',
            tabBarLabelStyle: {
              flex: 1,
              fontSize: 14,
              fontWeight: '600',
            },
            tabBarIcon: tabInfo => {
              return (
                <FA
                  name="send"
                  size={18}
                  color={tabInfo.focused ? Color.primary : '#8e8e93'}
                />
              );
            },
          }}
        />

        {/* {user.userType === 'Jober' && (
          <BottomTab.Screen
            name="Message"
            component={MessageScreen}
            // options={{headerShown: false}}
            options={{
              headerShown: false,
              tabBarActiveTintColor: Color.primary,
              tabBarLabel: 'Messages',
              tabBarLabelStyle: {
                flex: 1,
                fontSize: 14,
              },
              tabBarBadge: 2,
              tabBarBadgeStyle: {
                backgroundColor: Color.primary,
              },
              // tabBarLabelPosition: 'beside-icon',
              tabBarIcon: tabInfo => {
                return (
                  <MI
                    name="messenger"
                    size={25}
                    color={tabInfo.focused ? Color.primary : '#8e8e93'}
                  />
                );
              },
            }}
          />
        )} */}

        {user.userType === 'Jober' && (
          <BottomTab.Screen
            name="Favourite"
            component={FavouriteScreen}
            // options={{headerShown: false}}
            options={{
              headerShown: false,
              tabBarActiveTintColor: Color.primary,
              tabBarLabel: 'Favourite',
              tabBarLabelStyle: {
                flex: 1,
                fontSize: 14,
              },
              // tabBarLabelPosition: 'beside-icon',
              tabBarIcon: tabInfo => {
                return (
                  <Icon
                    name="heart"
                    size={25}
                    color={tabInfo.focused ? Color.primary : '#8e8e93'}
                  />
                );
              },
            }}
          />
        )}

        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={params}
          options={{
            headerShown: false,
            tabBarActiveTintColor: Color.primary,
            tabBarLabel: 'Me',
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

  const MyStack = () => {
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
              <View style={{flexDirection: 'row'}}>
                <Icon
                  style={{marginHorizontal: 20}}
                  name="search"
                  size={30}
                  color="white"
                  onPress={() => Alert.alert('Not Work')}
                  // onPress={({notification}) => navigation.navigate('Job Post')}
                />
                <MI
                  name="notifications-none"
                  size={32}
                  color="white"
                  onPress={() => Alert.alert('Not Work')}
                  // onPress={({notification}) => navigation.navigate('Job Post')}
                />
                {/* <MCI
                  name="bell-badge-outline"
                  size={30}
                  color="white"
                  onPress={() => Alert.alert('Not Work')}
                  // onPress={() => prop.navigation.navigate('Job Post')}
                /> */}
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Job Post"
          component={JobPostFormScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
            leftButton: 'back',
          }}
        />
        <Stack.Screen name="Jober Form" component={EditProfileScreen} />
        <Stack.Screen
          name="Company Profile"
          component={CompanyProfileScreen}
          options={{title: '', headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="Jober Profile"
          component={JoberDetialsScreen}
          options={{title: '', headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="Company Form"
          component={CompanyFormScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerShown: true,
          }}
        />
        {user?.userType === 'Jober' ? (
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
    await dispatch(Init());
    setIsLoding(false);
  };

  React.useEffect(() => {
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
