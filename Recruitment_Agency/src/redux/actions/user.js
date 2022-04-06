import {recruit} from '../axois';

export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const userToken = getState().auth.token;
    const userType = getState().auth.user.userType;
    const header = {Authorization: `Bearer ${userToken}`};
    let response;
    try {
      if (userType === 'Company') {
        response = await recruit.get('/company/getCompanyDetails', {
          headers: header,
        });
      } else if (userType === 'Jober') {
        response = await recruit.get('/jober/getJoberDetail', {
          headers: header,
        });
      }
      const resData = response.data;
      dispatch({type: FETCH_USER, userData: resData});
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        // Alert.alert(`${errorMsg}`, 'Post the new job.');
      }
      console.log(error);
    }
  };
};

export const updateProfile = data => {
  return async (dispatch, getState) => {
    const userToken = getState().auth.token;
    const userType = getState().auth.user.userType;
    const header = {Authorization: `Bearer ${userToken}`};
    let response;
    try {
      if (userType === 'Company') {
        response = await recruit.patch('/company/update', data, {
          headers: header,
        });
      } else if (userType === 'Jober') {
        response = await recruit.patch('/jober/update', data, {
          headers: header,
        });
      }
      const resData = response.data;
      console.log(resData);
      dispatch({type: UPDATE_USER, userData: resData});
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        // Alert.alert(`${errorMsg}`, 'Post the new job.');
      }
      console.log(error);
    }
  };
};
