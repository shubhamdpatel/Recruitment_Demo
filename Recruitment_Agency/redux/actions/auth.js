import {recruit} from '../axois';

export const AUTHENTICATION = 'AUTHENTICATION';

export const authentication = (userId, token) => {
  return {
    type: AUTHENTICATION,
    userId,
    token,
  };
};

export const signUp = async (email, password, userType) => {
  console.log(email, password);
  const response = await recruit
    .post('/register', {email, password, userType})
    .then(response => {
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  return;
};
