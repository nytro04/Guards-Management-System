const express = require("express");

// import controllers or routes handler functions
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("./../controllers/userController");

const { signup } = require("./../controllers/authController");

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

// Sign up or Register a new user
router.post("/signup", signup);

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
