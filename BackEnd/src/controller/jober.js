const Jober = require("../models/jober");

const createJoberController = async (req, res) => {
  const jober = new Jober({
    ...req.body,
    createdBy: req.user._id,
  });

  try {
    await jober.save();
    res.status(201).send(jober);
  } catch (error) {
    res.status(400).send({ Error: error });
  }
};

const joberDetailsController = async (req, res) => {
  console.log("Jober get data api call!");
  try {
    const jober = await Jober.find({ createdBy: req.user._id });
    res.status(200).send(jober);
  } catch (error) {
    res.status(500).send({ Erorr: error });
  }
};

const allJoberDetailsController = async (req, res) => {
  try {
    const allJobers = await Jober.find();
    res.send(allJobers);
  } catch (error) {
    res.status(500).send({ erorr: error });
  }
};

const updateController = async (req, res) => {
  console.log("Jober Updtae Api Call");
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "jobType",
    "functionalArea",
    "experience",
    "prefereedCity",
    "expectedSalary",
    "instituteName",
    "educationLevelDegree",
    "fieldOfStudy",
    "fromStudyYear",
    "toStudyYear",
    "fullName",
    "mobile",
    "profileImage",
    "myBio",
    "resume",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const jober = await Jober.findOne({
      createdBy: req.user._id,
    });
    if (!jober) {
      return res.status(404).send({ error: "You Do Not Enter The Detials" });
    }

    updates.forEach((update) => (jober[update] = req.body[update]));
    jober.favourites = undefined;
    await jober.save();

    res.send({
      success: "Your Data Updated Sucessfully !!!",
      jober,
    });
  } catch (error) {
    res.status(400).send({ erorr: error });
    console.log(error);
  }
};

const favouriteController = async (req, res) => {
  console.log("Add To Favourite Api Call ");

  try {
    const jober = await Jober.find({ createdBy: req.user._id });
    const isFavourite = jober[0].favourites.includes(req.params.jobId);

    if (!isFavourite) {
      await Jober.findOneAndUpdate(
        { createdBy: req.user._id },
        {
          $push: {
            favourites: req.params.jobId,
          },
        }
      );
      const jober = await Jober.find({ createdBy: req.user._id });
      res.status(200).send({ sucess: "ADDED", jober });
    } else {
      await Jober.findOneAndUpdate(
        { createdBy: req.user._id },
        {
          $pull: {
            favourites: req.params.jobId,
          },
        }
      );
      const jober = await Jober.find({ createdBy: req.user._id });
      res.status(200).send({ sucess: "REMOVE", jober });
    }
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
};

module.exports = {
  createJoberController,
  joberDetailsController,
  allJoberDetailsController,
  updateController,
  favouriteController,
};
