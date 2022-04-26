import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as appliesAction from '../../redux/actions/application';
import FA from 'react-native-vector-icons/FontAwesome';

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

  // console.log(applies);

  if (applies.length === 0) {
    return (
      <View style={styles.container}>
        <FA name="send" size={40} color={Color.accent} />
        <Text style={styles.heding}>You do not apply any jobs</Text>
        <Text style={styles.text}>Apply jobs from your list</Text>
        {/* <AppButton
          buttonTitle="Look For jobs"
          style={styles.btn}
          onPress={() => navigation.goBack()}
        /> */}
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
  heding: {
    fontSize: 19,
    fontWeight: '500',
    marginBottom: '5%',
    marginTop: '5%',
  },
  text: {
    marginBottom: '5%',
  },
  btn: {
    height: '6%',
    width: '35%',
  },
});
