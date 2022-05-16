import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as JobsAction from '../../redux/actions/jobs';
import * as userAction from '../../redux/actions/user';
import * as applicatonAction from '../../redux/actions/application';
import Color from '../../constant/Color';
import AppButton from '../../components/AppButton';

//Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const JobDetailsScreen = ({route, navigation}) => {
  const [isApplied, setIsApplied] = React.useState(false);
  const jobId = route?.params.params.jobId;
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const userData = useSelector(state => state.user.userProfile[0]);

  let selectedJob;
  let fav;

  if (user.userType === 'Jober') {
    selectedJob = useSelector(state =>
      state.jobs.availableJobs.find(job => job?._id === jobId),
    );
    fav = userData?.favourites.includes(selectedJob._id);
  } else {
    selectedJob = useSelector(state =>
      state.jobs.availableJobs.find(job => job?._id === jobId),
    );
  }
  const [isFavourite, setIsFavourite] = React.useState(fav);

  const jobDelete = id => {
    Alert.alert('Are you sure?', 'Are sure you want to delete this job?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(JobsAction.deleteJob({id, navigation: navigation}));
        },
      },
    ]);
  };

  React.useLayoutEffect(() => {
    {
      user.userType === 'Company'
        ? navigation.setOptions({
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <MCI
                  name="circle-edit-outline"
                  style={{marginHorizontal: 20}}
                  size={30}
                  color="white"
                  onPress={() =>
                    navigation.navigate('Job Post', {jobId: selectedJob._id})
                  }
                />
                <MCI
                  name="delete-outline"
                  size={30}
                  color="white"
                  onPress={() => jobDelete(selectedJob?._id)}
                />
              </View>
            ),
          })
        : navigation.setOptions({
            headerRight: '',
          });
    }
  }, [navigation]);

  const addFavourite = async id => {
    if (isFavourite) {
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
    }
    await dispatch(userAction.favourite(id));
  };

  const applyHandler = async jobid => {
    const data = {jobId: jobid};
    if (isApplied) {
      setIsApplied(false);
    } else {
      setIsApplied(true);
      await dispatch(applicatonAction.applyJob(data));
    }
  };

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    // <ScrollView style={{padding: 20}} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.Jobtitle}>{selectedJob?.title}</Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.salary}>
            Rs. {selectedJob?.minSalary.substring(0, 2)}k -{' '}
            {selectedJob?.maxSalary.substring(0, 2)}k
          </Text>

          <Text style={{...styles.openings, marginLeft: '8%'}}>
            {selectedJob?.noOfOpenings} Openings
          </Text>

          {user.userType === 'Jober' && (
            <View style={{marginLeft: '10%'}}>
              <TouchableCmp
                style={styles.favourite}
                onPress={() => addFavourite(selectedJob?._id)}>
                <Ionicons
                  name={isFavourite ? 'heart' : 'heart-outline'}
                  size={35}
                  color="#4F8EF7"
                  style={{left: Platform.OS === 'android' ? 10 : 0}}
                />
              </TouchableCmp>
              <Text style={{color: 'black'}}>Favourite</Text>
            </View>
          )}
        </View>
      </View>

      <View style={{height: '83%'}}>
        <ScrollView
          style={{paddingHorizontal: 10}}
          showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: '10%'}}>
            <View style={styles.element}>
              <View style={{flexDirection: 'row', width: '55%'}}>
                <Ionicons name="location-outline" size={30} color="#4F8EF7" />
                <View style={{marginHorizontal: 10}}>
                  <Text style={styles.textHeading}>Location</Text>
                  <Text style={styles.text}>Ahemdabad</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', width: '50%'}}>
                <Ionicons name="briefcase-outline" size={30} color="#4F8EF7" />
                <View style={{marginHorizontal: 10}}>
                  <Text style={styles.textHeading}>Job Type</Text>
                  <Text style={styles.text}>{selectedJob?.type}</Text>
                </View>
              </View>
            </View>

            <View style={{...styles.element, marginVertical: '5%'}}>
              <View style={{flexDirection: 'row', width: '55%'}}>
                <FontAwesome name="transgender" size={30} color="#4F8EF7" />
                <View style={{marginHorizontal: 10}}>
                  <Text style={styles.textHeading}>Gender</Text>
                  <Text style={styles.text}>
                    {selectedJob?.gender === 'Both'
                      ? 'Male, Female'
                      : selectedJob?.gender}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', width: '50%'}}>
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
                  <Text style={styles.text}>{selectedJob?.description}</Text>
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

          <View style={styles.heading}>
            <Text
              style={{
                fontSize: 19,
                marginBottom: 10,
                color: 'black',
              }}>
              INTERVIEW DETAILS
            </Text>
          </View>

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
                <Text style={styles.text}>{userData?.contactPerson}</Text>
              </View>
            </View>
          </View>

          {user.userType === 'Jober' && (
            <View>
              <View
                style={{
                  justifyContent: 'center',
                  marginHorizontal: '8%',
                  marginVertical: '10%',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <MCI name="message-reply-text" size={30} color="#4F8EF7" />
                  <View style={{marginHorizontal: 10}}>
                    <Text style={{fontSize: 14, color: 'gray'}}>
                      Don't pay any money to HR if not mentioned in job details
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{paddingBottom: 100}}>
                <AppButton
                  buttonTitle={isApplied ? 'Applied Cancel' : 'Apply For Job'}
                  style={{
                    ...styles.applyBtn,
                    backgroundColor: isApplied ? 'green' : Color.primary,
                  }}
                  onPress={() => applyHandler(selectedJob?._id)}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: Color.app},
  bodyContainer: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 15,
  },
  Jobtitle: {
    fontSize: 28,
    fontWeight: '500',
    color: 'black',
  },
  salary: {
    fontSize: 17,
    marginVertical: '5%',
    color: 'black',
  },
  openings: {
    fontSize: 16,
    marginVertical: '5%',
    marginRight: '15%',
    color: 'black',
  },
  favourite: {
    alignItems: 'center',
    color: 'black',
  },
  element: {
    flex: 1,
    flexDirection: 'row',
  },
  textHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  heading: {
    fontSize: 19,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  applyBtn: {
    width: '100%',
    height: Platform.OS === 'android' ? '35%' : '37%',
  },
});

export default JobDetailsScreen;
