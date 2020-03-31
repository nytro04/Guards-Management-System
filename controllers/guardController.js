const Guard = require("../models/guardModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

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

// Get all Guards //todo: implement filtering
exports.getAllGuards = catchAsync(async (req, res, next) => {
  // another way to filter, is use lt,gt,lte,gte
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
});

// Get Single Guard
exports.getGuard = catchAsync(async (req, res, next) => {
  // Guard.findOne({ _id: req.params.id}) same as findById

  const guard = await Guard.findById(req.params.id);

  if (!guard) {
    return next(new AppError("No guard was found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      guard
    }
  });
});

// Create new Guard
exports.createGuard = catchAsync(async (req, res, next) => {
  /**
   * newGuard creates a new guard document
   * with data from the request body.
   * any field passed to the request body
   * but is not in the DB schema is ignored by the DB.
   * @param {object} req.body
   *
   * save or create returns a promise, this is handled
   * by adding .then or async to the function eg. async (req, res)
   * and awaiting for the response
   */
  const newGuard = await Guard.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      guard: newGuard
    }
  });
});

// Update a Guard
exports.updateGuard = catchAsync(async (req, res, next) => {
  const guard = await Guard.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // returns the new document instead of the old one
    runValidators: true // runs validators against the model's schema
  });

  if (!guard) {
    return next(new AppError("No guard was found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      guard
    }
  });
});

exports.deleteGuard = catchAsync(async (req, res, next) => {
  const guard = await Guard.findByIdAndDelete(req.params.id);

  if (!guard) {
    return next(new AppError("No guard found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});

//Mongo pipeline aggregation = some computation, allows for the manipulation of data is some ways
exports.getGuardStats = catchAsync(async (req, res, next) => {
  const stats = await Guard.aggregate([
    {
      $match: { salary: { gte: 500 } } // match is used to select documents
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
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Guard.aggregate([
    {
      $unwind: "$age" // unwind spreads an array
    },
    {
      $match: {
        age: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-01`)
        }
      }
    },
    {
      $group: {
        _id: { $month: "$age" },
        numOfAge: { $sum: 1 },
        guards: { $push: "$name" }
      }
    },
    {
      // adds a new field to the result
      $addFields: { month: "$_id" }
    },
    {
      // adds or remove a field, 0 or 1
      $project: {
        _id: 0
      }
    },
    {
      // used for sorting, 1 ascending, -1 descending
      $sort: { someName: -1 }
    },
    {
      $limit: 6 // limits the output to 6
    }
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats
    }
  });
});

/**
 * This was my try catch block of a controller before
 * refactoring to make the code DRY
 *  all the code is wrapped in a try catch block
 *
 */

// exports.getGuard = async (req, res, next) => {
//   try {
//     // Guard.findOne({ _id: req.params.id}) same as findById

//     const guard = await Guard.findById(req.params.id);

//     res.status(200).json({
//       status: "success",
//       data: {
//         guard
//       }
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "failed",
//       message: err
//     });
//   }
// };
