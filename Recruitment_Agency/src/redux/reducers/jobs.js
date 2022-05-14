import {CREATE_JOBS, GET_JOBS_DETAILS, UPDATE_JOBS} from '../actions/jobs';

const initialstate = {
  availableJobs: [],
  DataFlag: true,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case GET_JOBS_DETAILS:
      return {
        availableJobs: action.allJobs,
        DataFlag:
          action.allJobs.length === 0 || action.allJobs.length < 10
            ? false
            : true,
      };
    // case CREATE_JOBS:
    //   return {
    //     ...state,
    //     userPostedJobs: action.newPostJob,
    //   };
    // case UPDATE_JOBS:
    //   return {
    //     ...state,
    //     userPostedJobs: update,
    //   };
  }
  return state;
};
