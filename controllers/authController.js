const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

/** Sign JWT
 * JWT secret should be 32 characters long
 * the payload here is the user id
 * expires in, is a security measure to log the user out after some time. eg. 30d, 10h, 20m etc
 *
 * @param {user id} id
 * @returns {*} JWT token
 */
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// We will have to create different route to add admin
// and other roles

// Sign Up new user
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({ name, email, password, passwordConfirm });

  // JWT Token
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser
    }
  });
});

// User log in
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // steps for logging user in
  // 1. Check if email and password exist on DB
  if (!email) return next(new AppError("Please provide email", 400));
  if (!password) return next(new AppError("Please provide password", 400));

  // 2. Check if user exist and password is correct

  // +password adds the removed password back to user document
  const user = await User.findOne({ email }).select("+password");
  // check and return error if user exist and password is correct
  if (!user) return next(new AppError("Incorrect email", 401));

  // compare passwords
  const correctPassword = await user.comparePasswords(password, user.password);
  // check and return error password is correct
  if (!correctPassword) return next(new AppError("Incorrect password", 401));

  // 3. Log user in if everything is fine
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token
  });
});
