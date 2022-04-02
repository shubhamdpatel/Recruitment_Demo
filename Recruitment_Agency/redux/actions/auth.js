import {recruit} from '../axois';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATION = 'AUTHENTICATION';
export const LOGOUT = 'LOGOUT';

export const authentication = user => {
  return {
    type: AUTHENTICATION,
    user,
  };
};

export const signUp = (email, password, userType) => {
  return async (dispatch, getState) => {
    try {
      const response = await recruit.post('/register', {
        email,
        password,
        userType,
      });
      const resData = response.data;

      if (resData.error === 'EMAIL_EXISTS') {
        throw new Error('This email exists alreday');
      }

      try {
        const jsonValue = JSON.stringify({
          token: resData.token,
        });
        await AsyncStorage.setItem('user', jsonValue);
        dispatch(authentication(resData.user));
      } catch (error) {
        console.log('Data Not Save In Async-Storage', error);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('user');
    dispatch({type: LOGOUT});
  };
};
