import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import FormButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import * as JobsAction from '../../redux/actions/jobs';

const JobPostFormScreen = ({navigation, route}) => {
  const [title, setTitle] = React.useState(null);
  const [type, setType] = React.useState(null);
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
      <Text style={styles.text}>Post Your Job</Text>

      <FormInput
        // labelValue={selectedJob ? selectedJob.title : title}
        labelValue={title}
        onChangeText={Title => setTitle(Title)}
        placeholderText="Title"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        // labelValue={selectedJob ? selectedJob.type : type}
        labelValue={type}
        onChangeText={Type => setType(Type)}
        placeholderText="Type"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        // labelValue={selectedJob ? selectedJob.gender : gender}
        labelValue={gender}
        onChangeText={Gender => setGender(Gender)}
        placeholderText="Gender"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        // labelValue={selectedJob ? selectedJob.education : education}
        labelValue={education}
        onChangeText={Education => setEducation(Education)}
        placeholderText="Education"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        // labelValue={selectedJob ? selectedJob.minSalary : minSalary}
        labelValue={minSalary}
        onChangeText={Salary => setMinSalary(Salary)}
        placeholderText="Min Salary "
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        // labelValue={selectedJob ? selectedJob.maxSalary : maxSalary}
        labelValue={maxSalary}
        onChangeText={Salary => setMaxSalary(Salary)}
        placeholderText="Max Salary "
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        // labelValue={selectedJob ? selectedJob.experience : experience}
        labelValue={experience}
        onChangeText={Experience => setExperience(Experience)}
        placeholderText="Exprerience "
        autoCapitalize="none"
        autoCorrect={false}
      />
      {/* <FormInput
        labelValue={city}
        onChangeText={City => setEmail(City)}
        placeholderText="City"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={state}
        onChangeText={State => setEmail(State)}
        placeholderText="State"
        autoCapitalize="none"
        autoCorrect={false}
      /> */}
      <FormInput
        // labelValue={selectedJob ? selectedJob.description : description}
        labelValue={description}
        onChangeText={Description => setDescription(Description)}
        placeholderText="Description"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormButton buttonTitle="Submit" onPress={postSubmit} />
    </View>
  );
};

export default JobPostFormScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
});
