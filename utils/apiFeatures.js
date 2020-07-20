class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // 1a. Filtering
  filter() {
    const queryObj = { ...req.query }; // makes new copy of request query
    const excludedFields = ["page", "sort", "limit", "fields"];
    //delete specified fields from queryObj if they include any of the above
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1b. Advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr)); 

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    // 3. Field limiting. send back only fields requested by clients aka projecting
    // adding - to the select query removes or hides the field it from the data sent back
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    // 4. Pagination
    // if page=3,&limit=10, page 1, 1-10, page 2, 11 - 20, page 3, 21 - 30
    const page = this.queryString.page * 1 || 1; // returns the requested page or defaults to 1
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
