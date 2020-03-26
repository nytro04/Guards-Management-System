// AppError extends(inherits from)  the Error class
class AppError extends Error {
  //constructor params are what will pass into the new object created from the AppError class
  // it is called each time a new object is created from the AppError class
  constructor(message, statusCode) {
    // super is called when we extend a parent class(Error). this calls the parent constructor
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
