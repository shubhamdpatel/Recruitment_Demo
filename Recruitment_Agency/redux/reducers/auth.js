import {AUTHENTICATION, LOGOUT} from '../actions/auth';

const initialState = {
  user: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION:
      console.log('my data ', action);
      return {
        user: action.user,
      };
    case LOGOUT:
      return initialState;
  }
  return state;
};
