import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import * as userAction from '../../redux/actions/user';
import Color from '../../constant/Color';

const CompanyFormScreen = ({navigation}) => {
  const company = useSelector(state => state.user.userProfile[0]);

  const [companyName, setCompanyName] = React.useState(
    company?.companyName ? company?.companyName : '',
  );
  const [contactPerson, setContactPerson] = React.useState(
    company?.contactPerson ? company?.contactPerson : '',
  );
  const [email, setEmail] = React.useState(
    company?.email ? company?.email : '',
  );
  const [mobile, setMobile] = React.useState(
    company?.mobile ? company?.mobile : '',
  );
  const [about, setAbout] = React.useState(
    company?.about ? company?.about : '',
  );
  const [address, setAddress] = React.useState(
    company?.address ? company?.address : '',
  );
  const [state, setState] = React.useState(
    company?.state ? company?.state : '',
  );
  const [country, setCountry] = React.useState(
    company?.country ? company?.country : '',
  );
  const [website, setWebsite] = React.useState(
    company?.website ? company?.website : '',
  );

  const dispatch = useDispatch();
  const postSubmit = async () => {
    const data = {
      companyName,
      contactPerson,
      mobile,
      about,
      address,
      state,
      country,
      website,
    };
    await dispatch(userAction.updateProfile(data));
    // navigation.navigate('Company Form');
  };

  return (
    <View style={{padding: 20,backgroundColor:Color.app}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.inputName}>Name Of My Company</Text>
        <FormInput
          labelValue={companyName}
          //   error={''}
          onChangeText={CompanyName => setCompanyName(CompanyName)}
          mode="outlined"
          //   placeholderText="Ex. Company Manager"

          autoCorrect={false}
        />
        <Text style={styles.inputName}>Contact Person</Text>
        <FormInput
          labelValue={contactPerson}
          onChangeText={ContactPerson => setContactPerson(ContactPerson)}
          mode="outlined"
          //   error={''}
          //   placeholderText="Ex. Full-Time | Part Time"

          autoCorrect={false}
        />
        <Text style={styles.inputName}>Emial Id</Text>
        <FormInput
          labelValue={email}
          onChangeText={Email => setEmail(Email)}
          mode="outlined"
          disabled
          //   error={''}
          //   placeholderText="Ex. Male | Female"

          autoCorrect={false}
        />
        <Text style={styles.inputName}>Mobile Number </Text>
        <FormInput
          labelValue={mobile}
          onChangeText={Mobile => setMobile(Mobile)}
          mode="outlined"
          //   error={''}
          //   placeholderText="Ex. Bachlor"
          autoCorrect={false}
        />
        <Text style={styles.inputName}>Website</Text>
        <FormInput
          labelValue={website}
          onChangeText={Website => setWebsite(Website)}
          mode="outlined"
          //   error={''}
          //   placeholderText="Ex. Bachlor"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.inputName}>About Us</Text>
        <FormInput
          labelValue={about}
          onChangeText={About => setAbout(About)}
          multiline
          mode="outlined"
          //   placeholderText="Ex. 0-6 Months | 1-2 Years"
          autoCorrect={false}
        />
        <Text style={styles.inputName}>My Company Address</Text>
        <FormInput
          labelValue={address}
          onChangeText={Address => setAddress(Address)}
          mode="outlined"
          multiline
          //   placeholderText="Ex. 0-6 Months | 1-2 Years"
          autoCorrect={false}
        />

        <Text style={styles.inputName}>State</Text>
        <FormInput
          labelValue={state}
          onChangeText={State => setState(State)}
          mode="outlined"
          //   placeholderText="Ex. 0-6 Months | 1-2 Years"
          autoCorrect={false}
        />
        <Text style={styles.inputName}>Country</Text>
        <FormInput
          labelValue={country}
          onChangeText={Country => setCountry(Country)}
          mode="outlined"
          //   placeholderText="Ex. 0-6 Months | 1-2 Years
          autoCorrect={false}
        />
        <AppButton
          buttonTitle="Submit"
          style={{width: '100%'}}
          onPress={postSubmit}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputName: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    // color: '#051d5f',
  },
});
export default CompanyFormScreen;
