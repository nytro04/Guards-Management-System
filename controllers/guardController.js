const Guard = require("../models/tourModel");

/**
 * Guards Routes Handler Functions or Controllers
 * handles routes to the various guards endpoints
 *
 * all communication with the DB returns a promise
 *
 * exports.funcName allows you to export a single function
 *
 * @param {object} req
 * @param {object} res
 *
 */

exports.getAllGuards = async (req, res) => {
  try {
    const guards = await Guard.find();

    res.status(200).json({
      status: "success",
      length: guards.length,
      data: {
        guards
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }
};

exports.getGuard = async (req, res) => {
  try {
    // Guard.findOne({ _id: req.params.id}) same as findById

    const guard = await Guard.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        guard
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }
};

exports.createGuard = async (req, res) => {
  try {
    // we can create a new guard document like this
    // const newGuard = new Guard({})
    // newGuard.save()

    /**
     * newGuard creates a new guard document
     * with data from the request body.
     * any field passed to the request body
     * but is not in the DB schema is ignored by the DB.
     * @param {object} req.body
     *
     * save or create returns a promise, this is handled
     * by adding async to the function eg. async (req, res)
     * and awaiting the response
     */
    const newGuard = await Guard.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        guard: newGuard
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "invalid data sent!"
    });
  }
};

exports.updateGuard = async (req, res) => {
  try {
    const guard = await Guard.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // returns the new document instead of the old one
      runValidators: true // runs validators against the model's schema
    });

    res.status(200).json({
      status: "success",
      data: {
        guard
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }
};

exports.deleteGuard = async (req, res) => {

  await Guard.findByIdAndDelete(req.params.id)

  try {
    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }
};
