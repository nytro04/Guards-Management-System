const express = require("express");

// import controllers or routes handler functions
const {
  getAllGuards,
  getGuard,
  createGuard,
  updateGuard,
  deleteGuard,
  aliasTop,
  getGuardStats,
  getMonthlyPlan,
} = require("./../controllers/guardController");

const { protect, restrictTo } = require("./../controllers/authController");

/**
 * Router
 * Middlewares that handles routes to
 * specific resources eg. guardRouter, userRouter
 */
const router = express.Router();

/**
 * guards resource routes
 * these routes are handled by the guard Router above
 * which is a middleware
 */

//top five guards ** filter by different fields
router.route("/top-5").get(aliasTop, getAllGuards);

//get monthly plan
router.route("/monthly-plan/:year").get(getMonthlyPlan);

//get guards stats
router.route("/guards-stats").get(getGuardStats);

router.route("/").get(protect, getAllGuards).post(createGuard);

router
  .route("/:id")
  .get(getGuard)
  .patch(updateGuard)
  .delete(protect, restrictTo("staff", "admin", "super-amin"), deleteGuard);

module.exports = router;
