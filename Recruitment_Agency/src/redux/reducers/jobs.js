import {CREATE_JOBS, GET_JOBS_DETAILS} from '../actions/jobs';

const initialstate = {
  availableJobs: [],
  userPostedJobs: [],
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case GET_JOBS_DETAILS:
      return {
        availableJobs: action.allJobs,
        userPostedJobs: action.userPostedJobs,
      };
    // case CREATE_JOBS:
    //   return {
    //     ...state,
    //     userPostedJobs: state.userPostedJobs.concat(action.newPostJob),
    //   };
  }
  return state;
};
