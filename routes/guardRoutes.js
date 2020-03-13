const express = require("express");

// import controllers or routes handler functions
import {
  getAllGuards,
  getGuard,
  createGuard,
  updateGuard,
  deleteGuard
} from "./../controllers/guardController";

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

router
  .route("/")
  .get(getAllGuards)
  .post(createGuard);

router
  .route("/:id")
  .get(getGuard)
  .patch(updateGuard)
  .delete(deleteGuard);

module.exports = router;
