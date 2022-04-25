import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import * as userAction from '../../redux/actions/user';
import FabButton from '../../components/FabButton';
import * as Progress from 'react-native-progress';
import Color from '../../constant/Color';

const CompanyFormScreen = ({navigation}) => {
  const [Next, setNext] = React.useState(true);
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

  const onNext = () => {
    setNext(false);
  };

  const onPrevious = () => {
    setNext(true);
  };

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
    await dispatch(userAction.updateProfile({data, navigation: navigation}));
  };

  return (
    <View style={styles.container}>
      {Next ? (
        <View>
          <View style={{marginBottom: 10}}>
            <Progress.Bar
              progress={0.5}
              width={Platform.OS === 'ios' ? 390 : 350}
            />
          </View>

          <View style={styles.stepName}>
            <Text style={{color: Color.accent}}>Company Details</Text>
            <Text>Company descriptions</Text>
          </View>

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
          </ScrollView>

          <FabButton
            style={styles.fab}
            iconName="chevron-right"
            onPress={onNext}
          />
        </View>
      ) : (
        <View>
          <View style={{marginBottom: 10}}>
            <Progress.Bar
              progress={1}
              width={Platform.OS === 'ios' ? 390 : 350}
            />
          </View>

          <View style={styles.stepName}>
            <Text>Company Details</Text>
            <Text style={{color: Color.accent}}>Company descriptions</Text>
          </View>

          <View style={{height: '86.5%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
            </ScrollView>
          </View>

          <View
            style={{...styles.buttonContainer, flexDirection: 'row-reverse'}}>
            <FabButton
              style={{...styles.onPrevious, left: 214}}
              color="gray"
              iconName="chevron-left"
              onPress={onPrevious}
            />
            <AppButton
              style={styles.submitBtn}
              buttonTitle={'Update'}
              onPress={() => postSubmit(selectedJob?._id)}
            />
          </View>
        </View>
      )}
    </View>

    // <View style={{padding: 20, backgroundColor: Color.app}}>
    //   <ScrollView showsVerticalScrollIndicator={false}>

    //     <AppButton
    //       buttonTitle="Update"
    //       style={{width: '100%'}}
    //       onPress={postSubmit}
    //     />
    //   </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.app,
  },
  stepName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 30,
  },
  inputName: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    // color: '#051d5f',
  },
  input: {
    width: '50%',
  },
  to: {
    marginTop: '20%',
    marginLeft: '20%',
    marginRight: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    color: 'gray',
  },
  fab: {
    bottom: -50,
  },
  buttonContainer: {
    marginVertical: 700,
    position: 'absolute',
  },
  onPrevious: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'gray',
  },
  submitBtn: {
    left: -190,
    // bottom: -90,
    width: '50%',
  },
});
export default CompanyFormScreen;
