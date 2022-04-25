const express = require("express");
const auth = require("../auth/auth");
const router = new express.Router();

const {
  applyController,
  fetchApplicationByUser,
} = require("../controller/application");

// Apply
router.post("/apply", auth, applyController);
// Fetch Application By Jober
router.get("/applies", auth, fetchApplicationByUser);

module.exports = router;
