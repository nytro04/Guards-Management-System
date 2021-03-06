const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendMail = require("./../utils/email");
const { Console } = require("console");

/** Sign JWT
 * JWT secret should be 32 characters long
 * the payload here is the user id
 * expires in, is a security measure to log the user out after some time. eg. 30d, 10h, 20m etc
 *
 * @param {user id} id
 * @returns {*} JWT token
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/** create and send JWT token and other responds
 *
 */
const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("guards-jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Sign Up new user
exports.signup = catchAsync(async (req, res, next) => {
  const { role, name, email, password, passwordConfirm } = req.body;

  //check required fields
  if (!role) return next(new AppError("Please provide a user role", 400));
  if (!name) return next(new AppError("Please provide a user name", 400));
  if (!email) return next(new AppError("Please provide a user email", 400));
  if (!password)
    return next(new AppError("Please provide a user password", 400));
  if (!password)
    return next(new AppError("Please provide a user password confirm", 400));

  /**
   * newUser creates a new user document
   * with data from the request body.
   * any field passed to the request body
   * but is not in the DB schema is ignored by the DB.
   * @param {object} req.body
   *
   * save or create returns a promise, this is handled
   * by adding .then or async to the function eg. async (req, res)
   * and awaiting for the response
   */

  const newUser = await User.create({
    role,
    name,
    email,
    password,
    passwordConfirm,
  });

  createAndSendToken(newUser, 201, res);

  // JWT Token
  // const token = signToken(newUser._id);

  // res.status(201).json({
  //   status: "success",
  //   token,
  //   data: {
  //     user: newUser,
  //   },
  // });
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
  // check and return error if user does not exist on DB
  console.log(user);
  if (!user) return next(new AppError("Incorrect email", 401));

  // compare passwords
  const correctPassword = await user.comparePasswords(password, user.password);
  // check and return error password is correct
  if (!correctPassword) return next(new AppError("Incorrect password", 401));

  // 3. Log user in if everything is fine
  createAndSendToken(user, 200, res);

  // const token = signToken(user._id);

  // res.status(200).json({
  //   status: "success",
  //   token,
  // });
});

//log out user using {} cookie
exports.logout = (req, res) => {
  res.cookie("guards-jwt", "logged out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1. Check if token exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  // 2. Verify token
  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3. Check if user still exist
  const currentUser = await User.findById(decodedPayload.id);

  if (!currentUser) {
    return next(
      new AppError("The user who owns this token no longer exist", 401)
    );
  }

  // 4. Check if user changed password after token was issued
  if (currentUser.changedPasswordAfterTokenIssue(decodedPayload.iat)) {
    return next(
      new AppError("User recently changed password, Please log in again", 401)
    );
  }

  // add user to req
  req.user = currentUser;
  // Grant access to protected route
  next();
});

/** Restrict actions to certain roles
 *  eg. staff, admin
 *
 * @param {[]} roles
 * @returns
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permissions to perform this action", 403)
      );
    }
    return next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. get user by email
  const user = await User.findOne({ email: req.body.email });
  // check if user exist
  if (!user) {
    return next(new AppError("There is no user with this email address", 404));
  }

  // 2. generate random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3. send token to user as email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `
  We heard that you lost your GuardSys password. Sorry about that!\n
  But don’t worry! You can use the following link to reset your password: \n

  ${resetURL} \n

  If you don’t use this link within 1 hour, it will expire. \n

  Please ignore this message if you did not forget your password. \n

  Thanks\n
  Team at GuardSys
  `;

  try {
    await sendMail({
      email: user.email,
      subject: "[GuardSys] Reset your password",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    console.log(err);

    return next(
      new AppError(
        "There was an error sending reset email, Please try again",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2. if token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  //3. Update changePasswordAt property for the user
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4. Log the user in, send JWT
  createAndSendToken(user, 200, res);

  // const token = signToken(user._id);

  // res.status(200).json({
  //   status: "success",
  //   token,
  // });
});

// Logged In users Update their passwords
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get user by id from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2. check if provided password is correct
  if (!(await user.comparePasswords(req.body.currentPassword, user.password))) {
    return next(new AppError("You provided a wrong password", 401));
  }

  // 3. If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save(); // NOTE: User.findByIdAndUpdate will NOT work as intend ** Do not use it

  // 4. Log user in and send JWT
  createAndSendToken(user, 200, res);
});
