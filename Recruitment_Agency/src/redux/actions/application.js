import {recruit} from '../axois';

export const FETCH_APPLICATION = 'FETCH_APPLICATION';
export const USER_APPLICATION = 'USER_APPLICATION';

export const fetchUserApplication = () => {
  try {
    return (dispatch, getState) => {
      const userToken = getState().auth.token;
      return recruit
        .get('/application/applies', {
          headers: {Authorization: `Bearer ${userToken}`},
        })
        .then(res => {
          const resData = res.data;
          // dispatch({
          //   type: USER_APPLICATION,
          //   payload: res.data,
          // });
          //   console.log(resData.map(res => res.jobId));
          return res.data;
        });
    };
  } catch (e) {
    console.log('Register action error', e);
  }
};
