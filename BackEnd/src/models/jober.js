const mongoose = require("mongoose");

const joberSchema = mongoose.Schema(
  {
    jobType: {
      type: String,
      default: "",
    },
    functionalArea: {
      type: String,
      default: "",
    },
    prefereedCity: {
      type: String,
      default: "",
    },
    expectedSalary: {
      type: String,
      default: "",
    },
    instituteName: {
      type: String,
      default: "",
    },
    educationLevelDegree: {
      type: String,
      default: "",
    },
    fieldOfStudy: {
      type: String,
      default: "",
    },
    fromStudyYear: {
      type: String,
      default: "",
    },
    toStudyYear: {
      type: String,
      default: "",
    },
    fullName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    myBio: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Jober = mongoose.model("Jober", joberSchema);
module.exports = Jober;
