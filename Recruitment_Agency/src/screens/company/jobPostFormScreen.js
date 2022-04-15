import React from 'react';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import AppButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import * as JobsAction from '../../redux/actions/jobs';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import FabButton from '../../components/FabButton';
import * as Progress from 'react-native-progress';

const JobPostFormScreen = ({navigation, route}) => {
  const [Next, setNext] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const {jobId} = route.params;
  const selectedJob = useSelector(state =>
    state.jobs.userPostedJobs.find(job => job?._id === jobId),
  );
  console.log('Selected Job', selectedJob);

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

  const onNext = () => {
    setNext(false);
  };
  const onPrevious = () => {
    setNext(true);
  };
  const postSubmit = async () => {
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
    await dispatch(JobsAction.createJob(data));
  };

  return (
    <View style={styles.container}>
      {Next ? (
        <View>
          <View style={{marginBottom: 20}}>
            <Progress.Bar
              progress={0.5}
              width={Platform.OS === 'ios' ? 390 : 350}
            />
          </View>
          <ScrollView>
            <Text style={styles.inputName}>I Want To Hire A</Text>
            <FormInput
              labelValue={title}
              error={isError}
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
              error={isError}
              placeholderText="Ex. Full-Time | Part Time"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.inputName}>Gender Of The Staff should Be</Text>
            <FormInput
              labelValue={gender}
              onChangeText={Gender => setGender(Gender)}
              mode="outlined"
              error={isError}
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
              error={isError}
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
              placeholderText="Ex. 0-6 Months | 1-2 Years"
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
          <View style={{marginBottom: 20}}>
            <Progress.Bar
              progress={1}
              width={Platform.OS === 'ios' ? 390 : 350}
            />
          </View>
          <ScrollView>
            <Text style={styles.inputName}>I Will Pay A Monthly Salary Of</Text>
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

          <View style={styles.btnContainer}>
            <FabButton
              style={styles.onPrevious}
              color="gray"
              iconName="chevron-left"
              onPress={onPrevious}
            />
            <AppButton
              style={styles.submitBtn}
              buttonTitle={jobId ? 'Update' : 'Submit'}
              onPress={postSubmit}
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
    bottom: -70,
  },
  btnContainer: {
    flexDirection: 'row-reverse',
    marginVertical: 80,
  },
  onPrevious: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'gray',
  },
  submitBtn: {
    marginHorizontal: -110,
  },
});
