import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import JobCard from '../../components/jobCard';
import Color from '../../constant/Color';

const FavouriteScreen = ({navigation}) => {
  const user = useSelector(state => state.user.userProfile[0]);
  const jobs = useSelector(state => state.jobs.availableJobs);
  const favourites = user.favourites;
  let favData = jobs.filter(job => favourites.includes(job._id));

  if (favData.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No Data Available !</Text>
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
});
export default FavouriteScreen;
