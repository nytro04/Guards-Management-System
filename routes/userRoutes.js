const express = require("express");

// import controllers or routes handler functions
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require("./../controllers/userController");

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  logout,
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
// add confirm email address after sign up
router.post("/signup", signup);

// Sign in user route
// checkout and implement maximum number of log in attempts.
router.post("/login", login);

//log out signed in user
router.get("/logout", logout);

// forgot password
router.post("/forgotPassword", forgotPassword);

// reset password
router.patch("/resetPassword/:token", resetPassword);

// Update logged In User password
router.patch("/updateMyPassword", protect, updatePassword);

//Update logged In user Info
router.patch("/updateMe", protect, updateMe);

// Users delete their account (soft delete)
router.delete("/deleteMe", protect, deleteMe);

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
