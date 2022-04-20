const User = require("../models/user");
const Company = require("../models/company");

const registerController = async (req, res) => {
  const company = new Company({
    ...req.body,
    createdBy: req.user._id,
  });

  try {
    await company.save();
    res.status(201).send(company);
  } catch (error) {
    res.status(400).send({ Error: error });
  }
};

const companyDetailsController = async (req, res) => {
  console.log("Company Details Api Call");
  try {
    const company = await Company.find({ createdBy: req.user._id });
    res.status(200).send(company);
  } catch (error) {
    res.status(500).send({ erorr: error });
  }
};

const companyDetailsByIdController = async (req, res) => {
  console.log("Company Details By Id Api Call ");
  try {
    const company = await Company.findById({ _id: req.params.id });
    res.status(200).send(company);
  } catch (error) {
    res.status(500).send({ erorr: error });
    console.log(error);
  }
};

const allCompanyDetailsController = async (req, res) => {
  try {
    const company = await Company.find();
    res.send(company);
  } catch (error) {
    res.status(500).send({ Erorr: error });
  }
};

const updateController = async (req, res) => {
  console.log("Company update api call!");
  const updates = Object.keys(req.body);

  const allowedUpdates = [
    "companyName",
    "mobile",
    "contactPerson",
    "about",
    "address",
    "state",
    "country",
    "companyLogo",
    "website",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Some field not updates!" });
  }

  try {
    const company = await Company.findOne({
      createdBy: req.user._id,
    });

    if (!company) {
      return res.status(404).send({ error: "COMPANY_NOT_FOUND" });
    }

    updates.forEach((update) => (company[update] = req.body[update]));
    await company.save();

    res.send({
      sucess: "Your Company Profile Updated",
      company,
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const deleteController = async (req, res) => {
  console.log("Delete Company Api Call");
  try {
    const user = await User.findOneAndDelete({
      _id: req.user._id,
    });

    if (!user) {
      res.status(404).send({ error: "User Not Found" });
    }

    const company = await Company.findOneAndDelete({
      createdBy: req.user._id,
    });

    if (!user) {
      res.status(404).send({ error: "User Not Found" });
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
  registerController,
  companyDetailsController,
  companyDetailsByIdController,
  allCompanyDetailsController,
  updateController,
  deleteController,
};
