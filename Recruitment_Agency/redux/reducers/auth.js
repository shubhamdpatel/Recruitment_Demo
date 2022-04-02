import {AUTHENTICATION, LOGOUT} from '../actions/auth';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION:
      return {
        user: action.user,
      };
    case LOGOUT:
      return initialState;
  }
  return state;
};
