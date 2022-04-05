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
  const [loading, setLoading] = React.useState(true);

  const jobs = useSelector(state => state.jobs.userPostedJobs);
  const dispatch = useDispatch();

  // Fetch Data
  const fetchPost = async () => {
    await dispatch(JobsAction.fetchJobsDetailsByCompany());
  };

  // Call Fetch Data on Screen Load
  React.useEffect(() => {
    fetchPost();
  }, []);

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
            onPress={() => selectJobHandeler(item._id)}>
            <Text style={styles.text}>Title: {item.title}</Text>
            <Text style={styles.text}>
              Salary : {item.maxSalary} - {item.maxSalary}
            </Text>
            <Text style={styles.text}>Experience : {item.experience} Year</Text>
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
