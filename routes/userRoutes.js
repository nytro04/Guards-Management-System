const express = require("express");

// import controllers or routes handler functions
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController");

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("./../controllers/authController");

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

// Sign up or Register a new user route
router.post("/signup", signup);

// Sign in user route
router.post("/login", login);

// forgot password
router.post("/forgotPassword", forgotPassword);

// reset password
router.patch("/resetPassword/:token", resetPassword);

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
