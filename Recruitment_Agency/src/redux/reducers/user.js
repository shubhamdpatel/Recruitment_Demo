import {FETCH_USER, UPDATE_USER} from '../actions/user';

const initialstate = {
  userProfile: [],
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        userProfile: action.userData,
      };
    case UPDATE_USER:
      return {
        userProfile: action.userData,
      };
  }
  return state;
};
