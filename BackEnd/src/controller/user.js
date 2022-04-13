const User = require("../models/user");
const Company = require("../models/company");
const Jober = require("../models/jober");
const Otp = require("../models/otp");

const generateOTP = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const registerController = async (req, res) => {
  console.log("Register api call...!");
  // const user = new User(req.body);
  // const userType = req.query.UserType;
  // return res.send("register Succefully");
  const otp = await generateOTP();
  try {
    const OTP = new Otp({
      email: req.body.email,
      otp: otp,
    }); 
    console.log(OTP);
    await OTP.save();
    res.status(201).send({ OTP });
  } catch (e) {
    console.log(e);
  }

  // try {
  //   if (user.userType === "Company") {
  //     const company = new Company({
  //       email: user.email,
  //       createdBy: user._id,
  //     });

  //     await user.save();
  //     await company.save();
  //     const token = await user.generateAuthToken();
  //     res.status(201).send({ user, token });
  //   }

  //   if (user.userType === "Jober") {
  //     const jober = new Jober({
  //       email: user.email,
  //       createdBy: user._id,
  //     });
  //     await user.save();
  //     await jober.save();
  //     const token = await user.generateAuthToken();
  //     res.status(201).send({ user, token });
  //   }
  // } catch (error) {
  //   if (error.code === 11000) {
  //     res.send({ error: "EMAIL_EXISTS" });
  //   }
  // }
};

const loginController = async (req, res) => {
  console.log("Login api call...!");
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const logoutController = async (req, res) => {
  try {
    req.user.token = req.user.token.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send({ Msg: "Logout Successfully" });
  } catch (e) {
    res.status(500).send();
    console.log(e);
  }
};

module.exports = { registerController, loginController, logoutController };
