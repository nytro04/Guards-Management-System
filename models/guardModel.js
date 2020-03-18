const mongoose = require("mongoose");

// create resource schema
const guardsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A guard name is required"],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of Birth is required"]
  },
  address: {
    type: String,
    required: [true, "Address is required"]
  },
  gender: {
    type: String,
    required: [true, "Gender is require"],
    enum: {
      values: ["Male", "Female, Other"],
      message: "Gender is either Male, Female or Other"
    }
  },
  zone: String,
  location: String,
  title: String,
  shift: {
    type: String,
    required: [true, "Shift is required"],
    enum: {
      values: ["Day", "Night"],
      message: "Shift is either Day or Night"
    }
  },
  passportPicture: {
    type: String,
    required: [true, "Passport picture is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

//todo =>
// Type of Ids, banks account and branch,reprimands,guarantors and details, employment history,
// reviews, scanned application,

// create resource model from schema
const Guards = mongoose.model("Guards", guardsSchema);

module.exports = Guards;
