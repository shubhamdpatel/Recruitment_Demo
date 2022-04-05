import {recruit} from '../axois';
import {Alert} from 'react-native';

export const GET_PROFILE = 'GET_PROFILE';

export const getProfile = () => {
  return async (dispatch, getState) => {
    const token = getState(state.user.token);
    try {
      // await recruit.get('/get')
    } catch (error) {}
  };
};
