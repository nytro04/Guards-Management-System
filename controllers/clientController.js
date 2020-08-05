const Client = require("../models/clientModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

/**
 * Clients Routes Handler Functions or controllers
 * handles routes to the various clients endpoints
 *
 * All communication with the DB returns a promise
 * @param {object} req
 * @param {object} res
 * @param {function} next calls the next middleware in the middleware stack
 */

//Get all clients
exports.getAllClients = catchAsync(async (req, res, next) => {
  const clients = Client.find();

  res.status(200).json({
    status: "success",
    data: {
      clients,
    },
  });
});

//Create new Client
exports.createClient = catchAsync(async (req, res, next) => {
  const { name, contactPerson, email, phone, rate, address } = req.body;

  // check for required fields
  if (!name) return next(new AppError("Please provide a name"));
  if (!contactPerson)
    return next(new AppError("Please provide a contactPerson"));
  if (!email) return next(new AppError("Please provide a email"));
  if (!phone) return next(new AppError("Please provide a phone"));
  if (!rate) return next(new AppError("Please provide a rate"));
  if (!address) return next(new AppError("Please provide a address"));

  const client = { name, contactPerson, email, phone, rate, address };

  //create new client
  const newClient = await Client.create(client);

  //send response and data
  res.status(201).json({
    status: "success",
    data: {
      client: newClient,
    },
  });
});

//Get single client
exports.getClient = catchAsync(async (req, res, next) => {
  // Client.findOne({_id: req.params.id}) //same as findById below

  //get client by ID
  const client = await Client.findById(req.params.id);

  if (!client) return next(new AppError("No client with ID was found", 404));

  res.status(200).json({
    status: "success",
    data: {
      client,
    },
  });
});
