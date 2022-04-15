import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as userAction from '../../redux/actions/user';
import * as authAction from '../../redux/actions/auth';
import * as companyAction from '../../redux/actions/company';
import {Avatar} from 'react-native-paper';
import Color from '../../constant/Color';

//Icons
import MC from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppButton from '../../components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompanyDetialsScreen = ({route}) => {
  // const user = useSelector(state => state?.user?.userProfile[0]);
  AsyncStorage.getItem('user').then(user => {
    console.log(user.user.user._id);
    debugger;
  });
  // console.log('Company-->', user);
  debugger;
  let cid = '';
  if (user) {
    debugger;
    cid = user?._id;
  } else {
    debugger;
    cid = route?.params?.params?.cid;
  }
  const dispatch = useDispatch();

  const company = useSelector(state => state.company.companyData);
  console.log('======', company);
  debugger;

  const fetchCompany = async () => {
    debugger;
    await dispatch(userAction.fetchUser());
    const data = await dispatch(companyAction.fetchCompanyData(cid));
    console.log(data);
    debugger;
  };

  React.useEffect(() => {
    debugger;
    fetchCompany();
  }, []);

  // Logout
  const logoutHandeler = async () => {
    await dispatch(authAction.logout());
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.imageCard}>
        {company?.companyLogo ? (
          <Avatar.Image
            size={180}
            source={require('../../assets/bosleo.png')}
          />
        ) : (
          <Avatar.Image
            backgroundColor="#e3e3e3"
            size={180}
            // source={{uri: `../../assets/${company?.companyLogo}`}}
            source={require('../../assets/company.png')}
          />
        )}
        <Text style={styles.companyName}>{company?.companyName}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Update</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={styles.details}>
          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="reader-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>About us </Text>
                <Text style={styles.text}>{company?.about}</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="mail-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Email </Text>
                <Text style={styles.text}>{company?.email}</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <MCI name="web" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Website</Text>
                <Text style={styles.text}>https://bosleo.com/</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <MC name="work-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Interview Address </Text>
                <Text style={styles.text}>
                  {company?.address} {company?.city}
                </Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="location-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Country </Text>
                <Text style={styles.text}>
                  {company?.state}, {company?.country}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Button
          title="Edit"
          onPress={() => {
            navigation.navigate('Edit Profile');
          }}
        />
        <Button
          title="Logout"
          onPress={() => {
            logoutHandeler();
          }}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  imageCard: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 8,
    elevation: 5,
    // borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    // marginBottom: 10,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    height: Platform.OS === 'ios' ? '38%' : '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  companyName: {
    fontSize: 24,
    fontFamily: 'Cochin',
    textAlign: 'center',
  },
  details: {
    flex: 1,
    padding: '5%',
  },
  element: {
    marginVertical: 10,
  },
  textHeading: {
    fontSize: 16,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
  },
});

export default CompanyDetialsScreen;
