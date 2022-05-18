import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../components/FormInput';
import AppButton from '../../components/AppButton';
import FabButton from '../../components/FabButton';
import Color from '../../constant/Color';
import * as userAction from '../../redux/actions/user';
import * as Progress from 'react-native-progress';
import SelectBox from '../../components/selectBox';
import {Dropdown} from 'react-native-element-dropdown';

const allJobsType = ['Full-Time', 'Part-Time'];
const experiences = ['0-6 Months', '1 to 2 Years', 'More than 2 years'];
const data = [
  {label: 'React Native Developer', value: '1'},
  {label: 'Angular Developer', value: '2'},
  {label: 'React Developer', value: '3'},
  {label: 'Paython Developer', value: '4'},
  {label: 'Graphics Designer', value: '5'},
  {label: 'Ui/Ux Developer', value: '6'},
  {label: 'Laravel Developer', value: '7'},
  {label: 'Company Manager', value: '8'},
  {label: 'Android Developer', value: '9'},
  {label: 'Node js Developer', value: '10'},
];

const EditProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const jober = useSelector(state => state.user.userProfile[0]);

  const [Next, setNext] = React.useState(true);
  const [next2Next, setNext2Next] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);

  const [selectedJobType, setSelectedJobType] = React.useState(
    jober?.jobType || '',
  );
  const [functionalArea, setFunctionalArea] = React.useState(
    jober?.functionalArea || '',
  );
  const [selectedExperience, setSelectedExperience] = React.useState(
    jober?.experience || '',
  );
  const [prefereedCity, setPrefereedCity] = React.useState(
    jober?.prefereedCity || '',
  );
  const [expectedSalary, setExpectedSalary] = React.useState(
    jober?.expectedSalary || '',
  );
  const [instituteName, setInstituteName] = React.useState(
    jober?.instituteName || '',
  );
  const [educationLevelDegree, setEducationLevelDegree] = React.useState(
    jober?.educationLevelDegree || '',
  );
  const [fieldOfStudy, setFieldOfStudy] = React.useState(
    jober?.fieldOfStudy || '',
  );
  const [fromStudyYear, setFromStudyYear] = React.useState(
    jober?.fromStudyYear || '',
  );
  const [toStudyYear, setToStudyYear] = React.useState(
    jober?.toStudyYear || '',
  );
  const [fullName, setFullName] = React.useState(jober?.fullName || '');
  const [mobile, setMobile] = React.useState(jober?.mobile || '');
  const [myBio, setMyBio] = React.useState(jober?.myBio || '');

  const [error, setError] = React.useState({
    JjobType: false,
    JfunctionalArea: false,
    Jexperience: false,
    JprefereedCity: false,
    JexpectedSalary: false,
    JinstituteName: false,
    JeducationLevelDegree: false,
    JfieldOfStudy: false,
    JfromStudyYear: false,
    JtoStudyYear: false,
    JfullName: false,
    Jmobile: false,
    JmyBio: false,
  });

  const onNext = () => {
    if (functionalArea === '') {
      setError({JfunctionalArea: true});
    } else if (prefereedCity === '') {
      setError({JprefereedCity: true});
    } else if (expectedSalary === '') {
      setError({JexpectedSalary: true});
    } else {
      setNext(false);
      setNext2Next(true);
    }
  };

  const onNext2Next = () => {
    if (instituteName === '') {
      setError({JinstituteName: true});
    } else if (educationLevelDegree === '') {
      setError({JeducationLevelDegree: true});
    } else if (fieldOfStudy === '') {
      setError({JfieldOfStudy: true});
    } else if (fromStudyYear === '') {
      setError({JfromStudyYear: true});
    } else if (toStudyYear === '') {
      setError({JtoStudyYear: true});
    } else {
      setNext2Next(false);
    }
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
    debugger;
    const data = {
      jobType: selectedJobType,
      functionalArea,
      experience: selectedExperience,
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

    if (fullName === '') {
      setError({JfullName: true});
    } else if (mobile === '') {
      setError({Jmobile: true});
    } else if (myBio === '') {
      setError({JmyBio: true});
    } else {
      await dispatch(userAction.updateProfile({data, navigation: navigation}));
    }
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
              <Text style={{color: 'black'}}>Highest Education</Text>
              <Text style={{color: 'black'}}>My Bio</Text>
            </View>
          </View>

          <View style={{height: Platform.OS === 'android' ? '85%' : '90%'}}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputName}>Functional Area</Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  {borderColor: error.JfunctionalArea ? '#c20404' : 'gray'},
                  isFocus && {borderColor: 'blue'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="label"
                value={functionalArea}
                placeholder={!isFocus ? 'Select' : '...'}
                searchPlaceholder="Search..."
                onFocus={() => {
                  setIsFocus(true);
                  setError({
                    JfunctionalArea: false,
                  });
                }}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setFunctionalArea(item.label);
                  setIsFocus(false);
                }}
              />

              <Text style={styles.inputName}>Job Type</Text>
              <SelectBox
                data={allJobsType}
                selectValue={
                  jober?.jobType ? allJobsType.indexOf(jober?.jobType) : 0
                }
                onSelectedItem={item => {
                  setSelectedJobType(item);
                }}
              />

              <Text style={styles.inputName}>Experience</Text>
              <SelectBox
                data={experiences}
                selectValue={
                  jober?.experience ? experiences.indexOf(jober?.experience) : 0
                }
                onSelectedItem={item => {
                  setSelectedExperience(item);
                }}
              />

              <Text style={styles.inputName}>Prefereed City</Text>
              <FormInput
                labelValue={prefereedCity}
                onChangeText={City => setPrefereedCity(City)}
                mode="outlined"
                placeholderText="Ex. Surat"
                autoCapitalize="none"
                autoCorrect={false}
                error={error?.JprefereedCity}
                onFocus={() =>
                  setError({
                    JprefereedCity: false,
                  })
                }
              />

              <Text style={styles.inputName}>Expected Salary</Text>
              <FormInput
                labelValue={expectedSalary}
                onChangeText={Salary => setExpectedSalary(Salary)}
                mode="outlined"
                placeholderText="Ex. 4 - 6 LPA"
                autoCapitalize="none"
                autoCorrect={false}
                error={error?.JexpectedSalary}
                onFocus={() =>
                  setError({
                    JexpectedSalary: false,
                  })
                }
              />
            </KeyboardAwareScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <FabButton
              style={{bottom: -70, left: Platform.OS === 'android' ? 270 : 300}}
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
              <Text style={{color: 'black'}}>Job Preference</Text>
              <Text style={{color: Color.accent}}>Highest Education</Text>
              <Text style={{color: 'black'}}>My Bio</Text>
            </View>
          </View>

          <View style={{height: Platform.OS === 'android' ? '83%' : '90%'}}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputName}>Institute Name</Text>
              <FormInput
                labelValue={instituteName}
                onChangeText={InstituteName => setInstituteName(InstituteName)}
                mode="outlined"
                placeholderText="Ex. Gujarat Technological University "
                multiline
                autoCapitalize="none"
                autoCorrect={false}
                error={error?.JinstituteName}
                onFocus={() =>
                  setError({
                    JinstituteName: false,
                  })
                }
              />

              <Text style={styles.inputName}>Education Level and Degree</Text>
              <FormInput
                labelValue={educationLevelDegree}
                onChangeText={EduLevDeg => setEducationLevelDegree(EduLevDeg)}
                mode="outlined"
                placeholderText="Ex. Post-Graduction - MCA"
                autoCapitalize="none"
                autoCorrect={false}
                error={error?.JeducationLevelDegree}
                onFocus={() =>
                  setError({
                    JeducationLevelDegree: false,
                  })
                }
              />

              <Text style={styles.inputName}>Field Of Study</Text>
              <FormInput
                labelValue={fieldOfStudy}
                onChangeText={Study => setFieldOfStudy(Study)}
                mode="outlined"
                placeholderText="Computer"
                autoCapitalize="none"
                autoCorrect={false}
                error={error?.JfieldOfStudy}
                onFocus={() =>
                  setError({
                    JfieldOfStudy: false,
                  })
                }
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
                  keyboardType="number-pad"
                  error={error?.JfromStudyYear}
                  onFocus={() =>
                    setError({
                      JfromStudyYear: false,
                    })
                  }
                />
                

                <Text style={styles.to}>to</Text>
                <FormInput
                  labelValue={toStudyYear}
                  onChangeText={ToStudyYear => setToStudyYear(ToStudyYear)}
                  mode="outlined"
                  placeholderText="Ex. 2022"
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  error={error?.JtoStudyYear}
                  onFocus={() =>
                    setError({
                      JtoStudyYear: false,
                    })
                  }
                />
              </View>
            </KeyboardAwareScrollView>
          </View>

          <View style={{...styles.buttonContainer, flexDirection: 'row'}}>
            <FabButton
              style={{...styles.onPrevious, left: -20}}
              color="gray"
              iconName="chevron-left"
              onPress={onPrevious}
            />
            <FabButton
              style={{bottom: -70, left: Platform.OS === 'ios' ? 190 : 170}}
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
              <Text style={{color: 'black'}}>Job Preference</Text>
              <Text style={{color: 'black'}}>Highest Education</Text>
              <Text style={{color: Color.accent}}>My Bio</Text>
            </View>
          </View>

          <View style={{height: Platform.OS === 'ios' ? '100%' : '84%'}}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputName}>Name</Text>
              <FormInput
                labelValue={fullName}
                onChangeText={Name => setFullName(Name)}
                mode="outlined"
                placeholderText="First & Last name"
                autoCapitalize="none"
                autoCorrect={false}
                error={error?.JfullName}
                onFocus={() =>
                  setError({
                    JfullName: false,
                  })
                }
              />

              <Text style={styles.inputName}>Mobile</Text>
              <FormInput
                labelValue={mobile}
                onChangeText={Mobile => setMobile(Mobile)}
                mode="outlined"
                placeholderText="Mobile"
                autoCapitalize="none"
                autoCorrect={false}
                error={error?.Jmobile}
                onFocus={() =>
                  setError({
                    Jmobile: false,
                  })
                }
              />

              <Text style={styles.inputName}>My Bio </Text>
              <FormInput
                labelValue={myBio}
                onChangeText={MyBio => setMyBio(MyBio)}
                mode="outlined"
                placeholderText="Introduce yourself with your key skills and major achievements"
                multiline
                autoCapitalize="none"
                autoCorrect={false}
                error={error?.JmyBio}
                onFocus={() =>
                  setError({
                    JmyBio: false,
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
                left: Platform.OS === 'ios' ? 195 : 179,
              }}
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
    backgroundColor: Color.app,
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
    color: 'black',
    fontWeight: '600',
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
    marginVertical: Platform.OS === 'ios' ? 600 : 450,
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
    left: Platform.OS === 'ios' ? -200 : -190,
    bottom: -90,
    width: Platform.OS === 'ios' ? '45%' : '45%',
    height: Platform.OS === 'ios' ? '50%' : '45%',
  },

  dropdown: {
    height: 60,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 17,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
