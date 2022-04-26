import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../components/AppButton';
import JobCard from '../../components/jobCard';
import Color from '../../constant/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
const FavouriteScreen = ({navigation}) => {
  const user = useSelector(state => state.user.userProfile[0]);
  const jobs = useSelector(state => state.jobs.availableJobs);
  const favourites = user.favourites;
  let favData = jobs.filter(job => favourites.includes(job._id));

  if (favData.length === 0) {
    return (
      <View style={styles.container}> 
        <Ionicons name="heart" size={40} color="#c21a0e" />
        <Text style={styles.heding}>
          You have not marked any jobs favourite
        </Text>
        <Text style={styles.text}>Add jobs from your list</Text>
        <AppButton
          buttonTitle="Look For jobs"
          style={styles.btn}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  return <JobCard data={favData} navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.app,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heding: {
    fontSize: 19,
    fontWeight: '500',
    marginBottom: '5%',
    marginTop: '5%',
  },
  text: {
    marginBottom: '5%',
  },
  btn: {
    height: '6%',
    width: '35%',
  },
});
export default FavouriteScreen;
