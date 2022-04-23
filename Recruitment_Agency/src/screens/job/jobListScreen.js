import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import FabButton from '../../components/FabButton';
import JobCard from '../../components/jobCard';
import * as JobsAction from '../../redux/actions/jobs';


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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Data Not Available, Please Start to Post Job !</Text>
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

const styles = StyleSheet.create({});
export default JobListScreen;
