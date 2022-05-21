import {recruit} from '../axois';

export const FETCH_APPLICATION = 'FETCH_APPLICATION';
export const FETCH_APPLICANTS = 'FETCH_APPLICANTS';
export const USER_APPLICATION = 'USER_APPLICATION';

export const applyJob = data => {
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
  try {
    return (dispatch, getState) => {
      const userToken = getState().auth.token;
      const userType = getState().auth.user.userType;
      const jobs = getState().jobs.availableJobs;
      let api;
      if (userType === 'Company') {
        api = recruit.get('/application/application', {
          headers: {Authorization: `Bearer ${userToken}`},
        });
      } else {
        api = recruit.get('/application/applies', {
          headers: {Authorization: `Bearer ${userToken}`},
        });
      }
      return api.then(res => {
        const resData = res.data;
        const apply = resData.map(res => res.jobId);
        const applicationData = jobs.filter(job => apply.includes(job._id));
        const applicant = resData.map(res => res.joberId);

        dispatch({
          type: USER_APPLICATION,
          applies: applicationData,
        });
        return resData;
      });
    };
  } catch (e) {
    console.log('Register action error', e);
  }
};

export const fetchUserApplicant = jobId => {
  try {
    return async (dispatch, getState) => {
      const userToken = getState().auth.token;

      const jobers = await recruit.get('/jober/getJobersDetails', {
        headers: {Authorization: `Bearer ${userToken}`},
      });

      const jobersData = jobers.data;
      return recruit
        .get('/application/application', {
          headers: {Authorization: `Bearer ${userToken}`},
        })
        .then(res => {
          const resData = res.data;
          let applicationData = [];
          resData.map(apply => {
            if (apply.jobId === jobId) {
              const application = jobersData.find(
                jober => jober.createdBy === apply.joberId,
              );
              applicationData.push(application);
            }
          });

          dispatch({
            type: FETCH_APPLICANTS,
            applicants: applicationData,
          });
          return applicationData;
        });
    };
  } catch (e) {
    console.log('Register action error', e);
  }
};
