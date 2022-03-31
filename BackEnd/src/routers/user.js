const express = require("express");
const User = require("../models/user");
const auth = require("../auth/auth");
const Company = require("../models/company");
const Jober = require("../models/jober");
const router = new express.Router();

//Registration
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  // const userType = req.query.UserType;
  console.log(user);

  // return res.send("register Succefully");
  try {
    if (user.userType === "Company") {
      console.log("company");
      const company = new Company({
        email: user.email,
        createdBy: user._id,
      });

      await user.save();
      await company.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ UserData: user, CompanyDetails: company, token });
    }

    if (userType === "Jober") {
      const jober = new Jober({
        email: user.email,
        createdBy: user._id,
      });
      console.log(jober);
      await user.save();
      await jober.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ UserData: user, token, JoberDetails: jober });
    }

    //   // else {
    //   //   //   res.status(400).send('Company Not Register');
    //   // }
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Logut
// router.post("/logout", auth, async (req, res) => {
//   try {
//     req.user.token = req.user.token.filter((token) => {
//       return token.token !== req.token;
//     });
//     await req.user.save();

//     res.send({ Msg: "Logout Successfully" });
//   } catch (e) {
//     res.status(500).send();
//     console.log(e);
//   }
// });

module.exports = router;
