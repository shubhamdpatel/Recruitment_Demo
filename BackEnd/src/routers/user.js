const express = require("express");
const auth = require("../auth/auth");
const router = new express.Router();

const {
  registerController,
  loginController,
  logoutController,
} = require("../controller/auth");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", auth, logoutController);

module.exports = router;
