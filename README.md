# Recruitment

const registerController = async (req, res) => {
  console.log("Register api call...!");
  const userType = req.query.userType;
  const user = new User({
    ...req.body,
    userType: userType,
  });

  // const otp = await generateOTP();
  // try {
  //   const OTP = new Otp({
  //     email: req.body.email,
  //     otp: otp,
  //   });
  //   console.log(OTP);
  //   await OTP.save();
  //   res.status(201).send({ OTP });
  // } catch (e) {
  //   console.log(e);
  // }

  try {
    if (userType === "Company") {
      const company = new Company({
        email: user.email,
        createdBy: user._id,
      });

      await user.save();
      await company.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    }

    if (userType === "Jober") {
      console.log("call");
      const jober = new Jober({
        email: user.email,
        createdBy: user._id,
      });
      await user.save();
      await jober.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.send({ error: "EMAIL_EXISTS" });
    }
    console.log(error);
  }
};
