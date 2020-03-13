const express = require("express");

// import controllers or routes handler functions
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "./../controllers/userController";

/**
 * Routers
 * Middlewares that handles routes to
 * specific resources eg. guardRouter, userRouter
 */

const router = express.Router();

/**
 * user resource routes
 * these routes are handled by the user Router above
 * which is a middleware
 */

router
  .route("/")
  .get(getAllUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
