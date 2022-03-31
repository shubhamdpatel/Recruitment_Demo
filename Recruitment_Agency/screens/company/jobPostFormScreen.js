import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';

const JobPostFormScreen = ({navigation}) => {
  const [title, setTitle] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [education, setEducation] = React.useState(null);
  const [salary, setSalary] = React.useState(null);
  const [exprerience, setExprerience] = React.useState(null);

  // const [address, setAddress] = React.useState(null);
  // const [city, setCity] = React.useState(null);
  // const [state, setState] = React.useState(null);
  const [description, setDescription] = React.useState(null);

  const postSubmit = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Post Your Job</Text>

      <FormInput
        labelValue={title}
        onChangeText={Title => setTitle(Title)}
        placeholderText="Title"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={type}
        onChangeText={Type => setType(Type)}
        placeholderText="Type"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={gender}
        onChangeText={Gender => setGender(Gender)}
        placeholderText="Gender"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={education}
        onChangeText={Education => setEducation(Education)}
        placeholderText="Education"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={salary}
        onChangeText={Salary => setSalary(Salary)}
        placeholderText="Salary "
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={exprerience}
        onChangeText={Exprerience => setExprerience(Exprerience)}
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
