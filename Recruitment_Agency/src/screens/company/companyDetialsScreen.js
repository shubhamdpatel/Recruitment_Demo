import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as companyAction from '../../redux/actions/company';
import {Avatar} from 'react-native-paper';
import Color from '../../constant/Color';

//Icons
import MC from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const CompanyDetialsScreen = ({route}) => {
  const companyImage =
    'https://firebasestorage.googleapis.com/v0/b/recruitment-agency-e0465.appspot.com/o/images%2Fdefault%2Fcompany.png?alt=media&token=e5db119f-31d2-4449-9d1b-4f3a9549a2ab';
  const dispatch = useDispatch();
  const cid = route?.params?.params?.cid;

  const company = useSelector(state => state.company.companyData);

  const fetchCompany = async () => {
    await dispatch(companyAction.fetchCompanyData(cid));
  };

  React.useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Color.app}}>
      <View style={styles.imageCard}>
        <Avatar.Image
          size={180}
          source={{
            uri: company?.companyLogo ? company?.companyLogo : companyImage,
          }}
        />

        <Text style={styles.companyName}>{company?.companyName}</Text>
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
                <Text style={styles.text}>{company?.website}</Text>
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
