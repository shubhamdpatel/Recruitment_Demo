import {USER_APPLICATION} from '../actions/application';

const initialstate = {
  allApploication: [],
  userApplication: [],
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case USER_APPLICATION:
      return {
        ...state,
        userApplication: action.applies,
      };
  }
  return state;
};
