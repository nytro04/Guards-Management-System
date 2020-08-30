const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Zone name is required"],
    trim: true,
  },
  areas: [String],
  supervisor: {
    type: mongoose.Schema.ObjectId,
    ref: "Guards",
  },
  //   locations: [
  //     {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "Location",
  //     },
  //   ],
});

zoneSchema.pre(/^find/, function (next) {
  this.populate({
    path: "supervisor",
    select: "name",
  });

  next();
});

const Zone = mongoose.model("Zone", zoneSchema);

module.exports = Zone;
