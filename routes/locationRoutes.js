const express = require("express")
const {
  createLocation,
  getAllLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController")
const { protect, restrictTo } = require("../controllers/authController")

const router = express.Router()

router
  .route("/")
  .get(getAllLocations)
  .post(protect, restrictTo("admin"), createLocation)

router
  .route("/:id")
  .get(getLocation)
  .patch(protect, restrictTo("admin"), updateLocation)
  .delete(protect, restrictTo("admin"), deleteLocation)

module.exports = router
