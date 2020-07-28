const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Zone name is required"],
    trim: true,
  },
  locations: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
    },
  ],
});

const Zone = mongoose.model("Zone", zoneSchema);

module.exports = Zone;
