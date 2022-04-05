const express = require("express");
require("./db/mongooes");

const userRouter = require("./routers/user");
const companyRouter = require("./routers/company");
const jobRouter = require("./routers/jobs");
const joberRouter = require("./routers/jober");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.use("/company", companyRouter);
app.use("/job", jobRouter);
app.use("/jober", joberRouter);

app.listen(port, () => {
  console.log("Back-End server is up on port " + port);
});
