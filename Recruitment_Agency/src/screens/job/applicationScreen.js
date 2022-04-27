import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import * as appliesAction from '../../redux/actions/application';
import FA from 'react-native-vector-icons/FontAwesome';
import JobCard from '../../components/jobCard';
import Color from '../../constant/Color';

const ApplicationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.application.userApplication);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(appliesAction.fetchUserApplication());
    }, []),
  );

  // console.log(applies);

  if (jobs.length === 0) {
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
  return <JobCard data={jobs} navigation={navigation} />;
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
