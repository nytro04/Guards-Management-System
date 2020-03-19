const Guard = require("../models/guardModel");
const APIFeatures = require("./../utils/apiFeatures");
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

exports.aliasTop = (req, res, next) => {
  req.query.limit = "10"; //limit the no. of data received to 10
  req.query.sort = "-salary,age"; // guards with highest salary first and age when there is a tie
  req.query.fields = "name,salary,age"; //fields wanted in the response data
  next();
};

exports.getAllGuards = async (req, res) => {
  try {
    // another way to filter, you can use lt,gt,lte,gte
    // const guards = await Guard.find()
    //   .where("name")
    //   .equals("koo")
    //   .where("title")
    //   .equals("Mr");

    //req.query is used to access queries(optional params) for filtering

    // execute query
    // const features = new APIFeatures(Guard.find(), req.query)
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .paginate();

    // const guards = await features.query;

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
      message: err
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
  await Guard.findByIdAndDelete(req.params.id);

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

//Mongo pipeline aggregation = some computation, allows for the manipulation of data is some ways
exports.getGuardStats = async (req, res) => {
  try {
    const stats = await Guard.aggregate([
      {
        $match: { salary: { gte: 500 } }
      },
      {
        $group: {
          // _id: "$salary", // get you all the stats list below about salary
          _id: null,
          numGuards: { $sum: 1 }, //total number of guards
          totalSalary: { $sum: "$salary" }, // sum of guards salary
          avgAge: { $avg: "$age" }, // average age
          avgSalary: { $avg: "$salary" }, // average salary
          minSalary: { $min: "$salary" }, // minimum salary
          maxSalary: { $max: "$salary" } // maximum salary
        }
      },
      {
        $sort: { minSalary: 1 } // sort minimum salary by ascending(lowest first)
      },
      // just to show we can repeat stages in the aggregation pipeline
      {
        $match: { _id: { $ne: "male" } } // match all document that's not equal to male
      }
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }
};
