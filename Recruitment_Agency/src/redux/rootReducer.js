import {combineReducers} from 'redux';
import authReducer from './reducers/auth';
import jobsReducer from './reducers/jobs';
import userReducer from './reducers/user';
import companyReducer from './reducers/company';
import applicationReducer from './reducers/application';

const appReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  user: userReducer,
  company: companyReducer,
  applicatuin: applicationReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
