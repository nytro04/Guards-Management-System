const AppError = require("./../utils/appError");

/** Handle Duplicate Input Value Error Mongo
 *
 * @param {*} err
 * @returns {Object} new AppError
 */
const handleDuplicateFieldsErrorDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

/** Handle Cast Error from Mongo
 *
 * @param {Object} err
 * @returns {Object} new AppError
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.name}: ${err.value}`;
  return new AppError(message, 400);
};

/** Handle Validation input errors from mongo
 *
 * @param {*} err
 * @returns {Object} new AppError
 */
const handleValidationErrorDB = (err) => {
  // loop over object and return message
  const errors = Object.values(err.errors).map((element) => element.message);

  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

/** Handle JWT Invalid token error
 *
 * @param {*} err
 * @returns {Object} new AppError
 */
const handleJWTError = () =>
  new AppError("Invalid token, Please log in again", 401);

/** Handle expired JWT
 *
 * @param {*} err
 * @returns {Object} new AppError
 */
const handleJWTExpiredError = () =>
  new AppError("Your token has expired, Please log in again", 401);

/** Error Message sent in development
 *
 * @param {*} err
 * @param {*} res
 * @returns Error message and status
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

/** Error Message sent in production
 *
 * @param {*} err
 * @param {*} res
 * @returns Error message and status
 */
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or unknown errors, aka bugs. dont leak that to clients
    console.error("ERROR 🥵", err);

    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

/**
 * error handling middleware, error first middleware
 * string with new Error is the error message
 * error middlewares are called with err in the next eg. next(err)
 * this makes express calls the global error handler
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorDev(error, res);
  }
};
