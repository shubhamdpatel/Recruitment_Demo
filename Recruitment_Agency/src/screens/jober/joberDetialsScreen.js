import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../../components/AppButton';
import * as userAction from '../../redux/actions/user';

const JoberDetialsScreen = ({navigation}) => {
  const user = useSelector(state => state.user.userProfile[0]);
  const dispatch = useDispatch();

  // Fetch Data on Screen Load
  React.useEffect(() => {
    dispatch(userAction.fetchUser());
  }, [dispatch]);

  return (
    <View style={{flex: 1, padding: '4%', backgroundColor: '#edebeb'}}>
      <View style={{height: '88%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{...styles.element, ...styles.underline}}>
            <View style={{flexDirection: 'row', marginBottom: '5%'}}>
              <Ionicons name="person-circle" size={40} color="#4F8EF7" />
              <Text style={{...styles.textHeading, top: 10}}>About Me</Text>
            </View>
            <Text style={{...styles.text, marginBottom: 10}}>
              {user?.myBio || '.....'}
            </Text>
          </View>

          <View style={{...styles.element, ...styles.underline}}>
            <View style={{flexDirection: 'row', marginBottom: '5%'}}>
              <Ionicons name="briefcase-sharp" size={30} color="#4F8EF7" />
              <Text style={{...styles.textHeading, top: 5}}>
                Work Experience
              </Text>
            </View>
            <Text style={{...styles.text, marginBottom: 10}}>
              {user?.experience || '.....'}
            </Text>
          </View>

          <View style={{...styles.element, ...styles.underline}}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome name="graduation-cap" size={30} color="#4F8EF7" />
              <Text style={{...styles.textHeading, top: 5}}>
                Education & Qulification
              </Text>
            </View>

            <View style={{...styles.element}}>
              <Text style={{...styles.text, fontWeight: '700'}}>
                Qulification
              </Text>
              <Text style={styles.text}>
                {user?.educationLevelDegree || '.....'}
              </Text>
            </View>

            <View style={{...styles.element}}>
              <Text style={{...styles.text, fontWeight: '700'}}>
                Institute Name
              </Text>
              <Text style={styles.text}>{user?.instituteName || '.....'}</Text>
            </View>
          </View>

          <View style={{...styles.element, ...styles.underline}}>
            <View style={{flexDirection: 'row'}}>
              <Fontisto name="person" size={30} color="#4F8EF7" />
              <Text style={{...styles.textHeading, top: 5}}>
                Personal Information
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{...styles.element, width: '40%'}}>
                <Text style={{...styles.text, fontWeight: '700'}}>Mobile</Text>
                <Text style={styles.text}>{user?.mobile || '.....'}</Text>
              </View>

              <View style={{...styles.element, width: '60%'}}>
                <Text style={{...styles.text, fontWeight: '700'}}>Email</Text>
                <Text style={styles.text}>{user?.email || '.....'}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <AppButton
        style={styles.editBtn}
        buttonTitle="Edit"
        onPress={() => navigation.navigate('Jober Form')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  element: {
    marginVertical: 10,
  },
  underline: {
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    // shadowColor: 'black',
    // shadowOpacity: 0.1,
    // shadowOffset: {width: 3, height: 5},
    // shadowRadius: 5,
    // elevation: 5,
    // borderRadius: 10,
    // backgroundColor: 'white',
    // padding: 10,
  },
  textHeading: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  editBtn: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    height: '6%',
    width: '25%',
  },
});

export default JoberDetialsScreen;
