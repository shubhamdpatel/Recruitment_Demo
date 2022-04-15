import React from 'react';
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as JobsAction from '../../redux/actions/jobs';
import Color from '../../constant/Color';
import AppButton from '../../components/AppButton';
import {Divider} from 'react-native-paper';

//Icons
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
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

  React.useLayoutEffect(() => {
    {
      user.userType === 'Company'
        ? navigation.setOptions({
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <Button
                  title="Edit"
                  color="white"
                  onPress={() =>
                    navigation.navigate('Job Post', {jobId: selectedJob._id})
                  }
                />
                <Button
                  title="Delete"
                  color="white"
                  onPress={() =>
                    dispatch(JobsAction.deleteJob(selectedJob?._id))
                  }
                />
              </View>
            ),
          })
        : navigation.setOptions({
            headerRight: '',
          });
    }
  }, [navigation]);

  return (
    // <ScrollView style={{padding: 20}}>
    <View style={{padding: 10}}>
      <View style={styles.container}>
        <Text style={styles.Jobtitle}>{selectedJob?.title}</Text>

        <View style={styles.view2nd}>
          <Text style={styles.salary}>
            Rs. {selectedJob?.minSalary} - {selectedJob?.maxSalary}
          </Text>

          <Text style={styles.openings}>
            {selectedJob?.noOfOpenings} Openings
          </Text>
          <View style={styles.favourite}>
            <Ionicons name="heart-outline" size={35} color="#4F8EF7" />
            <Text>Favourite</Text>
          </View>
        </View>
      </View>

      <ScrollView style={{paddingLeft: 10}}>
        <View style={{marginVertical: '10%'}}>
          <View style={styles.element}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="location-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Location</Text>
                <Text style={styles.text}>Ahemdabad</Text>
              </View>
            </View>

            <View style={{...styles.element, marginHorizontal: '20%'}}>
              <Ionicons name="briefcase-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Job Type</Text>
                <Text style={styles.text}>{selectedJob?.type}</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element, marginVertical: '5%'}}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome name="transgender" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Gender</Text>
                <Text style={styles.text}>{selectedJob?.gender}</Text>
              </View>
            </View>

            <View style={{...styles.element, marginHorizontal: '20%'}}>
              <Ionicons name="star-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Experience</Text>
                <Text style={styles.text}>{selectedJob?.experience}</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome name="graduation-cap" size={20} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Education</Text>
                <Text style={styles.text}>{selectedJob?.education}</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row', marginVertical: '5%'}}>
              <Ionicons name="reader-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Job Info</Text>
                <Text style={{...styles.text}}>{selectedJob?.description}</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="calendar-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Job Timing</Text>
                <Text style={styles.text}>{selectedJob?.workTime}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={{fontSize: 19}}>INTERVIEW DETAILS</Text>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />

        <View style={{...styles.element, marginVertical: 15}}>
          <View style={{flexDirection: 'row'}}>
            <MCI name="clock-time-ten-outline" size={30} color="#4F8EF7" />
            <View style={{marginHorizontal: 10}}>
              <Text style={styles.textHeading}>Interview Time</Text>
              <Text style={styles.text}>{selectedJob?.interviewTime}</Text>
            </View>
          </View>
        </View>

        <View style={{...styles.element}}>
          <View style={{flexDirection: 'row'}}>
            <Feather name="phone" size={30} color="#4F8EF7" />
            <View style={{marginHorizontal: 10}}>
              <Text style={styles.textHeading}>Contact Person</Text>
              <Text style={styles.text}>Mr. Shubham Patel</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: '8%',
            marginVertical: '15%',
          }}>
          <View style={{flexDirection: 'row'}}>
            <MCI name="message-reply-text" size={30} color="#4F8EF7" />
            <View style={{marginHorizontal: 10}}>
              <Text style={{fontSize: 14}}>
                Don't pay any money to HR if not mentioned in job details
              </Text>
            </View>
          </View>
        </View>

        <AppButton buttonTitle="Apply For Job" />
      </ScrollView>
    </View>
    // </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 15,
    // marginLeft: 10,
    // marginRight: 10,
    // marginBottom: 10,
  },
  Jobtitle: {
    fontSize: 28,
    fontWeight: '500',
  },
  view2nd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  salary: {
    fontSize: 17,
    marginVertical: '5%',
  },
  openings: {
    fontSize: 16,
    marginVertical: '5%',
    marginRight: '15%',
  },
  favourite: {
    alignItems: 'center',
  },
  element: {
    flex: 1,
    flexDirection: 'row',
  },
  textHeading: {
    fontSize: 16,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
  },
});
export default JobDetailsScreen;
