const express = require('express');
const auth = require('../auth/auth');
const Job = require('../models/job');
const Company = require('../models/company');
const router = new express.Router();

//Create Job
router.post('/postJob', auth, async (req, res) => {
  //   console.log(req.user._id);
  const company = await Company.findOne({createdBy: req.user._id});
  //   console.log('Company--->', company);
  //   console.log('Company--->Id', company._id);
  const job = new Job({
    ...req.body,
    cid: company._id,
    createdBy: req.user._id,
  });

  try {
    await job.save();
    res.status(201).send({Msg: 'Job Posted Sucessfully !!!', PostJob: job});
  } catch (error) {
    res.status(400).send({error: error});
    console.log({error: 'Something wents wrong.', error});
  }
});

// Get All Jobs
router.get('/getJobs', auth, async (req, res) => {
  try {
    const job = await Job.find({});
    res.send(job);
  } catch (error) {
    res.status(500).send({error: 'Something wents wrong.', error});
  }
});

// Get Job by Company
router.get('/postdJob', auth, async (req, res) => {
  const company = await Company.findOne({createdBy: req.user._id});
  //   console.log('Company--->', company);
  //   console.log('Company--->Id', company._id);
  try {
    const job = await Job.find({cid: company._id});
    // console.log(job);
    if (job == '')
      return res.status(404).send({Msg: 'No Jobs available, Post the job'});
    res.send({Company: company, Posted_Job: job});
  } catch (error) {
    res.status(500).send({error: error});
  }
});

//  get most recent jobs
router.get('/recentJob', auth, async (req, res) => {
  //   var today = new Date();
  //   console.log(Job.find({}).today.setDate(today.getDate() - 10));
  try {
    const job = await Job.find({}).sort({createdAt: -1}).limit(-1);
    res.send(job);
  } catch (error) {
    res.status(500).send({error: 'Something wents wrong.', error});
  }
});

// Update
router.patch('/update/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'description',
    'type',
    'gender',
    'education',
    'minSalary',
    'maxSalary',
    'experience',
    'status',
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!job) {
      return res.status(404).send({error: 'Job Not Found'});
    }

    updates.forEach(update => (job[update] = req.body[update]));
    await job.save();

    res.send({
      Msg: 'Job Updated Sucessfully !!!',
      UpdatedJob: job,
    });
  } catch (error) {
    res.status(400).send({error: 'Something wents wrong.', error});
  }
});

// Delete
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!job) {
      res.status(404).send({error: 'Job Not Found'});
    }

    res.send({
      Msg: 'Job Deleted Sucessfully !!!',
      createdBy: Job,
    });
  } catch (error) {
    res.status(500).send({error: 'Something wents wrong.', error});
  }
});

module.exports = router;
