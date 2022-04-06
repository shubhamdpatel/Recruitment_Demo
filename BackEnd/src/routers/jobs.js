const express = require("express");
const auth = require("../auth/auth");
const {
  CreateJobController,
  GetAllJobsController,
  GetJobsByCompanyController,
  GetRecentJobsController,
  updateController,
  deleteController,
} = require("../controller/jobs");

const router = new express.Router();

//Create Job
router.post("/postJob", auth, CreateJobController);

// Get All Jobs
router.get("/getAllJobs", auth, GetAllJobsController);

// Get Job by Company
router.get("/postedJob", auth, GetJobsByCompanyController);

//  get most recent jobs
router.get("/recentJob", auth, GetRecentJobsController);

// Update
router.patch("/update/:id", auth, updateController);

// Delete
router.delete("/delete/:id", auth, deleteController);

module.exports = router;
