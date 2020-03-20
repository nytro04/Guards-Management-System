const mongoose = require("mongoose");
const slugify = require("slugify");

// create resource schema
const guardsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A guard name is required"],
      trim: true,
      unique: true // helps to avoid duplication
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth is required"]
    },
    address: {
      type: String,
      required: [true, "Address is required"]
    },
    gender: {
      type: String,
      required: [true, "Gender is require"],
      enum: {
        values: ["Male", "Female, Other"],
        message: "Gender is either Male, Female or Other"
      }
    },
    zone: String,
    location: String,
    title: String,
    slug: String,
    shift: {
      type: String,
      required: [true, "Shift is required"],
      enum: {
        values: ["Day", "Night"],
        message: "Shift is either Day or Night"
      }
    },
    passportPicture: {
      type: String,
      required: [true, "Passport picture is required"]
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  },
  {
    // set virtuals to true on json and object
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
/**
 * use regular functions calls in models in mongoose
 * because arrow functions dont get their own "this" but "this" of parent.
 * the "this" key in model points to the current document
 */

// virtuals => fields that are defined on the schema but it not persisted or save to the DB
guardsSchema.virtual("age").get(function() {
  return Date.now() - this.dateOfBirth;
});

/**
 * mongoose middleware => code that run before or after each action
 * eg. document(act on currently processed document), query, aggregate
 * and model middlewares.
 * mongoose middleware also have the next() function to call
 * the next middlewares in the middleware stack
 */

/** DOCUMENT MIDDLEWARE
 * eg. of document middleware that runs before (pre) an event(save() & create())
 *  the "this" in a document middleware keyword points to the currently processed document
 * */
guardsSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/**
 * post middleware has access to the just save document (doc)
 * and are executed after all the pre middlewares are executed
 */

// guardsSchema.post("save", function(doc, next) {
//   console.log(doc)
//   next()
// });

/** QUERY MIDDLEWARE
 * Query middlewares allow us to run functions before or after
 * a certain query is executed. The "this" keyword here points
 * to the current query.
 */

//todo =>
// Type of Ids, banks account and branch,reprimands,guarantors and details, employment history,
// reviews, scanned application,

// create resource(Guard) model from schema
const Guards = mongoose.model("Guards", guardsSchema);

module.exports = Guards;
