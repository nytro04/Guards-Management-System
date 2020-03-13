const app = require("./app");

// start serve and listen on port
const port = 8888;
app.listen(port, () => {
  console.log(`App running on port ${port}... 🚀`);
});
