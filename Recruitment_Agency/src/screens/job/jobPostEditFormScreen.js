import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import * as JobsAction from '../../redux/actions/jobs';
import {ScrollView} from 'react-native-gesture-handler';
import FabButton from '../../components/FabButton';
import * as Progress from 'react-native-progress';
import Color from '../../constant/Color';

const JobPostFormScreen = ({navigation, route}) => {
  const [Next, setNext] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

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
  });

  const onNext = () => {
    setNext(false);
    // // let tempError = {...error};
    // if (
    //   title === '' ||
    //   type === '' ||
    //   gender === '' ||
    //   education === '' ||
    //   experience === ''
    // ) {
    //   setError({
    //     hire: true,
    //     jtype: true,
    //     jgender: true,
    //     jeducation: true,
    //     jexperience: true,
    //   });
    //   // } else if (type === '') {
    //   //   setError({jtype: true});
    //   // } else if (gender === '') {
    //   //   setError({jgender: true});
    //   // } else if (education === '') {
    //   //   setError({jeducation: true});
    //   // } else if (experience === '') {
    //   //   setError({jexperience: true});
    // } else {
    //   setNext(false);
    // }
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
    await dispatch(JobsAction.createJob({id, data, navigation: navigation}));
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
            <Text>Job descriptions</Text>
          </View>

          <View style={{height: Platform.OS === 'android' ? '88%' : '90%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputName}>I Want To Hire A</Text>
              <FormInput
                labelValue={title}
                error={error?.hire}
                onChangeText={Title => setTitle(Title)}
                mode="outlined"
                placeholderText="Ex. Company Manager"
                autoCapitalize="none"
                autoCorrect={false}
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
              />
            </ScrollView>
          </View>

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
      ) : (
        <View>
          <View style={{marginBottom: 10}}>
            <Progress.Bar
              progress={1}
              width={Platform.OS === 'ios' ? 390 : 350}
            />
          </View>

          <View style={styles.stepName}>
            <Text>Job Details</Text>
            <Text style={{color: Color.accent}}>Job descriptions</Text>
          </View>

          <View style={{height: '86.5%'}}>
            <ScrollView>
              <Text style={styles.inputName}>
                I Will Pay A Monthly Salary Of
              </Text>
              <View style={{flexDirection: 'row', width: '30%'}}>
                <FormInput
                  labelValue={minSalary}
                  onChangeText={MinSalary => setMinSalary(MinSalary)}
                  mode="outlined"
                  placeholderText="Ex. 10000"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Text style={styles.to}>to</Text>
                <FormInput
                  labelValue={maxSalary}
                  onChangeText={MaxSalary => setMaxSalary(MaxSalary)}
                  mode="outlined"
                  placeholderText="Ex. 20000"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <Text style={styles.inputName}>No Of Staff I Need</Text>
              <View style={{width: '20%'}}>
                <FormInput
                  labelValue={openings}
                  onChangeText={Openings => setOpenings(Openings)}
                  mode="outlined"
                  placeholderText="Ex. 5"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <Text style={styles.inputName}>
                Describe The Job Role For The Staff
              </Text>
              <FormInput
                labelValue={description}
                onChangeText={Description => setDescription(Description)}
                mode="outlined"
                placeholderText="Description"
                multiline
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputName}>Work Timings</Text>
              <FormInput
                labelValue={workTiming}
                onChangeText={WorkTiming => setWorkTiming(WorkTiming)}
                mode="outlined"
                placeholderText="09:30am - 06:30pm | Monday - Saturday"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.inputName}>
                Interview Would Be Done Between
              </Text>
              <FormInput
                labelValue={interviewTiming}
                onChangeText={InterviewTiming =>
                  setInterviewTiming(InterviewTiming)
                }
                mode="outlined"
                placeholderText="11:00am - 04:00pm | Monday - Saturday"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </ScrollView>
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
