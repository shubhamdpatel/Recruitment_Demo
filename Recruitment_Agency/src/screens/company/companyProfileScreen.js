import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

//Icons
import MC from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../../components/AppButton';

const CompanyProfileScreen = ({navigation}) => {
  const user = useSelector(state => state.user.userProfile[0]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: user?.companyName,
    });
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.details}>
          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="reader-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>About us </Text>
                <Text style={styles.text}>{user?.about}</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="mail-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Email </Text>
                <Text style={styles.text}>{user?.email}</Text>
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
                <Text style={styles.text}>{user?.address}</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
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
          <AppButton
            buttonTitle="Edit"
            onPress={() => navigation.navigate('Update Company')}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
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

export default CompanyProfileScreen;
