const express = require("express");
const auth = require("../auth/auth");
const router = new express.Router();

const {
  registerController,
  loginController,
  logoutController,
} = require("../controller/user");

//Registration
router.post("/register", registerController);
// Login
router.post("/login", loginController);
//Logut
router.post("/logout", auth, logoutController);

module.exports = router;
