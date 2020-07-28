const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Zone name is required"],
  },
  locations: [
    {
      type: mongoose.Schema.ObjectID,
      ref: "Locations",
    },
  ],
});

const Zone = mongoose.model("Zone", zoneSchema);

module.exports = Zone;
