import {recruit} from '../axois';
import {Alert} from 'react-native';
import * as userAction from '../actions/user';

export const GET_JOBS_DETAILS = 'GET_JOBS_DETAILS';
export const CREATE_JOBS = 'CREATE_JOBS';
export const DELETE_JOB = 'DELETE_JOB';
export const UPDATE_JOBS = 'UPDATE_JOBS';

export const fetchJobs = props => {
  return async (dispatch, getState) => {
    const {skip, limit} = props;
    const userToken = getState()?.auth?.token;
    const userType = getState().auth?.user?.userType;
    let response;
    try {
      if (userType === 'Company') {
        response = await recruit.get(
          `/job/postedJob?skip=${skip}&limit=${limit}`,
          {
            headers: {Authorization: `Bearer ${userToken}`},
          },
        );
      } else {
        response = await recruit.get(
          `/job/getAllJobs?skip=${skip}&limit=${limit}`,
          {
            headers: {Authorization: `Bearer ${userToken}`},
          },
        );
      }

      const resData = response?.data;
      await dispatch({
        type: GET_JOBS_DETAILS,
        allJobs: resData,
      });
      await dispatch(userAction.fetchUser());
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        // Alert.alert('Jobs Data Not Fetched!', `${errorMsg}`);
      }
    }
  };
};

export const createJob = props => {
  const {id, data, navigation} = props;
  return async (dispatch, getState) => {
    const userToken = getState().auth.token;
    try {
      if (id === undefined) {
        await recruit
          .post('/job/postJob', data, {
            headers: {Authorization: `Bearer ${userToken}`},
          })
          .then(res => {
            dispatch(fetchJobs({skip: 0, limit: 10}));
            // dispatch({type: CREATE_JOBS, newPostJob: res.data});
            // Alert.alert('Success !', `${res.data.success}`);
            navigation.navigate('Home');
          });
      } else {
        await recruit
          .patch(`/job/update/${id}`, data, {
            headers: {Authorization: `Bearer ${userToken}`},
          })
          .then(res => {
            const resData = res.data.UpdatedJob;
            dispatch(fetchJobs({skip: 0, limit: 10}));
            // dispatch({type: UPDATE_JOBS, updateJob: resData});
            // Alert.alert('Success !', `${res.data.success}`);
          });
        navigation.navigate('Job Details', {params: {jobId: id}});
      }
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        Alert.alert('Invalid Job!', `${errorMsg}`);
      }
    }
  };
};

export const deleteJob = props => {
  const {id, navigation} = props;
  return async (dispatch, getState) => {
    const userToken = getState().auth.token;
    try {
      await recruit
        .delete(`/job/delete/${id}`, {
          headers: {Authorization: `Bearer ${userToken}`},
        })
        .then(res => {
          if (res.data.success) {
            // Alert.alert('Success !', `${res.data.success}`);

            navigation.goBack();
          } else {
            Alert.alert('Something Wrong !', `${res.data.error}`);
          } // dispatch({type:DELETE_JOB , newPostJob: res.data});
        });
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        // Alert.alert(`${errorMsg}`, 'Post the new job.');
      }
    }
  };
};
