const express = require("express");
const auth = require("../auth/auth");
const router = new express.Router();
const {
  registerController,
  companyDetailsController,
  allCompanyDetailsController,
  updateController,
} = require("../controller/company");

//Create Company
router.post("/register", auth, registerController);
// Get Company Detial
router.get("/getCompanyDetails", auth, companyDetailsController);
// Get Company Detials
router.get("/getAllCompanyDetails", auth, allCompanyDetailsController);
// Update
router.patch("/update", auth, updateController);

module.exports = router;
