const express = require("express");
const auth = require("../auth/auth");
const router = new express.Router();
const {
  createJoberController,
  joberDetailsController,
  allJoberDetailsController,
  updateController,
} = require("../controller/jober");

//Register Jober
router.post("/register", auth, createJoberController);

// Get Jober Detial
router.get("/getJoberDetail", auth, joberDetailsController);

// Get all Jober Detial
router.get("/getJobersDetails", auth, allJoberDetailsController);

// Update
router.patch("/update", auth, updateController);

module.exports = router;
