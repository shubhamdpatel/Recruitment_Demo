import {Alert} from 'react-native';
import {recruit} from '../axois';

export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const FAVOURITE = 'FAVOURITE';

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const userToken = getState().auth?.token;
    const userType = getState().auth?.user?.userType;
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

export const updateProfile = props => {
  return async (dispatch, getState) => {
    const {data, navigation} = props;
    const userToken = getState().auth.token;
    const userType = getState().auth?.user?.userType;
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
      const resData = response?.data;
      // Alert.alert('Success!', 'Profile Updated Successfully!');
      await dispatch({type: UPDATE_USER, userData: resData});
      await fetchUser();

      {
        userType === 'Company'
          ? navigation.navigate('Company Profile')
          : navigation.navigate('Jober Profile');
      }
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        console.log(errorMsg);
      }
    }
  };
};

export const fileUpload = data => {
  return async (dispatch, getState) => {
    const userToken = getState().auth.token;
    const userType = getState().auth?.user?.userType;
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
      const resData = response?.data;
      await dispatch({type: UPDATE_USER, userData: resData});
      await fetchUser();
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        console.log(errorMsg);
      }
    }
  };
};

export const favourite = jobId => {
  return async (dispatch, getState) => {
    const userToken = getState().auth?.token;
    const userType = getState().auth?.user?.userType;
    const header = {Authorization: `Bearer ${userToken}`};

    let response;

    try {
      if (userType === 'Jober') {
        response = await recruit.patch(`/jober/favourites/${jobId}`, null, {
          headers: header,
        });
      } else if (userType === 'Company') {
        response = await recruit.patch('/company/getCompanyDetails', null, {
          headers: header,
        });
      }
      const resData = response.data;
      await dispatch({type: UPDATE_USER, userData: resData.jober});
      await fetchUser();
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        Alert.alert('Invalid Favourite Operation!', `${errorMsg}`);
      }
      console.log(error);
    }
  };
};
