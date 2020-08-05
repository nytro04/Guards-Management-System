const express = require("express");
const {
  createClient,
  getAllClients,
} = require("../controllers/clientController");
const { protect } = require("../controllers/authController");

const router = express.Router();

//Routes for get all clients and create client
router.route("/").get(protect, getAllClients).post(createClient);

module.exports = router;
