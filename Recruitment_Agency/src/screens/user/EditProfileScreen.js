import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import * as JobsAction from '../../redux/actions/jobs';
import * as userAction from '../../redux/actions/user';

const EditProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {userId} = route.params;
  const EditUser = useSelector(state =>
    state.user.userProfile.find(user => user?._id === userId),
  );

  const [firstName, setFirstName] = React.useState(EditUser.firstName);
  const [lastName, setLastName] = React.useState(EditUser.lastName);
  const [mobile, setMobile] = React.useState(EditUser.mobile);

  const updateHandler = async () => {
    const data = {
      firstName,
      lastName,
      mobile,
    };
    await dispatch(userAction.updateProfile(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit The Profile</Text>

      <FormInput
        labelValue={firstName}
        onChangeText={fname => setFirstName(fname)}
        placeholderText="First Name"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={lastName}
        onChangeText={lname => setLastName(lname)}
        placeholderText="Last Name"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={mobile}
        onChangeText={mobile => setMobile(mobile)}
        placeholderText="Mobile"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormButton buttonTitle="Update Profile" onPress={updateHandler} />
    </View>
  );
};

export default EditProfileScreen;

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
