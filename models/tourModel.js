const mongoose = require("mongoose")

// create resource schema
const guardsSchema = new mongoose.Schema({

})

// create resource model from schema
const Guards = mongoose.model("Guards", guardsSchema)

module.exports = Guards