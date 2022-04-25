import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as appliesAction from '../../redux/actions/application';
import JobCard from '../../components/jobCard';
import Color from '../../constant/Color';
const ApplicationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs.availableJobs);
  const [applies, setApplies] = React.useState([]);

  React.useEffect(() => {
    dispatch(appliesAction.fetchUserApplication()).then(res => {
      const apply = res.map(res => res.jobId);
      const jobsData = jobs.filter(job => apply.includes(job._id));
      setApplies(jobsData);
    });
  }, []);

  console.log(applies);

  if (applies.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No Data Available !</Text>
      </View>
    );
  }
  return <JobCard data={applies} navigation={navigation} />;
};

export default ApplicationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.app,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
