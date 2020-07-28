const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Zone name is required"],
    trim: true,
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: "Client",
    required: [required, "Client is required"],
  },
  zone: {
    type: mongoose.Schema.ObjectId,
    ref: "Zone",
    required: [required, "Zone is required"],
  },
});
