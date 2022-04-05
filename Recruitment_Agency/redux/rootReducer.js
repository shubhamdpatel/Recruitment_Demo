import {combineReducers} from 'redux';

import authReducer from './reducers/auth';
import jobsRducer from './reducers/jobs';
export const rootReducer = combineReducers({
  user: authReducer,
  jobs: jobsRducer,
});
