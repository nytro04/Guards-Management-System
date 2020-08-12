const express = require("express");
const {
  createClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

//Routes for get all clients and create client
router.route("/").get(protect, getAllClients).post(createClient);

//Routes for getSingle client, update and delete client
router
  .route("/:id")
  .get(getClient)
  .patch(updateClient)
  .delete(protect, restrictTo("admin-bd"), deleteClient);

module.exports = router;
