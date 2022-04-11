import React from 'react';
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as JobsAction from '../../redux/actions/jobs';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const JobDetailsScreen = ({route, navigation}) => {
  const jobId = route?.params.params.jobId;
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  let selectedJob;

  if (user.userType === 'Company') {
    selectedJob = useSelector(state =>
      state.jobs.userPostedJobs.find(job => job?._id === jobId),
    );
  } else {
    selectedJob = useSelector(state =>
      state.jobs.availableJobs.find(job => job?._id === jobId),
    );
  }

  return (
    <View style={styles.card}>
      <ScrollView>
        <Text style={styles.Jobtitle}>{selectedJob?.title}</Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>
            Rs. {selectedJob?.minSalary} - {selectedJob?.maxSalary}
          </Text>

          <Text style={styles.text}>1 Openings</Text>
          <Text style={styles.text}>
            <Ionicons name="heart-outline" size={20} color="#4F8EF7" />
          </Text>
        </View>

        <Text style={styles.text}>
          <Ionicons name="location-outline" size={20} color="#4F8EF7" />
          Location
        </Text>

        <Text style={styles.text}>
          <Ionicons name="briefcase-outline" size={25} color="#4F8EF7" />
          {selectedJob?.type}
        </Text>

        <Text style={styles.text}>
          <FontAwesome name="transgender" size={20} color="#4F8EF7" />
          {selectedJob?.gender}
        </Text>

        <Text style={styles.text}>
          <Ionicons name="star-outline" size={25} color="#4F8EF7" />
          Experience : {selectedJob?.experience}{' '}
        </Text>

        <Text style={styles.text}>
          <Entypo name="graduation-cap" size={25} color="#4F8EF7" />
          Education : {selectedJob?.education}
        </Text>

        <Text style={styles.text}>
          <Ionicons name="reader-outline" size={20} color="#4F8EF7" />
          Description : {selectedJob?.description}
        </Text>

        <Text>
          <Ionicons name="calendar-outline" size={20} color="#4F8EF7" />
          09:30 To 6:30 | Monday to Friday
        </Text>

        <Text>InterView Details</Text>

        <Text>
          <MCI name="clock-time-ten-outline" size={20} color="#4F8EF7" />
          InterviewTime
        </Text>

        {user.userType === 'Company' ? (
          <View>
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate('Job Post', {jobId: selectedJob._id})
              }
            />
            <Button
              title="Delete"
              onPress={() => dispatch(JobsAction.deleteJob(selectedJob?._id))}
            />
          </View>
        ) : (
          <Text />
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
  },
  Jobtitle: {
    fontSize: 26,
  },
  text: {
    margin: 5,
    fontSize: 16,
    color: '#051d5f',
  },
});
export default JobDetailsScreen;
