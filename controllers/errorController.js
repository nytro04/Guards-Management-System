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
    stack: err.stack
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
      message: err.message
    });
  } else {
    // Programming or unknown errors, aka bugs. dont leak that to clients
    console.error("ERROR 🥵", err);

    res.status(500).json({
      status: "error",
      message: "Something went very wrong!"
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
    sendErrorDev(err, res);
  }
};
