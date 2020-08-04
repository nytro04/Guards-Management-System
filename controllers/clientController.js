const Client = require("../models/clientModel")
const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError")



//Create new Client
exports.createClient = catchAsync(async(req, res, next) => {

    const newClient = await Client.create(req.body)
    
})