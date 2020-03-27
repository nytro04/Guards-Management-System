/**
 * error handling middleware, error first middleware
 * string with new Error is the error message
 * error middlewares are called with err in the next eg. next(err)
 * this makes express calls the global error handler
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
