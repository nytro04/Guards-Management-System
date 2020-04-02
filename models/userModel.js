const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is require"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false // removes password from any response
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide a confirm password"],
    validate: {
      // this only works on create and save not on update
      validator: function(element) {
        return element === this.password;
      },
      message: "Passwords do not match"
    }
  }
});

/**
 *  Encrypt password and delete confirm password
 */
userSchema.pre("save", async function(next) {
  // move to the next middleware if it's not created new or updated
  if (!this.isModified("password")) return next();

  //  only happens if the password is been created new or updated
  //  salt => bcrypt will add a random string to the password
  // so that 2 equal passwords dont generate the same hash
  // encrypt or hash password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete confirmPassword field
  this.passwordConfirm = undefined;
  next();
});

// instant methods... available on all document of a certain collection
// compare login password provided with user password in DB
userSchema.methods.comparePasswords = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
