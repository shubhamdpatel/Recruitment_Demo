import {combineReducers} from 'redux';

import authReducer from './reducers/auth';
import jobsReducer from './reducers/jobs';
import userReducer from './reducers/user';

const appReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  user: userReducer,
});
export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
