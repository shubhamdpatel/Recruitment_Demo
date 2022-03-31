const express = require('express');
const Company = require('../models/company');
const auth = require('../auth/auth');
const Jober = require('../models/jober');
const router = new express.Router();

//Create Company
router.post('/register', auth, async (req, res) => {
  const company = new Company({
    ...req.body,
    createdBy: req.user._id,
  });

  try {
    await company.save();
    res.status(201).send(company);
  } catch (error) {
    res.status(400).send({Error: error});
  }
});

// Get Jober Detial
router.get('/getJoberDetail', auth, async (req, res) => {
  try {
    const jober = await Jober.find({createdBy: req.user._id});
    res.send({JoberDetials: jober});
  } catch (error) {
    res.status(500).send({Erorr: error});
  }
});

// Get all Jober Detial
router.get('/getJobersDetails', auth, async (req, res) => {
  try {
    const jobers = await Jober.find();
    res.send({JobersDetials: jobers});
  } catch (error) {
    res.status(500).send({Erorr: error});
  }
});

// Update
router.patch('/update', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'mobile', 'resume'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const jober = await Jober.findOne({
      createdBy: req.user._id,
    });

    if (!jober) {
      return res.status(404).send({error: 'You Do Not Enter The Detials'});
    }

    updates.forEach(update => (jober[update] = req.body[update]));
    await jober.save();

    res.send({
      Msg: 'Your Data Updated Sucessfully !!!',
      UpdatedJober: jober,
    });
  } catch (error) {
    res.status(400).send({Erorr: error});
  }
});

module.exports = router;
