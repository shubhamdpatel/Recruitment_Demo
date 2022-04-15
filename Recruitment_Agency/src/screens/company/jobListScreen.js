import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Title, Paragraph, Text} from 'react-native-paper';
import * as JobsAction from '../../redux/actions/jobs';
import Color from '../../constant/Color';
import {Icon} from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import FabButton from '../../components/FabButton';

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
            headerRight: <Ionicons name="home" size={20} color="white" />,
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
  const selectJobHandeler = async (id, cid) => {
    {
      user.userType === 'Jober'
        ? await navigation.navigate('JC Details', {
            params: {jobId: id, cid},
          })
        : await navigation.navigate('Job Details', {params: {jobId: id, cid}});
    }
  };

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(index, item) => index._id}
        renderItem={({item}) => (
          <TouchableCmp onPress={() => selectJobHandeler(item?._id, item?.cid)}>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.card1stView}>
                  <Title>{item?.title}</Title>
                  <Title style={{color: '#0080ff', fontSize: 18}}>
                    Rs 3 - 4 LPA
                    {/* {item?.maxSalary} - {item?.maxSalary} */}
                  </Title>
                </View>

                <View style={styles.card2ndView}>
                  {/* <Text style={styles.text}>{item?.experience}</Text> */}
                  <Text style={styles.text}>0-6 Month</Text>
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
      />

      {user.userType === 'Company' && (
        // <ActionButton
        //   Icon=''
        //   buttonColor={Color.accent}
        //   onPress={() => navigation.navigate('Job Post')}
        // />
        <FabButton
          iconName="plus"
          onPress={() => navigation.navigate('Job Post', {params: {jobId: ''}})}
        />
        // <FAB
        //   style={styles.fab}
        //   icon="plus"
        //   onPress={() => navigation.navigate('Job Post')}
        // />
      )}
    </View>
  );
};

export default JobListScreen;

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 8, height: 5},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    // padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
  },
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
  // fab: {
  //   position: 'absolute',
  //   backgroundColor: Color.accent,
  //   margin: 20,
  //   right: 5,
  //   bottom: 20,
  // },
});
