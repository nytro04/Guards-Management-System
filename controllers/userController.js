const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError")


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
    message: "This route is not yet implemented"
  });
};

// Update user info but not passwords
exports.updateMe = catchAsync(async (req, res, next) => {
// 1. Return error if user POSTs password or passwordConfirm
if(req.body.password || req.body.confirmPassword) {
  return next(new AppError(""))
}
})

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet implemented"
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet implemented"
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet implemented"
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet implemented"
  });
};
