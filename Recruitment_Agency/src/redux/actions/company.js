import {recruit} from '../axois';

export const FETCH_COMPANY = 'FETCH_COMPANY';

export const fetchCompanyData = cid => {
  debugger;
  return async (dispatch, getState) => {
    const userToken = getState().auth.token;
    try {
      const response = await recruit.get(`/company/getCompanyDetails/${cid}`, {
        headers: {Authorization: `Bearer ${userToken}`},
      });
      const resData = response.data;
      debugger;
      dispatch({type: FETCH_COMPANY, company: resData});
      return resData;
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        // Alert.alert(`${errorMsg}`, 'Post the new job.');
      }
      console.log(error);
    }
  };
};
