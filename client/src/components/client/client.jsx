import React from "react";
import Joi from "joi-browser";
import Form from "../layout/form";
import { getStatus } from "../selectList/statusList";

class Client extends Form {
  state = {
    data: {
      clientid: "",
      clientname: "",
      location: "",
      noofguards: "",
      rate: "",
      contactperson: "",
      contactnumber: "",
      address: "",
      startdate: "",
      terminationdate: "",
      statusid: "",
      clienttype: "",
      zone: "",
      comment: "",
      surveyreport: "",
    },
    status: [],
    errors: {},
  };

  schema = {
    clientid: Joi.number().label("ClientID"),
    clientname: Joi.string().required().label("Client Name"),
    location: Joi.string().required().label("Location"),
    noofguards: Joi.number()
      .required()
      .min(1)
      .max(100)
      .label("Number of guards"),
    rate: Joi.number().required().label("Rate"),
    contactperson: Joi.string().required().label("Contact person"),
    contactnumber: Joi.number().required().label("Contact Number"),
    address: Joi.string().required().label("Address"),
    startdate: Joi.date().required().label("Start Date"),
    terminationdate: Joi.date().required().label("Termination Date"),
    statusid: Joi.string().required().label("Status"),
    clienttype: Joi.string().required().label("Business Type"),
    zone: Joi.string().required().label("Zone"),
    comment: Joi.string().required().label("Comment"),
    surveyreport: Joi.string().required().label("Survey Report"),
  };

  componentDidMount() {
    const status = getStatus();
    this.setState({ status });
  }

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div className="New Client">
        <div>
          <header id="main-header" className="py-2 bg-primary text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-address-book"></i> Client Setup
                  </h1>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="container my-5">
          <form onSubmit={this.handleSubmit}>
            <table className="table table-bordered ">
              <tbody>
                <tr>
                  <th scope="row ">
                    <h6>Client Details</h6>
                    <div className="row border m-3">
                      <div className="col-11 m-3">
                        {this.renderInput("clientid", "Client Id")}
                        {this.renderInput("location", "Location")}
                        {this.renderInput(
                          "noofguards",
                          "Number of Guards",
                          "number"
                        )}
                        {this.renderInput("contactperson", "Contact Person")}
                        {this.renderInputtextarea("address", "Address")}
                        {this.renderInput(
                          "terminationdate",
                          "Termination Date",
                          "date"
                        )}
                        {this.renderSelect(
                          "statusid",
                          "Status",
                          this.state.status
                        )}
                        {this.renderButton("Add")}
                      </div>
                    </div>
                  </th>
                  <td>
                    {" "}
                    <h6>Client Details</h6>
                    <div className="row border m-3">
                      <div className="col-11 m-3">
                        {this.renderInput("clientname", "Client Name")}
                        {this.renderInput("clienttype", "Type of Business")}
                        {this.renderInput("rate", "Rate GH¢")}
                        {this.renderInput("contactnumber", "Contact Number")}
                        {this.renderInput("startdate", "Start Date", "date")}
                        {this.renderInput("zone", "Zone")}
                        {this.renderInputtextarea("comment", "Comment")}
                        {this.renderInputfile("surveyreport", "Survey Report")}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
}

export default Client;
