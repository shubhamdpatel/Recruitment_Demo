const express = require('express');
const Company = require('../models/company');
const auth = require('../auth/auth');
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

// Get Company Detial
router.get('/getCompanyDetail', auth, async (req, res) => {
  try {
    const company = await Company.find({createdBy: req.user._id});
    res.send(company);
  } catch (error) {
    res.status(500).send({Erorr: error});
  }
});

// Get Company Detials
router.get('/getCompanyDetails', auth, async (req, res) => {
  try {
    const company = await Company.find();
    res.send(company);
  } catch (error) {
    res.status(500).send({Erorr: error});
  }
});

// Update
router.patch('/update', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'companyName',
    'mobile',
    'about',
    'address',
    'city',
    'state',
    'country',
    'companyLogo',
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const company = await Company.findOne({
      createdBy: req.user._id,
    });

    if (!company) {
      return res
        .status(404)
        .send({error: 'You Do Not Enter The Company Detials'});
    }

    updates.forEach(update => (company[update] = req.body[update]));
    await company.save();

    res.send({
      Msg: 'Company Data Updated Sucessfully !!!',
      UpdatedCompany: company,
    });
  } catch (error) {
    res.status(400).send({Erorr: error});
  }
});

module.exports = router;
