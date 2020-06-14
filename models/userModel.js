const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is require"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "staff", "admin", "super-admin"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false, // removes password from any response
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide a confirm password"],
    validate: {
      // this only works on create and save not on update
      validator: function (element) {
        return element === this.password;
      },
      message: "Passwords do not match",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

/**
 *  Encrypt password and delete confirm password
 */
userSchema.pre("save", async function (next) {
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

//
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//eg of query middleware keyword here is "find"

//  * fetch only users with active set to true (soft delete users).

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  // this.find({ active: true });
  this.find({ active: { $ne: false } });
  next();
});

// instant methods... available on all document of a certain collection
// compare login password provided with user password in DB
userSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check if user changed password after toke was issued
userSchema.methods.changedPasswordAfterTokenIssue = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // password was not changed
  return false;
};

/** Password Reset Token
 * create token, set encrypted token in DB Schema
 * set expires date, 10 mins in mili secs.
 *
 * @returns token
 */
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
