import React from 'react';
import * as Progress from 'react-native-progress';
import * as JobsAction from '../../redux/actions/jobs';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import FabButton from '../../components/FabButton';
import Color from '../../constant/Color';
import DatePicker from 'react-native-date-picker';
import SelectBox from '../../components/selectBox';
import {Dropdown} from 'react-native-element-dropdown';

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
const allJobsType = ['Full-Time', 'Part-Time'];
const genders = ['Male', 'Female', 'Both'];
const qulification = [
  '<10th pass',
  '10th pass or above',
  '12th pass or above',
  'Gradute',
  'Master',
];
const experiences = ['0-6 Months', '1 to 2 Years', 'More than 2 years'];

const JobPostFormScreen = ({navigation, route}) => {
  const {jobId} = route.params;
  const [Next, setNext] = React.useState(true);
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);

  const selectedJob = useSelector(state =>
    state?.jobs?.availableJobs?.find(job => job?._id === jobId),
  );
  const [title, setTitle] = React.useState(selectedJob?.title || '');
  const [selectedJobType, setSelectedJobType] = React.useState(
    selectedJob?.type || '',
  );
  const [selectedGender, setSelectedGender] = React.useState(
    selectedJob?.gender || '',
  );

  const [minSalary, setMinSalary] = React.useState(
    selectedJob?.minSalary ?? '',
  );
  const [maxSalary, setMaxSalary] = React.useState(
    selectedJob?.maxSalary ?? '',
  );
  const [openings, setOpenings] = React.useState(
    selectedJob?.noOfOpenings ?? '',
  );
  const [selectedQulification, setSelectedQulification] = React.useState(
    selectedJob?.education || '',
  );
  const [selectedExperience, setSelectedExperience] = React.useState(
    selectedJob?.experience || '',
  );
  const [description, setDescription] = React.useState(
    selectedJob?.description ?? '',
  );
  const [workTiming, setWorkTiming] = React.useState(
    selectedJob?.workTime ?? '09:30am - 06:30pm | Monday - Saturday',
  );
  const [interviewTiming, setInterviewTiming] = React.useState(
    selectedJob?.interviewTime ?? '11:00am - 04:00pm | Monday - Friday',
  );

  const dispatch = useDispatch();

  const [error, setError] = React.useState({
    hire: false,
    jminSalary: false,
    jmaxSalary: false,
    jopenings: false,
    jdescription: false,
    jworkTiming: false,
    jinterviewTiming: false,
  });

  const onNext = () => {
    if (!title) {
      setError({hire: true});
    } else if (minSalary === '') {
      setError({jminSalary: true});
    } else if (maxSalary === '') {
      setError({jmaxSalary: true});
    } else if (openings === '') {
      setError({jopenings: true});
    } else {
      setNext(false);
    }
  };

  const onPrevious = () => {
    setNext(true);
  };

  const postSubmit = async id => {
    const data = {
      title,
      type: selectedJobType,
      gender: selectedGender,
      education: selectedQulification,
      minSalary,
      maxSalary,
      noOfOpenings: openings,
      experience: selectedExperience,
      description,
      workTime: workTiming,
      interviewTime: interviewTiming,
    };

    if (description === '') {
      setError({jdescription: true});
    } else if (workTiming === '') {
      setError({jworkTiming: true});
    } else if (interviewTiming === '') {
      setError({jinterviewTiming: true});
    } else {
      await dispatch(JobsAction.createJob({id, data, navigation: navigation}));
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
            <Text style={{color: Color.accent}}>Job Details</Text>
            <Text style={{color: 'black'}}>Job descriptions</Text>
          </View>

          <View>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputName}>I Want To Hire A</Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  {borderColor: error.hire ? '#c20404' : 'gray'},
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
                value={title}
                placeholder={!isFocus ? 'Select' : '...'}
                searchPlaceholder="Search..."
                onFocus={() => {
                  setIsFocus(true);
                  setError({
                    hire: false,
                  });
                }}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setTitle(item.label);
                  setIsFocus(false);
                }}
              />

              <Text style={styles.inputName}>Job Type</Text>
              <SelectBox
                data={allJobsType}
                selectValue={
                  selectedJob ? allJobsType.indexOf(selectedJob?.type) : 0
                }
                onSelectedItem={item => {
                  setSelectedJobType(item);
                }}
              />

              <Text style={styles.inputName}>
                Gender Of The Staff should Be
              </Text>
              <SelectBox
                data={genders}
                selectValue={
                  selectedJob ? genders.indexOf(selectedJob?.gender) : 0
                }
                onSelectedItem={item => {
                  setSelectedGender(item);
                }}
              />
              <Text style={styles.inputName}>
                I Will Pay A Monthly Salary Of
              </Text>
              <View style={{flexDirection: 'row', width: '30%'}}>
                <FormInput
                  labelValue={minSalary}
                  onChangeText={MinSalary => setMinSalary(MinSalary)}
                  error={error?.jminSalary}
                  mode="outlined"
                  placeholderText="Ex. 10000"
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  onFocus={() =>
                    setError({
                      jminSalary: false,
                    })
                  }
                />

                <Text style={styles.to}>to</Text>
                <FormInput
                  labelValue={maxSalary}
                  onChangeText={MaxSalary => setMaxSalary(MaxSalary)}
                  error={error?.jmaxSalary}
                  mode="outlined"
                  placeholderText="Ex. 20000"
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  onFocus={() =>
                    setError({
                      jmaxSalary: false,
                    })
                  }
                />
              </View>

              <Text style={styles.inputName}>No Of Staff I Need</Text>
              <View style={{width: '20%'}}>
                <FormInput
                  labelValue={openings}
                  onChangeText={Openings => setOpenings(Openings)}
                  error={error?.jopenings}
                  mode="outlined"
                  placeholderText="Ex. 5"
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  onFocus={() =>
                    setError({
                      jopenings: false,
                    })
                  }
                />
              </View>
            </KeyboardAwareScrollView>

            <FabButton
              style={{
                ...styles.fab,
                left: Platform.OS === 'ios' ? '75%' : '78%',
                bottom: Platform.OS === 'ios' ? '0%' : '-5%',
              }}
              iconName="chevron-right"
              onPress={onNext}
            />
          </View>
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
            <Text style={{color: 'black'}}>Job Details</Text>
            <Text style={{color: Color.accent}}>Job descriptions</Text>
          </View>

          <View style={{height: '86.5%'}}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputName}>
                Candidate's Minimum Qulification should Be
              </Text>
              <SelectBox
                data={qulification}
                selectValue={
                  selectedJob ? qulification.indexOf(selectedJob?.education) : 3
                }
                onSelectedItem={item => {
                  setSelectedQulification(item);
                }}
              />

              <Text style={styles.inputName}>
                Candidate's Minimum Work Experience Must Be
              </Text>
              <SelectBox
                data={experiences}
                selectValue={
                  selectedJob ? experiences.indexOf(selectedJob?.experience) : 0
                }
                onSelectedItem={item => {
                  setSelectedExperience(item);
                }}
              />

              <Text style={styles.inputName}>
                Describe The Job Role For The Staff
              </Text>
              <FormInput
                labelValue={description}
                onChangeText={Description => setDescription(Description)}
                error={error?.jdescription}
                mode="outlined"
                placeholderText="Description"
                multiline
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    jdescription: false,
                  })
                }
              />

              <Text style={styles.inputName}>Work Timings</Text>
              <FormInput
                labelValue={workTiming}
                onChangeText={WorkTiming => setWorkTiming(WorkTiming)}
                error={error?.jworkTiming}
                mode="outlined"
                placeholderText="09:30am - 06:30pm | Monday - Saturday"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    jworkTiming: false,
                  })
                }
                // onPress={() => {
                //   setOpen(true);
                // }}
              />
              <Text style={styles.inputName}>
                Interview Would Be Done Between
              </Text>
              <FormInput
                labelValue={interviewTiming}
                onChangeText={InterviewTiming =>
                  setInterviewTiming(InterviewTiming)
                }
                error={error?.jinterviewTiming}
                mode="outlined"
                placeholderText="11:00am - 04:00pm | Monday - Saturday"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    jinterviewTiming: false,
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
                left: Platform.OS === 'android' ? 180 : 190,
              }}
              color="gray"
              iconName="chevron-left"
              onPress={onPrevious}
            />
            <AppButton
              style={styles.submitBtn}
              buttonTitle={jobId ? 'Update' : 'Submit'}
              onPress={() => postSubmit(selectedJob?._id)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default JobPostFormScreen;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.app,
    marginTop: '20%',
  },
  stepName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 50,
  },
  inputName: {
    fontSize: 17,
    marginBottom: 10,
    marginTop: 25,
    color: 'black',
    fontWeight: '600',
  },
  input: {
    width: '50%',
  },
  ovel: {
    borderWidth: 1,
    minWidth: 100,
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 5,
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
    // position: 'absolute',
  },
  buttonContainer: {
    marginVertical: Platform.OS === 'ios' ? 700 : 565,
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
    width: '45%',
    height: '50%',
  },
});
