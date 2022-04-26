import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import FabButton from '../../components/FabButton';
import JobCard from '../../components/jobCard';
import * as JobsAction from '../../redux/actions/jobs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../../constant/Color';

const JobListScreen = ({navigation}) => {
  const user = useSelector(state => state.auth.user);

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

  // Call Fetch Data on Screen Load
  React.useEffect(() => {
    fetchPost();
  }, []);

  if (jobs.length === 0) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          {/* <Ionicons name="add-circle" size={40} color={Color.accent} /> */}

          <Text style={styles.heding}>You have not post any jobs</Text>
          <Text style={styles.text}>Click On, Add jobs</Text>
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

  return <JobCard data={jobs} navigation={navigation} />;
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
});
export default JobListScreen;
