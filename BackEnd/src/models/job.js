const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    minSalary: {
      type: String,
      required: true,
    },
    maxSalary: {
      type: String,
      required: true,
    },
    noOfOpenings: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    workTime: {
      type: String,
      required: true,
    },
    interviewTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: true,
    },
    cid: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Jobs", jobSchema);
module.exports = Job;
