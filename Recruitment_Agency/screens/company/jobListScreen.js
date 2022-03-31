import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const JobListScreen = () => {
  const [jobs, setJobs] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Fetch Data
  const fetchPost = async () => {
    try {
      const JobsList = [];
      await firestore()
        .collection('Jobs')
        .doc('LaNet')
        .collection('JobPost')
        .get()
        .then(querySnapshort => {
          querySnapshort.forEach(doc => {
            // console.log('Jobs : ', doc.data());
            const {
              companyId,
              title,
              type,
              gender,
              salary,
              education,
              exprerience,
              description,
              postTime,
              // status
            } = doc.data();
            JobsList.push({
              id: doc.id,
              companyId,
              title,
              type,
              gender,
              salary,
              education,
              exprerience,
              description,
              postTime,
              // status
            });
          });
        });

      setJobs(JobsList);

      if (loading) {
        setLoading(false);
      }
      // console.log('Jobs: ', jobs);
    } catch (e) {
      console.log(e);
    }
  };

  // Call Fetch Data on Screen Load
  React.useEffect(() => {
    fetchPost();
  }, []);

  return (
    <View>
      <Text style={styles.text}>Your Opening Jobs</Text>
      <FlatList
        data={jobs}
        keyExtractor={(index, item) => index.id}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text>Id : {item.id}</Text>
            <Text>Company : {item.companyId}</Text>
            <Text>Title : {item.title}</Text>
            <Text>Type : {item.type}</Text>
            <Text>Salary : {item.salary}</Text>
            <Text>Gender : {item.gender}</Text>
            <Text>Description : {item.description}</Text>
            <Text>Education : {item.education}</Text>
            <Text>Experience : {item.exprerience}</Text>
            {/* <Text>{item.postTime}</Text> */}
          </View>
        )}
      />
    </View>
  );
};

export default JobListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#051d5f',
  },
});
