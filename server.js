const mongoose = require("mongoose");
const dotenv = require("dotenv");
// gives you access to all environment variables
dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(( ) => console.log("DB Connection successful... 🔥🔥🔥"));

// start serve and listen on port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}... 🚀🚀🚀`);
});
