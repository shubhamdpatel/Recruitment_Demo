const express = require("express");
const auth = require("../auth/auth");
const router = new express.Router();
const {
  registerController,
  companyDetailsController,
  companyDetailsByIdController,
  allCompanyDetailsController,
  updateController,
  deleteController,
} = require("../controller/company");

//Create Company
router.post("/register", auth, registerController);
// Get Company Detial
router.get("/getCompanyDetails", auth, companyDetailsController);
// Get Company Detials By Id
router.get("/getCompanyDetails/:id", auth, companyDetailsByIdController);
// Get Company Detials
router.get("/getAllCompanyDetails", auth, allCompanyDetailsController);
// Update
router.patch("/update", auth, updateController);
// delete
router.patch("/delete", auth, deleteController);

module.exports = router;
