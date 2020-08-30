const mongoose = require("mongoose");

const locationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Zone name is required"],
      trim: true,
    },
    area: {
      type: String,
      required: [true, "Area is required"],
      trim: true,
    },
    client: {
      type: mongoose.Schema.ObjectId,
      ref: "Client",
      required: [true, "Client is required"],
    },
    zone: {
      type: mongoose.Schema.ObjectId,
      ref: "Zone",
      required: [true, "Zone is required"],
    },
  },
  {
    // set virtuals to true on json and object
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

locationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "client",
    select: "name", //will only provide client name 
  }).populate({
    path: "zone",
    select: "name",
  });

  next()
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
