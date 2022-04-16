import {recruit} from '../axois';

export const FETCH_COMPANY = 'FETCH_COMPANY';

export const fetchCompanyData = cid => {
  debugger;
  console.log('my cid', cid);
  return async (dispatch, getState) => {
    const userToken = getState().auth.token;
    try {
      const response = await recruit.get(`/company/getCompanyDetails/${cid}`, {
        headers: {Authorization: `Bearer ${userToken}`},
      });
      const resData = response.data;
      dispatch({type: FETCH_COMPANY, company: resData});
    } catch (error) {
      if (error.response.data.error) {
        const errorMsg = error.response.data.error;
        // Alert.alert(`${errorMsg}`, 'Post the new job.');
      }
      console.log(error);
    }
  };
};
