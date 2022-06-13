import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import * as appliesAction from '../../redux/actions/application';
import FA from 'react-native-vector-icons/FontAwesome';
import JobCard from '../../components/jobCard';
import Color from '../../constant/Color';
import Loader from '../Loader';

const ApplicationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.application.userApplication);
  const userType = useSelector(state => state.auth.user.userType);

  const [isLoading, setIsLoding] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(appliesAction.fetchUserApplication());
    }, []),
  );

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoding(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (jobs.length === 0) {
    return (
      <View style={styles.container}>
        <FA name="send" size={40} color={Color.accent} />
        {userType === 'Jober' ? (
          <View>
            <Text style={styles.heding}>You do not apply any jobs</Text>
            <Text style={styles.text}>Apply jobs from your list</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.heding}>Not a single application.</Text>
          </View>
        )}
      </View>
    );
  }
  return <JobCard data={jobs} navigation={navigation} apply={true} />;
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
    color: 'black',
  },
  text: {
    marginBottom: '5%',
    color: 'black',
    textAlign: 'center',
  },
  btn: {
    height: '6%',
    width: '35%',
  },
});
