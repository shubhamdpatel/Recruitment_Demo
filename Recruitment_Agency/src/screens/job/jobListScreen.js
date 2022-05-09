import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import Loader from '../Loader';
import FabButton from '../../components/FabButton';
import JobCard from '../../components/jobCard';
import Icon from 'react-native-vector-icons/Octicons';
import Color from '../../constant/Color';
import * as JobsAction from '../../redux/actions/jobs';

const JobListScreen = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoding] = React.useState(true);
  // Get data from Store by user type
  let jobs;

  if (user?.userType === 'Company')
    jobs = useSelector(state => state.jobs.userPostedJobs);
  else jobs = useSelector(state => state.jobs.availableJobs);

  const dispatch = useDispatch();

  // Fetch Data
  const fetchPost = async () => {
    await dispatch(JobsAction.fetchJobs());
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPost();
    }, []),
  );

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoding(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (jobs.length === 0) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          {/* <Ionicons name="add-circle" size={40} color={Color.accent} /> */}

          <Text style={styles.heding}>You have not post any jobs</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Click On </Text>
            <Icon name="plus-circle" color={Color.primary} size={16} />
            <Text> Add Jobs</Text>
          </View>
          {/* <Image
            style={{width: 240, height: 300,position:'absolute',bottom:-50,left:50}}
            source={require('../../assets/LeftArrow1.jpg')}
          /> */}
        </View>
        <View>
          <FabButton
            iconName="plus"
            onPress={() =>
              navigation.navigate('Job Post', {params: {jobId: ''}})
            }
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <JobCard data={jobs} navigation={navigation} />
      {user?.userType === 'Company' && (
        <View>
          <FabButton
            style={styles.fab}
            iconName="plus"
            onPress={() =>
              navigation.navigate('Job Post', {params: {jobId: ''}})
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  fab: {
    position: 'absolute',
    left: '72%',
  },
});
export default JobListScreen;
