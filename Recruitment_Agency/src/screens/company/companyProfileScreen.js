import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

//Icons
import MC from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../../components/AppButton';
import Color from '../../constant/Color';
import {useEffect} from 'react';
import * as userAction from '../../redux/actions/user';

const CompanyProfileScreen = ({navigation}) => {
  const user = useSelector(state => state.user.userProfile[0]);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: user?.companyName,
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: Color.app}}>
      <View style={{height: '87%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.details}>
            <View style={{...styles.element, ...styles.card}}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="reader-outline" size={30} color="#4F8EF7" />
                <View style={{marginHorizontal: 10}}>
                  <Text style={styles.textHeading}>About us </Text>
                  <Text style={styles.text}>{user?.about}</Text>
                </View>
              </View>
            </View>

            <View style={{...styles.element, ...styles.card}}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="mail-outline" size={30} color="#4F8EF7" />
                <View style={{marginHorizontal: 10}}>
                  <Text style={styles.textHeading}>Email </Text>
                  <Text style={styles.text}>{user?.email}</Text>
                </View>
              </View>
            </View>

            <View style={{...styles.element, ...styles.card}}>
              <View style={{flexDirection: 'row'}}>
                <MCI name="web" size={30} color="#4F8EF7" />
                <View style={{marginHorizontal: 10}}>
                  <Text style={styles.textHeading}>Website</Text>
                  <Text style={styles.text}>https://bosleo.com/</Text>
                </View>
              </View>
            </View>

            <View style={{...styles.element, ...styles.card}}>
              <View style={{flexDirection: 'row'}}>
                <MC name="work-outline" size={30} color="#4F8EF7" />
                <View style={{marginHorizontal: 10}}>
                  <Text style={styles.textHeading}>Interview Address </Text>
                  <Text style={styles.text}>{user?.address}</Text>
                </View>
              </View>
            </View>

            <View style={{...styles.element, ...styles.card}}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="location-outline" size={30} color="#4F8EF7" />
                <View style={{marginHorizontal: 10}}>
                  <Text style={styles.textHeading}>Country </Text>
                  <Text style={styles.text}>
                    {user?.state}, {user?.country}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <AppButton
        style={styles.editBtn}
        buttonTitle="Edit"
        onPress={() => navigation.navigate('Company Form')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 3, height: 5},
    // shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  details: {
    padding: '4%',
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
  editBtn: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    height: 50,
    width: 100,
  },
});

export default CompanyProfileScreen;
