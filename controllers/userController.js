const User = require("./../models/userModel");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

/**
 *
 * @param {req.body} obj
 * @param  {...any} allowedFields
 * @returns {Object} newObj
 */
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

/**
 * Users Routes Handler Functions
 * handles routes to the various users endpoints
 *
 * exports.funcName allows you to export a single function
 *
 * @param {object} req
 * @param {object} res
 */

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet implemented",
  });
};

// Update user info but not passwords
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Return error if user POSTs password or passwordConfirm
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This route is not for password updates, Please use /updateMyPassword",
        400
      )
    ); // 400 bad request
  }

  // 2. filter out fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // 3. Update User Info eg. name and email
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet implemented",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet implemented",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet implemented",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet implemented",
  });
};
