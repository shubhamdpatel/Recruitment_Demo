const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid...!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      // minlength: 7,
      trim: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Hiding Data
userSchema.methods.toJSON = function () {
  const user = this;
  const usereObject = user.toObject();

  delete usereObject.password;
  // delete usereObject.tokens;

  return usereObject;
};

//Generate & save token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    "recruitment_agency"
  );
  // user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Login : get uer and check password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login, First Register !");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password not match, Try again...!");
  }

  return user;
};

//Has the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
