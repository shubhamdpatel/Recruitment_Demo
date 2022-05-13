import React from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import FabButton from '../../components/FabButton';
import Color from '../../constant/Color';
import * as Progress from 'react-native-progress';
import * as JobsAction from '../../redux/actions/jobs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';

const JobPostFormScreen = ({navigation, route}) => {
  const [Next, setNext] = React.useState(true);
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const {jobId} = route.params;

  const selectedJob = useSelector(state =>
    state?.jobs?.userPostedJobs?.find(job => job?._id === jobId),
  );

  const [title, setTitle] = React.useState(selectedJob?.title ?? '');
  const [type, setType] = React.useState(selectedJob?.type ?? '');
  const [gender, setGender] = React.useState(selectedJob?.gender ?? '');
  const [education, setEducation] = React.useState(
    selectedJob?.education ?? '',
  );
  const [experience, setExperience] = React.useState(
    selectedJob?.experience ?? '',
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
  const [description, setDescription] = React.useState(
    selectedJob?.description ?? '',
  );
  const [workTiming, setWorkTiming] = React.useState(
    selectedJob?.workTime ?? '',
  );
  const [interviewTiming, setInterviewTiming] = React.useState(
    selectedJob?.interviewTime ?? '',
  );

  const dispatch = useDispatch();

  const [error, setError] = React.useState({
    hire: false,
    jtype: false,
    jgender: false,
    jeducation: false,
    jexperience: false,
    jminSalary: false,
    jmaxSalary: false,
    jopenings: false,
    jdescription: false,
    jworkTiming: false,
    jinterviewTiming: false,
  });

  const onNext = () => {
    if (
      title === '' &&
      type === '' &&
      gender === '' &&
      education === '' &&
      experience === ''
    ) {
      setError({
        hire: true,
        jtype: true,
        jgender: true,
        jeducation: true,
        jexperience: true,
      });
      setTimeout(() => {
        setError({
          hire: false,
          jtype: false,
          jgender: false,
          jeducation: false,
          jexperience: false,
        });
      }, 1000);
    } else if (title === '') {
      setError({hire: true});
    } else if (type === '') {
      setError({jtype: true});
    } else if (gender === '') {
      setError({jgender: true});
    } else if (education === '') {
      setError({jeducation: true});
    } else if (experience === '') {
      setError({jexperience: true});
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
      type,
      gender,
      education,
      minSalary,
      maxSalary,
      noOfOpenings: openings,
      experience,
      description,
      workTime: workTiming,
      interviewTime: interviewTiming,
    };
    if (
      minSalary === '' &&
      maxSalary === '' &&
      openings === '' &&
      description === '' &&
      workTiming === '' &&
      interviewTiming === ''
    ) {
      setError({
        jminSalary: true,
        jmaxSalary: true,
        jopenings: true,
        jdescription: true,
        jworkTiming: true,
        jinterviewTiming: true,
      });
      setTimeout(() => {
        setError({
          jminSalary: false,
          jmaxSalary: false,
          jopenings: false,
          jdescription: false,
          jworkTiming: false,
          jinterviewTiming: false,
        });
      }, 1000);
    } else if (minSalary === '') {
      setError({jminSalary: true});
    } else if (maxSalary === '') {
      setError({jmaxSalary: true});
    } else if (description === '') {
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

          <View style={{height: Platform.OS === 'android' ? '88%' : '90%'}}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              {/* <Button title="Open" onPress={() => setOpen(true)} />
              <Text>selected: {date.toLocaleString()}</Text>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              /> */}
              <Text style={styles.inputName}>I Want To Hire A</Text>
              <FormInput
                labelValue={title}
                error={error?.hire}
                onChangeText={Title => setTitle(Title)}
                mode="outlined"
                placeholderText="Ex. Company Manager"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    hire: false,
                  })
                }
              />
              <Text style={styles.inputName}>Job Type</Text>
              <FormInput
                labelValue={type}
                onChangeText={Type => setType(Type)}
                mode="outlined"
                error={error?.jtype}
                placeholderText="Ex. Full-Time | Part Time"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    jtype: false,
                  })
                }
              />
              <Text style={styles.inputName}>
                Gender Of The Staff should Be
              </Text>
              <FormInput
                labelValue={gender}
                onChangeText={Gender => setGender(Gender)}
                mode="outlined"
                error={error?.jgender}
                placeholderText="Ex. Male | Female"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    jgender: false,
                  })
                }
              />
              <Text style={styles.inputName}>
                Candidate's Minimum Qulification should Be
              </Text>
              <FormInput
                labelValue={education}
                onChangeText={Education => setEducation(Education)}
                mode="outlined"
                error={error?.jeducation}
                placeholderText="Ex. Bachlor"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    jeducation: false,
                  })
                }
              />
              <Text style={styles.inputName}>
                Candidate's Minimum Work Experience Must Be
              </Text>
              <FormInput
                labelValue={experience}
                onChangeText={Experience => setExperience(Experience)}
                mode="outlined"
                error={error?.jexperience}
                placeholderText="Ex. 0-6 Months | 1-2 Years"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() =>
                  setError({
                    jexperience: false,
                  })
                }
              />
            </KeyboardAwareScrollView>
          </View>

          <FabButton
            style={{
              ...styles.fab,
              left: Platform.OS === 'ios' ? '75%' : '78%',
              bottom: Platform.OS === 'ios' ? '0%' : '-5%',
            }}
            iconName="chevron-right"
            onPress={onNext}
            // disable={true}
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
            <Text style={{color: 'black'}}>Job Details</Text>
            <Text style={{color: Color.accent}}>Job descriptions</Text>
          </View>

          <View style={{height: '86.5%'}}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
                  autoCorrect={false}
                  onFocus={() =>
                    setError({
                      jopenings: false,
                    })
                  }
                />
              </View>

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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.app,
  },
  stepName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 50,
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
    bottom: -50,
    position: 'absolute',
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
