const Zone = require("../models/zoneModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

/**
 * Zones Routes Handler Functions or controller
 * handles routes to the various zones endpoints
 *
 *  All communication with the DB returns a promise
 * @param {object} req
 * @param {object} res
 * @param {function} next calls the next middleware in the middleware stack
 */

// get all zones
exports.getAllZones = catchAsync(async (req, res, next) => {
  const zones = await Zone.find();

  res.status(200).json({
    status: "success",
    data: {
      zones,
    },
  });
});

//create a new zone
exports.createZone = catchAsync(async (req, res, next) => {
  // get data from request body
  const { name, areas } = req.body;

  //check for the required fields
  if (!name) return next(new AppError("Please provide a name", 400));

  const zone = { name, areas };

  const newZone = await Zone.create(zone);

  res.status(201).json({
    status: "success",
    data: {
      zone: newZone,
    },
  });
});
