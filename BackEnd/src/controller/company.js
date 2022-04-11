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
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "companyName",
    "mobile",
    "about",
    "address",
    "city",
    "state",
    "country",
    "companyLogo",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const company = await Company.findOne({
      createdBy: req.user._id,
    });

    if (!company) {
      return res
        .status(404)
        .send({ error: "You Do Not Enter The Company Detials" });
    }

    updates.forEach((update) => (company[update] = req.body[update]));
    await company.save();

    res.send({
      Msg: "Company Data Updated Sucessfully !!!",
      UpdatedCompany: company,
    });
  } catch (error) {
    res.status(400).send({ Erorr: error });
  }
};

module.exports = {
  registerController,
  companyDetailsController,
  companyDetailsByIdController,
  allCompanyDetailsController,
  updateController,
};
