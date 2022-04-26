const Application = require("../models/application");

const applyController = async (req, res) => {
  console.log("Job Apply Api Call");
  try {
    const application = await Application.findOne({
      joberId: req.user._id,
      jobId: req.body.jobId,
    });

    if (application) {
      res.send("You alreday applied!");
    } else {
      const apply = new Application({
        jobId: req.body.jobId,
        joberId: req.user._id,
      });
      apply.save();
      res.status(201).send({ application: apply });
    }
  } catch (error) {
    res.status(400).status({ error });
    console.log(error);
  }
};

const fetchApplicationByUser = async (req, res) => {
  console.log("Application Fetch Api Call");
  try {
    const application = await Application.find({ joberId: req.user._id });
    res.status(200).send(application);
  } catch (error) {
    res.status(400).send({ error });
    console.log(error);
  }
};
module.exports = { applyController, fetchApplicationByUser };
