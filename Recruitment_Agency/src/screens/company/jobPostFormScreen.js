import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import FormButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import * as JobsAction from '../../redux/actions/jobs';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';

const JobPostFormScreen = ({navigation, route}) => {
  const [Next, setNext] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [title, setTitle] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [checked, setChecked] = React.useState('first');
  const [gender, setGender] = React.useState(null);
  const [education, setEducation] = React.useState(null);
  const [minSalary, setMinSalary] = React.useState(null);
  const [maxSalary, setMaxSalary] = React.useState(null);
  const [experience, setExperience] = React.useState(null);
  const [description, setDescription] = React.useState(null);

  // const [address, setAddress] = React.useState(null);
  // const [city, setCity] = React.useState(null);
  // const [state, setState] = React.useState(null);

  const dispatch = useDispatch();

  // const {jobId} = route.params;
  // const selectedJob = useSelector(state =>
  //   state.jobs.userPostedJobs.find(job => job?._id === jobId),
  // );

  const onNext = () => {
    setNext(false);
  };
  const onPrevious = () => {
    setNext(true);
  };
  const postSubmit = async () => {
    const data = {
      title,
      type,
      gender,
      education,
      minSalary,
      maxSalary,
      experience,
      description,
    };
    await dispatch(JobsAction.createJob(data));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {Next ? (
          <View>
            <Text>I Want To Hire A</Text>
            <FormInput
              // labelText="I Want To Hire A"
              labelValue={title}
              error={isError}
              onChangeText={Title => setTitle(Title)}
              mode="outlined"
              // placeholderText="Title"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text>Job Type</Text>
            <FormInput
              // labelText="Job Type"
              labelValue={type}
              onChangeText={Type => setType(Type)}
              mode="outlined"
              error={isError}
              // placeholderText="Type"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text>Gender Of The Staff should Be</Text>
            <FormInput
              // labelText="Gender"
              labelValue={gender}
              onChangeText={Gender => setGender(Gender)}
              mode="outlined"
              error={isError}
              // placeholderText="Gender"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text>Education</Text>
            <FormInput
              labelText="Education"
              labelValue={education}
              onChangeText={Education => setEducation(Education)}
              mode="outlined"
              error={isError}
              // placeholderText="Education"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormButton buttonTitle="Next" onPress={onNext} />
          </View>
        ) : (
          <View>
            <View style={{flexDirection: 'row', width: '30%'}}>
              <FormInput
                labelText="Min Salary"
                labelValue={minSalary}
                onChangeText={Salary => setMinSalary(Salary)}
                mode="outlined"
                // placeholderText="Min Salary "
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text
                style={{
                  marginTop: '20%',
                  marginLeft: '20%',
                  marginRight: '20%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  color: 'gray',
                }}>
                to
              </Text>

              <FormInput
                labelText="Max Salary"
                labelValue={maxSalary}
                onChangeText={Salary => setMaxSalary(Salary)}
                mode="outlined"
                // placeholderText="Max Salary "
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <FormInput
              labelText="Experience"
              labelValue={experience}
              onChangeText={Experience => setExperience(Experience)}
              mode="outlined"
              // placeholderText="Exprerience "
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormButton buttonTitle="Previous" onPress={onPrevious} />
            <FormButton buttonTitle="Submit" onPress={postSubmit} />
          </View>
        )}
        {/* <FormInput
          labelText="Describe The Job Role For The Staff "
          labelValue={description}
          onChangeText={Description => setDescription(Description)}
          mode="outlined"
          // placeholderText="Description"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelText="Work Timings"
          labelValue={description}
          onChangeText={Description => setDescription(Description)}
          mode="outlined"
          placeholderText="09:30am - 06:30pm | Monday - Saturday"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelText="Interview Would Be Done Between"
          labelValue={description}
          onChangeText={Description => setDescription(Description)}
          mode="outlined"
          placeholderText="11:00am - 04:00pm | Monday - Saturday"
          autoCapitalize="none"
          autoCorrect={false}
        /> */}
      </ScrollView>
    </View>
  );
};

export default JobPostFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  input: {
    width: '50%',
  },
});
