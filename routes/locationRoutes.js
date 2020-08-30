const express = require("express");
const {
  createLocation,
  getAllLocations,
} = require("../controllers/locationController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(getAllLocations)
  .post(protect, restrictTo("admin"), createLocation);

module.exports = router;
