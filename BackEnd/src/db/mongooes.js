const mongooes = require('mongoose');

mongooes
  .connect('mongodb://127.0.0.1:27017/recruitment-agency-api', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connection SuccessFul');
  })
  .catch(e => {
    console.log(e);
  });
