const mongooes = require("mongoose");

mongooes
  .connect(
    "mongodb+srv://shubhampatel:Shubham369@cluster0.0eusd.mongodb.net/recruitment_agency?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Atlas Connection SuccessFul");
  })
  .catch((e) => {
    console.log(e);
  });
