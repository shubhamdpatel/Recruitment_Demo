import {recruit} from '../axois';

export const FETCH_APPLICATION = 'FETCH_APPLICATION';
export const USER_APPLICATION = 'USER_APPLICATION';

export const applyJob = data => {
  console.log('Apply');
  try {
    return (dispatch, getState) => {
      const userToken = getState().auth.token;
      return recruit
        .post('/application/apply', data, {
          headers: {Authorization: `Bearer ${userToken}`},
        })
        .then(res => {
          const resData = res.data;
          fetchUserApplication();
        });
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserApplication = () => {
  console.log('fetch application.');
  try {
    return (dispatch, getState) => {
      const userToken = getState().auth.token;
      const jobs = getState().jobs.availableJobs;
      return recruit
        .get('/application/applies', {
          headers: {Authorization: `Bearer ${userToken}`},
        })
        .then(res => {
          const resData = res.data;
          const apply = resData.map(res => res.jobId);
          const applicationData = jobs.filter(job => apply.includes(job._id));
          dispatch({
            type: USER_APPLICATION,
            applies: applicationData,
          });
          //   console.log(resData.map(res => res.jobId));
          return resData;
        });
    };
  } catch (e) {
    console.log('Register action error', e);
  }
};
