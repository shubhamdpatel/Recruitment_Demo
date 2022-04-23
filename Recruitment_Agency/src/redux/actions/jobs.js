import {recruit} from '../axois';
import {Alert} from 'react-native';
import * as userAction from '../actions/user';

export const GET_JOBS_DETAILS = 'GET_JOBS_DETAILS';
export const CREATE_JOBS = 'CREATE_JOBS';
export const DELETE_JOB = 'DELETE_JOB';
export const UPDATE_JOBS = 'UPDATE_JOBS';

export const fetchJobs = () => {
  return async (dispatch, getState) => {
    const userToken = getState()?.auth?.token;
    const userId = getState().auth?.user?._id;
    try {
      const response = await recruit.get('/job/getAllJobs', {
        headers: {Authorization: `Bearer ${userToken}`},
      });
      const resData = response?.data;
      await dispatch({
        type: GET_JOBS_DETAILS,
        allJobs: resData,
        userPostedJobs: resData.filter(job => job.createdBy === userId),
      });
      await dispatch(userAction.fetchUser());
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        Alert.alert('Jobs Data Not Fetched!', `${errorMsg}`);
      }
    }
  };
};

export const createJob = (id, data) => {
  return async (dispatch, getState) => {
    const userToken = getState().auth.token;
    try {
      if (id === undefined) {
        await recruit
          .post('/job/postJob', data, {
            headers: {Authorization: `Bearer ${userToken}`},
          })
          .then(res => {
            dispatch({type: CREATE_JOBS, newPostJob: res.data});
            Alert.alert('Success !', `${res.data.success}`);
          });
      } else {
        await recruit
          .patch(`/job/update/${id}`, data, {
            headers: {Authorization: `Bearer ${userToken}`},
          })
          .then(res => {
            dispatch({type: UPDATE_JOBS, updateJob: res.data});
            Alert.alert('Success !', `${res.data.success}`);
          });
      }
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        Alert.alert('Invalid Job!', `${errorMsg}`);
      }
    }
  };
};

export const deleteJob = id => {
  return async (dispatch, getState) => {
    const userToken = getState().auth.token;
    try {
      await recruit
        .delete(`/job/delete/${id}`, {
          headers: {Authorization: `Bearer ${userToken}`},
        })
        .then(res => {
          if (res.data.success) {
            Alert.alert('Success !', `${res.data.success}`);
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
