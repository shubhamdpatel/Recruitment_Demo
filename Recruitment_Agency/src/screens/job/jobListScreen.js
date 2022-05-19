import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import Loader from '../Loader';
import FabButton from '../../components/FabButton';
import Icon from 'react-native-vector-icons/Octicons';
import Color from '../../constant/Color';
import * as JobsAction from '../../redux/actions/jobs';
import {Card, Title, Paragraph, Text} from 'react-native-paper';

const JobListScreen = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoding] = React.useState(true);
  const jobs = useSelector(state => state.jobs);
  const dispatch = useDispatch();

  const [allJobs, setAllJobs] = React.useState([]);
  const [isSkip, setIsSkip] = React.useState(0);
  const limit = 10;

  // Fetch Data
  const fetchPost = async () => {
    setAllJobs([]);
    const query = {skip: isSkip, limit};
    await dispatch(JobsAction.fetchJobs(query));
  };

  React.useEffect(() => {
    setAllJobs([...allJobs, ...jobs.availableJobs]);
  }, [jobs.availableJobs]);

  useFocusEffect(
    React.useCallback(() => {
      fetchPost();
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

  const selectJobHandeler = (id, cid) => {
    {
      user?.userType === 'Jober'
        ? navigation.navigate('JC Details', {
            params: {jobId: id, cid},
          })
        : navigation.navigate('Job Details', {params: {jobId: id, cid}});
    }
  };

  if (allJobs.length === 0) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.heding}>You have not post any jobs</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text1}>Click On </Text>
            <Icon name="plus-circle" color={Color.primary} size={16} />
            <Text> Add Jobs</Text>
          </View>
        </View>
        <View>
          <FabButton
            iconName="plus"
            onPress={() =>
              navigation.navigate('Job Post', {params: {jobId: ''}})
            }
          />
        </View>
      </View>
    );
  }

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={allJobs}
        keyExtractor={(index, item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableCmp onPress={() => selectJobHandeler(item?._id, item?.cid)}>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.card1stView}>
                  <Title>{item?.title}</Title>
                  <Title style={{color: '#0080ff', fontSize: 18}}>
                    {/* Rs 3 - 4 LPA */}
                    Rs {item?.minSalary.substring(0, 2)}k -{' '}
                    {item?.maxSalary.substring(0, 2)}k
                  </Title>
                </View>

                <View style={styles.card2ndView}>
                  {/* <Text style={styles.text}>{item?.experience}</Text> */}
                  <Text style={styles.text}>{item?.experience}</Text>
                  <Text style={styles.text}>{item?.education}</Text>
                </View>

                <Paragraph>
                  {item?.description.slice(0, 50)}
                  {item?.description.length > 50 ? <Text>...</Text> : ''}
                </Paragraph>
              </Card.Content>
            </Card>
          </TouchableCmp>
        )}
        onEndReached={() => {
          const data = isSkip + limit;
          console.log(isSkip);
          setIsSkip(data);
          dispatch(JobsAction.fetchJobs({skip: data, limit}));
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          jobs.DataFlag && (
            <ActivityIndicator size="large" color={Color.primary} />
          )
        }
      />
      {user?.userType === 'Company' && (
        <View>
          <FabButton
            style={styles.fab}
            iconName="plus"
            onPress={() =>
              navigation.navigate('Job Post', {params: {jobId: ''}})
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  text1: {
    marginBottom: '5%',
  },
  fab: {
    position: 'absolute',
    left: '72%',
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    // padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2,
    marginTop: 15,
  },
  // container: {
  //   backgroundColor: Color.app,
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  card1stView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card2ndView: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    padding: 4,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    marginEnd: 10,
    borderRadius: 3,
    elevation: 0,
    color: '#787878',
  },
});
export default JobListScreen;
