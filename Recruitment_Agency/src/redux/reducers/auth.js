import {AUTHENTICATION, LOGOUT} from '../actions/auth';

const initialState = {
  token: null,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case LOGOUT:
      return initialState;
  }
  return state;
};
