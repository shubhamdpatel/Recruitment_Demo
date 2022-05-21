import {USER_APPLICATION, FETCH_APPLICANTS} from '../actions/application';

const initialstate = {
  applicants: [],
  userApplication: [],
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case USER_APPLICATION:
      return {
        ...state,
        userApplication: action.applies,
      };
    case FETCH_APPLICANTS:
      return {
        ...state,
        applicants: action.applicants,
      };
  }
  return state;
};
