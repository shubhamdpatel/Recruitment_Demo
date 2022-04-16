const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    contactPerson: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    companyLogo: {  
      type: String,
      default: "",
    },
    website: {
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

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
