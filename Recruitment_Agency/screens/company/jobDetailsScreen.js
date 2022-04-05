import React from 'react';
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as JobsAction from '../../redux/actions/jobs';

const JobDetailsScreen = ({route}) => {
  const {jobId} = route.params;
  const dispatch = useDispatch();

  const selectedJob = useSelector(state =>
    state.jobs.userPostedJobs.find(job => job._id === jobId),
  );

  const deleteJobHandler = async id => {
    await dispatch(JobsAction.deleteJob(id));
  };

  return (
    <View>
      <ScrollView style={styles.card}>
        <Text style={styles.text}>Title : {selectedJob.title}</Text>
        <Text style={styles.text}>Type : {selectedJob.type} </Text>
        <Text style={styles.text}>Gender : {selectedJob.gender} </Text>
        <Text style={styles.text}>Education : {selectedJob.education} </Text>
        <Text style={styles.text}>Min Salary : {selectedJob.minSalary}</Text>
        <Text style={styles.text}>Max Salary : {selectedJob.maxSalary}</Text>
        <Text style={styles.text}>Experience : {selectedJob.experience} </Text>
        <Text style={styles.text}>
          Description : {selectedJob.description}{' '}
        </Text>
        <Button
          title="Delete"
          onPress={() => dispatch(JobsAction.deleteJob(selectedJob._id))}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
  text: {
    margin: 5,
    fontSize: 16,
    color: '#051d5f',
  },
});
export default JobDetailsScreen;
