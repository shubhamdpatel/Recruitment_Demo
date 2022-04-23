import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';
import Color from '../constant/Color';
import {Card, Title, Paragraph, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';

const JobCard = props => {
  const user = useSelector(state => state.auth.user);
  const {data, navigation} = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  // Pass jobId,companyId for show single job Data and Company Data of job
  const selectJobHandeler = (id, cid) => {
    {
      user?.userType === 'Jober'
        ? navigation.navigate('JC Details', {
            params: {jobId: id, cid},
          })
        : navigation.navigate('Job Details', {params: {jobId: id, cid}});
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(index, item) => index._id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableCmp
            style={{marginTop: 15}}
            onPress={() => selectJobHandeler(item?._id, item?.cid)}>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
    // marginBottom: 10,
  },
  container: {
    backgroundColor: Color.app,
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
});

export default JobCard;
