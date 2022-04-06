import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as JobsAction from '../../redux/actions/jobs';

const JobListScreen = ({navigation}) => {
  const user = useSelector(state => state.auth.user);

  // Get data from Store by user type
  let jobs;
  if (user.userType === 'Company')
    jobs = useSelector(state => state.jobs.userPostedJobs);
  else jobs = useSelector(state => state.jobs.availableJobs);

  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    {
      user.userType === 'Company'
        ? navigation.setOptions({
            headerRight: () => (
              <Button
                title="Add Job"
                onPress={() => navigation.navigate('Job Post')}
              />
            ),
          })
        : navigation.setOptions({
            headerRight: '',
          });
    }
  }, [navigation]);

  // Fetch Data
  const fetchPost = async () => {
    await dispatch(JobsAction.fetchJobs());
  };

  // Call Fetch Data on Screen Load
  React.useEffect(() => {
    fetchPost();
  }, []);

  // Pass jobId for show single job Data
  const selectJobHandeler = async id => {
    await navigation.navigate('Job Details', {jobId: id});
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Opening Jobs</Text> */}
      <FlatList
        data={jobs}
        keyExtractor={(index, item) => index._id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => selectJobHandeler(item?._id)}>
            <Text style={styles.text}>Title: {item?.title}</Text>
            <Text style={styles.text}>
              Salary : {item?.maxSalary} - {item?.maxSalary}
            </Text>
            <Text style={styles.text}>
              Experience : {item?.experience} Year
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default JobListScreen;

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#051d5f',
  },
});
