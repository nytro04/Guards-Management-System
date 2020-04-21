import React from "react";
import Joi from "joi-browser";
import Form from "../layout/form";

class Designation extends Form {
  state = {
    data: { designationid: "", designation: "" },
    errors: {},
  };

  schema = {
    designationid: Joi.string().required().label("designationid"),
    designation: Joi.string().required().label("Designation"),
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div className="Add Designation">
        <div>
          <header id="main-header" className="py-2 bg-warning text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-user"></i> Designation Setup
                  </h1>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="container my-5">
          <div className="row justify-content-center ">
            <div className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("designationid", "Designation Id")}
                {this.renderInput("designation", "Designation")}
                {this.renderButton("Create")}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Designation;
