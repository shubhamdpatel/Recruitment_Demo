import React from 'react';
import {StyleSheet, Text, View, ScrollView, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import FabButton from '../../components/FabButton';
import Color from '../../constant/Color';
import * as userAction from '../../redux/actions/user';
import * as Progress from 'react-native-progress';

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

  const [error, setError] = React.useState({
    EcompanyName: false,
    EcontactPerson: false,
    Emobile: false,
    Ewebsite: false,
    Eabout: false,
    Eaddress: false,
    Estate: false,
    Ecountry: false,
  });

  const onNext = () => {
    if (companyName === '') {
      setError({EcompanyName: true});
    } else if (contactPerson === '') {
      setError({EcontactPerson: true});
    } else if (mobile === '') {
      setError({Emobile: true});
    } else if (website === '') {
      setError({Ewebsite: true});
    } else {
      setNext(false);
    }
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
      website,
      about,
      address,
      state,
      country,
    };

    if (about === '') {
      setError({Eabout: true});
    } else if (address === '') {
      setError({Eaddress: true});
    } else if (state === '') {
      setError({Estate: true});
    } else if (country === '') {
      setError({Ecountry: true});
    } else {
      await dispatch(userAction.updateProfile({data, navigation: navigation}));
    }
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
            <Text style={{color: 'black'}}>Company descriptions</Text>
          </View>

          <View style={{height: '86%'}}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputName}>Name Of My Company</Text>
              <FormInput
                labelValue={companyName}
                error={error?.EcompanyName}
                onChangeText={CompanyName => setCompanyName(CompanyName)}
                mode="outlined"
                placeholderText="Ex. Company Name"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    EcompanyName: false,
                  })
                }
              />

              <Text style={styles.inputName}>Contact Person</Text>
              <FormInput
                labelValue={contactPerson}
                onChangeText={ContactPerson => setContactPerson(ContactPerson)}
                mode="outlined"
                error={error?.EcontactPerson}
                placeholderText="Ex. Mr./Ms. XYZ"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    EcontactPerson: false,
                  })
                }
              />

              <Text style={styles.inputName}>Emial Id</Text>
              <FormInput
                labelValue={email}
                onChangeText={Email => setEmail(Email)}
                mode="outlined"
                disabled
                autoCorrect={false}
              />

              <Text style={styles.inputName}>Mobile Number </Text>
              <FormInput
                labelValue={mobile}
                onChangeText={Mobile => setMobile(Mobile)}
                mode="outlined"
                error={error?.Emobile}
                // placeholderText="Ex. "
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    Emobile: false,
                  })
                }
              />

              <Text style={styles.inputName}>Website</Text>
              <FormInput
                labelValue={website}
                onChangeText={Website => setWebsite(Website)}
                mode="outlined"
                error={error?.Ewebsite}
                placeholderText="Ex. https//:www.xyz.com"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    Ewebsite: false,
                  })
                }
              />
            </KeyboardAwareScrollView>
          </View>

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
            <Text style={{color: 'black'}}>Company Details</Text>
            <Text style={{color: Color.accent}}>Company descriptions</Text>
          </View>

          <View style={{height: '86.5%'}}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputName}>About Us</Text>
              <FormInput
                labelValue={about}
                onChangeText={About => setAbout(About)}
                error={error?.Eabout}
                multiline
                mode="outlined"
                placeholderText="Ex. About Your Company"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    Eabout: false,
                  })
                }
              />

              <Text style={styles.inputName}>My Company Address</Text>
              <FormInput
                labelValue={address}
                onChangeText={Address => setAddress(Address)}
                error={error?.Eaddress}
                mode="outlined"
                multiline
                placeholderText="Ex. Address of Your Company"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    Eaddress: false,
                  })
                }
              />

              <Text style={styles.inputName}>State</Text>
              <FormInput
                labelValue={state}
                onChangeText={State => setState(State)}
                error={error?.Estate}
                mode="outlined"
                placeholderText="Ex. Gujrat"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    Estate: false,
                  })
                }
              />

              <Text style={styles.inputName}>Country</Text>
              <FormInput
                labelValue={country}
                onChangeText={Country => setCountry(Country)}
                error={error?.Ecountry}
                mode="outlined"
                placeholderText="Ex. India"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    Ecountry: false,
                  })
                }
              />
            </KeyboardAwareScrollView>
          </View>

          <View
            style={{...styles.buttonContainer, flexDirection: 'row-reverse'}}>
            <FabButton
              style={{
                ...styles.onPrevious,
                left: Platform.OS === 'ios' ? 214 : 180,
              }}
              color="gray"
              iconName="chevron-left"
              onPress={onPrevious}
            />
            <AppButton
              style={styles.submitBtn}
              buttonTitle={'Update'}
              onPress={() => postSubmit()}
            />
          </View>
        </View>
      )}
    </View>
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
    color: 'black',
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
    bottom: Platform.OS === 'ios' ? -50 : -50,
    left: Platform.OS === 'ios' ? 290 : 270,
    position: 'absolute',
  },
  buttonContainer: {
    marginVertical: Platform.OS === 'ios' ? 700 : 570,
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
    width: Platform.OS === 'ios' ? '50%' : '45%',
  },
});
export default CompanyFormScreen;
