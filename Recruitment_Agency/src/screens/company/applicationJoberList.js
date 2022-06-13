import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  FlatList,
  Platform,
} from 'react-native';
import {Card, Title, Paragraph, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Color from '../../constant/Color';
import * as appliesAction from '../../redux/actions/application';

const ApplicationJoberList = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [applicant, setApplicant] = React.useState();
  const jobId = route?.params?.params?.jobId;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(appliesAction.fetchUserApplicant(jobId)).then(res => {
        setApplicant(res);
      });
    }, []),
  );

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const selectJoberHandeler = id => {
    navigation.navigate('Jober Profile', {
      params: {joberId: id},
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={applicant}
        keyExtractor={(index, item) => index._id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableCmp onPress={() => selectJoberHandeler(item?._id)}>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.card1stView}>
                  <Title>{item?.fullName}</Title>
                  {/* <Title style={{color: '#0080ff', fontSize: 18}}>
                    {item?.expectedSalary}
                  </Title> */}
                </View>

                <View style={styles.card2ndView}>
                  <Text style={styles.text}>{item?.experience}</Text>
                  <Text style={styles.text}>{item?.educationLevelDegree}</Text>
                </View>

                <Paragraph>
                  {item?.myBio.slice(0, 50)}
                  {item?.myBio.length > 50 ? <Text>...</Text> : ''}
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
    marginBottom: 2,
    marginTop: 15,
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

export default ApplicationJoberList;
