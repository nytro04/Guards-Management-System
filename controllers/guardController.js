const Guard = require("../models/guardModel");

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
    // another way to filter, you can use lt,gt,lte,gte
    // const guards = await Guard.find()
    //   .where("name")
    //   .equals("koo")
    //   .where("title")
    //   .equals("Mr");

    //req.query is used to access queries for filtering

    // Build query workflow
    // 1a. Filtering
    const queryObj = { ...req.query }; // makes new copy of request query
    const excludedFields = ["page", "sort", "limit", "fields"];
    //delete specified fields from queryObj if they include any of the above
    excludedFields.forEach(el => delete queryObj[el]);

    // 1b. Advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|let)\b/g, match => `$${match}`);

    let query = Guard.find(JSON.parse(queryStr));

    // 2. Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 3. Field limiting. send back only fields requested by clients aka projecting
    // adding - to the select query removes or hides the field it from the data sent back
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4. Pagination
    // if page=3,&limit=10, page 1, 1-10, page 2, 11 - 20, page 3, 21 - 30
    const page = req.query.page * 1 || 1; // returns the requested page or defaults to 1
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    //if page requested is granter than the number of resouces
    if (req.query.page) {
      const numGuards = await Guard.countDocuments();
      if (skip >= numGuards) throw new Error("This page does not exist");
    }


    // execute query
    const guards = await query;

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
