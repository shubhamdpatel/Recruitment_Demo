import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';

const CompanyFormScreen = () => {
  const [companyName, setCompanyName] = React.useState('');
  const [contactPerson, setContactPerson] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [website, setWebsite] = React.useState('');
  return (
    <View style={{padding: 20}}>
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
        <AppButton buttonTitle="Submit" style={{width: '100%'}} />
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
