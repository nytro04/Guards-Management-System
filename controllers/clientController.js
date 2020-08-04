const Client = require("../models/clientModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

//Create new Client
exports.createClient = catchAsync(async (req, res, next) => {
  const { name, contactPerson, email, phone, rate, address } = req.body;

  if (!name) return next(new AppError("Please provide a name"));
  if (!contactPerson)
    return next(new AppError("Please provide a contactPerson"));
  if (!email) return next(new AppError("Please provide a email"));
  if (!phone) return next(new AppError("Please provide a phone"));
  if (!rate) return next(new AppError("Please provide a rate"));
  if (!address) return next(new AppError("Please provide a address"));

  const client = { name, contactPerson, email, phone, rate, address };

  const newClient = await Client.create(client);

  res.status(201).json({
    status: "success",
    data: {
      client: newClient,
    },
  });
});
