const express = require("express");
const morgan = require("morgan");

//importing routers from routes folder
const guardRouter = require("./routes/guardRoutes");
const userRouter = require("./routes/userRoutes");

// initial express with app
const app = express();

/** add express.json() * express middleware * to get access to
 * data (data from client) on the request body
 * # app.use # allows you to add middleware to your middleware stack
 */

app.use(express.json());
// morgan is logging http requests in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// allows us to serve static files in the public folder
// app.use(express.static(`${__dirname / public}`));

// middleware example
app.use((req, res, next) => {
  console.log("Hello from the middleware...👊🏾");

  // always call the next function, code hangs if this is not called.
  next();
});

// Routes
// app.get("/api/v1/guards", getAllGuards);
// app.post("/api/v1/guards", createGuard);
// app.get("/api/v1/guards/:id", getGuard);
// app.patch("/api/v1/guards/:id", updateGuard);
// app.delete("/api/v1/guards/:id", deleteGuard);

// Routes Middlewares*
app.use("/api/v1/guards", guardRouter);
app.use("/api/v1/users", userRouter);

//catch all unhandled routes all(get,post,update,delete) * == all
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`
  });
});

// error handling middleware, error first middleware
// string with new Error is the error message
// error middlewares are called with err in the next eg. next(err)
// this makes express calls the global error handler 
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})

module.exports = app;
