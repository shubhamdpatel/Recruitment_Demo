import React from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import * as userAction from '../../redux/actions/user'
import {useDispatch, useSelector} from 'react-redux';
import FabButton from '../../components/FabButton';
import * as Progress from 'react-native-progress';
import Color from '../../constant/Color';

const EditProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const jober = useSelector(state => state.user.userProfile[0]);

  const [Next, setNext] = React.useState(true);
  const [next2Next, setNext2Next] = React.useState(false);

  const [jobType, setJobType] = React.useState(jober?.jobType ?? '');
  const [functionalArea, setFunctionalArea] = React.useState(
    jober?.functionalArea ?? '',
  );
  const [prefereedCity, setPrefereedCity] = React.useState(
    jober?.prefereedCity ?? '',
  );
  const [expectedSalary, setExpectedSalary] = React.useState(
    jober?.expectedSalary ?? '',
  );
  const [instituteName, setInstituteName] = React.useState(
    jober?.instituteName ?? '',
  );
  const [educationLevelDegree, setEducationLevelDegree] = React.useState(
    jober?.educationLevelDegree ?? '',
  );
  const [fieldOfStudy, setFieldOfStudy] = React.useState(
    jober?.fieldOfStudy ?? '',
  );
  const [fromStudyYear, setFromStudyYear] = React.useState(
    jober?.fromStudyYear ?? '',
  );
  const [toStudyYear, setToStudyYear] = React.useState(
    jober?.toStudyYear ?? '',
  );
  const [fullName, setFullName] = React.useState(jober?.fullName ?? '');
  const [mobile, setMobile] = React.useState(jober?.mobile ?? '');
  const [myBio, setMyBio] = React.useState(jober?.myBio ?? '');

  const onNext = () => {
    setNext(false);
    setNext2Next(true);
  };
  const onNext2Next = () => {
    setNext2Next(false);
  };

  const onPrevious2Previous = () => {
    setNext2Next(true);
    setNext(false);
  };
  const onPrevious = () => {
    setNext2Next(false);
    setNext(true);
  };
  const updateHandler = async () => {
    const data = {
      jobType,
      functionalArea,
      prefereedCity,
      expectedSalary,
      instituteName,
      educationLevelDegree,
      fieldOfStudy,
      fromStudyYear,
      toStudyYear,
      fullName,
      mobile,
      myBio,
    };
    const res = await dispatch(userAction.updateProfile(data));
    // if (res.success) {
    //   navigation.navigate('Profile');
    // }
  };

  return (
    <View style={styles.container}>
      {Next ? (
        <View>
          <View style={{marginBottom: 20}}>
            <Progress.Bar
              progress={0.3}
              width={Platform.OS === 'ios' ? 390 : 350}
            />
            <View style={styles.stepName}>
              <Text style={{color: Color.accent}}>Job Preference</Text>
              <Text>Highest Education</Text>
              <Text>My Bio</Text>
            </View>
          </View>

          <View style={{height: '100%'}}>
            <ScrollView>
              <Text style={styles.inputName}>Job Type</Text>
              <FormInput
                labelValue={jobType}
                onChangeText={Type => setJobType(Type)}
                mode="outlined"
                // error={isError}
                placeholderText="Ex. Full Time | Part Time"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputName}>Functional Area</Text>
              <FormInput
                labelValue={functionalArea}
                // error={isError}
                onChangeText={FunctionalArea =>
                  setFunctionalArea(FunctionalArea)
                }
                mode="outlined"
                placeholderText="Ex. Company Manager"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputName}>Prefereed City</Text>
              <FormInput
                labelValue={prefereedCity}
                onChangeText={City => setPrefereedCity(City)}
                mode="outlined"
                // error={isError}
                placeholderText="Ex. Surat"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputName}>Expected Salary</Text>
              <FormInput
                labelValue={expectedSalary}
                onChangeText={Salary => setExpectedSalary(Salary)}
                mode="outlined"
                // error={isError}
                placeholderText="Ex. 4 - 6 LPA"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <FabButton
              style={{bottom: -70}}
              iconName="chevron-right"
              onPress={onNext}
            />
          </View>
        </View>
      ) : next2Next ? (
        <View>
          <View style={{marginBottom: 20}}>
            <Progress.Bar
              progress={0.6}
              width={Platform.OS === 'ios' ? 390 : 350}
            />
            <View style={styles.stepName}>
              <Text>Job Preference</Text>
              <Text style={{color: Color.accent}}>Highest Education</Text>
              <Text>My Bio</Text>
            </View>
          </View>

          <View style={{height: '100%'}}>
            <ScrollView>
              <Text style={styles.inputName}>Institute Name</Text>
              <FormInput
                labelValue={instituteName}
                onChangeText={InstituteName => setInstituteName(InstituteName)}
                mode="outlined"
                placeholderText="Ex. Gujarat Technological University "
                multiline
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputName}>Education Level and Degree</Text>
              <FormInput
                labelValue={educationLevelDegree}
                onChangeText={EduLevDeg => setEducationLevelDegree(EduLevDeg)}
                mode="outlined"
                placeholderText="Ex. Post-Graduction - MCA"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputName}>Field Of Study</Text>
              <FormInput
                labelValue={fieldOfStudy}
                onChangeText={Study => setFieldOfStudy(Study)}
                mode="outlined"
                placeholderText="Computer"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputName}>Duration</Text>
              <View style={{flexDirection: 'row', width: '30%'}}>
                <FormInput
                  labelValue={fromStudyYear}
                  onChangeText={StudyYear => setFromStudyYear(StudyYear)}
                  mode="outlined"
                  placeholderText="Ex. 2000"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Text style={styles.to}>to</Text>
                <FormInput
                  labelValue={toStudyYear}
                  onChangeText={ToStudyYear => setToStudyYear(ToStudyYear)}
                  mode="outlined"
                  placeholderText="Ex. 2022"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </ScrollView>
          </View>

          <View style={{...styles.buttonContainer, flexDirection: 'row'}}>
            <FabButton
              style={{...styles.onPrevious, left: -20}}
              color="gray"
              iconName="chevron-left"
              onPress={onPrevious}
            />
            <FabButton
              style={{bottom: -70, left: 190}}
              iconName="chevron-right"
              onPress={onNext2Next}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={{marginBottom: 20}}>
            <Progress.Bar
              progress={1}
              width={Platform.OS === 'ios' ? 390 : 350}
            />
            <View style={styles.stepName}>
              <Text>Job Preference</Text>
              <Text>Highest Education</Text>
              <Text style={{color: Color.accent}}>My Bio</Text>
            </View>
          </View>

          <View style={{height: '100%'}}>
            <ScrollView>
              <Text style={styles.inputName}>Name</Text>
              <FormInput
                labelValue={fullName}
                onChangeText={Name => setFullName(Name)}
                mode="outlined"
                placeholderText="First & Last name"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputName}>Mobile</Text>
              <FormInput
                labelValue={mobile}
                onChangeText={Mobile => setMobile(Mobile)}
                mode="outlined"
                placeholderText="Mobile"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputName}>My Bio </Text>
              <FormInput
                labelValue={myBio}
                onChangeText={MyBio => setMyBio(MyBio)}
                mode="outlined"
                placeholderText="Introduce yourself with your key skilla and major achievements"
                multiline
                autoCapitalize="none"
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
              onPress={onPrevious2Previous}
            />
            <AppButton
              style={styles.submitBtn}
              buttonTitle="Update"
              onPress={() => updateHandler()}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  stepName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
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
  buttonContainer: {
    marginVertical: 600,
    position: 'absolute',
  },
  fab: {
    bottom: -70,
  },

  onPrevious: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'gray',
    top: 70,
  },
  submitBtn: {
    left: -190,
    bottom: -90,
    width: '50%',
  },
});
