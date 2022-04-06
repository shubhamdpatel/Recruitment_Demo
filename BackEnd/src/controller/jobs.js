const Job = require("../models/job");
const Company = require("../models/company");

const CreateJobController = async (req, res) => {
  console.log("Job Creare Api Call");
  const company = await Company.findOne({ createdBy: req.user._id });
  //   console.log('Company--->', company);
  //   console.log('Company--->Id', company._id);
  const job = new Job({
    ...req.body,
    cid: company._id,
    createdBy: req.user._id,
  });

  try {
    await job.save();
    res
      .status(201)
      .send({ success: "Job Posted Sucessfully !!!", PostJob: job });
  } catch (error) {
    res.status(400).send({ error: error });
    console.log({ error: "Something wents wrong.", error });
  }
};

const GetAllJobsController = async (req, res) => {
  try {
    const job = await Job.find({});
    res.status(200).send(job);
  } catch (error) {
    res.status(500).send({ error: "Something wents wrong.", error });
  }
};

const GetJobsByCompanyController = async (req, res) => {
  console.log("Get Job By Company Api call");
  // const company = await Company.findOne({ createdBy: req.user._id });
  //   console.log('Company--->', company);
  //   console.log('Company--->Id', company._id);
  try {
    // const jobs = await Job.find({ cid: company._id });
    const jobs = await Job.find({ createdBy: req.user._id });
    // console.log(job);
    if (jobs == "") return res.status(404).send({ error: "NO_JOBS_FOUND" });
    // res.send({ Company: company, Posted_Job: jobs });
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const GetRecentJobsController = async (req, res) => {
  //   var today = new Date();
  //   console.log(Job.find({}).today.setDate(today.getDate() - 10));
  try {
    const job = await Job.find({}).sort({ createdAt: -1 }).limit(-1);
    res.send(job);
  } catch (error) {
    res.status(500).send({ error: "Something wents wrong.", error });
  }
};

const updateController = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "description",
    "type",
    "gender",
    "education",
    "minSalary",
    "maxSalary",
    "experience",
    "status",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!job) {
      return res.status(404).send({ error: "Job Not Found" });
    }

    updates.forEach((update) => (job[update] = req.body[update]));
    await job.save();

    res.send({
      Msg: "Job Updated Sucessfully !!!",
      UpdatedJob: job,
    });
  } catch (error) {
    res.status(400).send({ error: "Something wents wrong.", error });
  }
};

const deleteController = async (req, res) => {
  console.log("Delete Job Api Call");
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!job) {
      res.status(404).send({ error: "Job Not Found" });
    }

    res.status(200).send({
      success: "Job Deleted Sucessfully !!!",
      createdBy: Job,
    });
  } catch (error) {
    res.status(500).send({ error: "Something wents wrong.", error });
  }
};

module.exports = {
  CreateJobController,
  GetAllJobsController,
  GetJobsByCompanyController,
  GetRecentJobsController,
  updateController,
  deleteController,
};
