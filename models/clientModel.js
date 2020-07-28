const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Client name is required"],
    trim: true,
  },
  contactPerson: {
    type: String,
    required: [true, "Contact person required"],
    unique: true, // helps to avoid duplication of field name
    maxlength: [60, "A guard name must be less than 60 characters"],
    minlength: [5, "A guard name must be more than 5 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Phone number required"],
  },
  rate: {
    type: Number,
    required: [true, "Phone number required"],
  },
  address: {
    type: String,
    required: [true, "Client address is required"],
    trim: true,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
