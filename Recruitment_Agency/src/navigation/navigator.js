// import 'react-native-gesture-handler';
import React from 'react';
import {Button, Alert, View, Text, Image} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../screens/splashScreen';
import UserSelectScreen from '../screens/userSelectScreen';
import LoginScreen from '../screens/auth/loginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import UserDetailsScreen from '../screens/user/UserDetailsScreen';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import JobPostFormScreen from '../screens/company/jobPostFormScreen';
import JobListScreen from '../screens/company/jobListScreen';
import JobDetailsScreen from '../screens/company/jobDetailsScreen';
import CompanyDetialsScreen from '../screens/company/companyDetialsScreen';
import NotificationScreen from '../screens/company/notificationScreen';
import FavouriteScreen from '../screens/company/favouriteScreen';
import MessageScreen from '../screens/company/messageScreen';
import {useDispatch, useSelector} from 'react-redux';
import {Init} from '../redux/actions/auth';
import Color from '../constant/Color';

import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

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
          tabBarLabel: 'Job',
          tabBarLabelStyle: {
            flex: 1,
            fontSize: 14,
          },
          // tabBarLabelPosition: 'beside-icon',
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

      <BottomTab.Screen
        name="Profile"
        component={UserDetailsScreen}
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

const DraverBar = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={'Profile'} component={MyStack} />
    </Drawer.Navigator>
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

  const MyStack = props => {
    console.log('===', props);
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
            headerLeft: () => (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  {/*Donute Button Image */}
                  <Image
                    source={{
                      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
                    }}
                    style={{width: 25, height: 25, marginLeft: 5}}
                  />
                </TouchableOpacity>
              </View>
            ),
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
          // options={{headerShown: false}}
        />
        <Stack.Screen name="Drawer" component={DraverBar} />
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
