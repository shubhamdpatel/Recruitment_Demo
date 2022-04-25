const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    joberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
