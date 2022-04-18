import {recruit} from '../axois';

export const FETCH_COMPANY = 'FETCH_COMPANY';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';

export const fetchCompanyData = cid => {
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

export const postCompany = data => {
  return async (dispatch, getState) => {
    const userToken = getState().auth.token;
    try {
      console.log();
      await recruit
        .post('/company/register', data, {
          headers: {Authorization: `Bearer ${userToken}`},
        })
        .then(res => {
          debugger;
          console.log('sdfsdf');
          dispatch({type: UPDATE_COMPANY, updatedCompany: res.data});
        });
      // .catch(e => {
      //   console.log('jhkjhk', e);
      // });
      debugger;
    } catch (error) {
      console.log(error);
    }
  };
};
