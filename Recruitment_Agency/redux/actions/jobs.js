import {recruit} from '../axois';
import {Alert} from 'react-native';

export const GET_JOBS_DETAILS = 'GET_JOBS_DETAILS';
export const CREATE_JOBS = 'CREATE_JOBS';
export const DELETE_JOB = 'DELETE_JOB';
export const UPDATE_JOBS_DETAILS = 'UPDATE_JOBS_DETAILS';

export const fetchJobsDetailsByCompany = () => {
  return async (dispatch, getState) => {
    const userToken = getState().user.token;
    try {
      const response = await recruit.get('/job/postedJob', {
        headers: {Authorization: `Bearer ${userToken}`},
      });
      const resData = response.data;
      dispatch({type: GET_JOBS_DETAILS, postedJobs: resData});
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        // Alert.alert(`${errorMsg}`, 'Post the new job.');
      }
    }
  };
};

export const createJob = data => {
  return async (dispatch, getState) => {
    const userToken = getState().user.token;
    try {
      await recruit
        .post('/job/postJob', data, {
          headers: {Authorization: `Bearer ${userToken}`},
        })
        .then(res => {
          Alert.alert('Success !', `${res.data.success}`);
          // dispatch({type: CREATE_JOBS, newPostJob: res.data});
        });
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        // Alert.alert(`${errorMsg}`, 'Post the new job.');
      }
    }
  };
};

export const deleteJob = id => {
  return async (dispatch, getState) => {
    const userToken = getState().user.token;
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
