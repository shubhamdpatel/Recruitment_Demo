import {FETCH_COMPANY, UPDATE_COMPANY} from '../actions/company';

const initialstate = {
  companyData: {},
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_COMPANY:
      return {
        companyData: action.company,
      };
    case UPDATE_COMPANY:
      return {
        companyData: action.updatedCompany,
      };
  }
  return state;
};
