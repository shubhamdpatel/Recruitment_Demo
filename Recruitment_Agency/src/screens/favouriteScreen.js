import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as userAction from '../redux/actions/user';
import JobCard from '../components/jobCard';

const FavouriteScreen = () => {
  const user = useSelector(state => state.user.userProfile[0]);
  const jobs = useSelector(state => state.jobs.availableJobs);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    await dispatch(userAction.fetchUser());
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  const favourites = user.favourites;

  let favData = jobs.filter(job => favourites.includes(job._id));

  if (favData.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No Data Available !</Text>
      </View>
    );
  }

  return <JobCard data={favData} />;
};

const styles = StyleSheet.create({});
export default FavouriteScreen;
