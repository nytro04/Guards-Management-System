const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Handle Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION...");
  console.log(err.name, err.message);
  process.exit(1);
});

// gives you access to all environment variables
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE_LOCAL;
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connection successful... 🔥🔥🔥"))
  .catch((errors) => console.log(errors));

// start serve and listen on port
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... 🚀🚀🚀`);
});

/** Unhandled Rejections
 * Async Errors that were not dealt with
 */
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION ERROR");
  server.close(() => {
    process.exit(1);
  });
});
