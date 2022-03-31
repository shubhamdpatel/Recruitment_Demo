const mongoose = require('mongoose');

const joberSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      default: '',
    },
    resume: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {timestamps: true},
);

const Jober = mongoose.model('Jober', joberSchema);
module.exports = Jober;
