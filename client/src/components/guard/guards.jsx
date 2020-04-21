import React from "react";
import Joi from "joi-browser";
import Form from "../layout/form";
import { getStatus } from "../selectList/statusList";
import { getGender } from "../selectList/genderList";
import { getShift } from "../selectList/shiftList";
import { getOffday } from "../selectList/offdayList";

class Guards extends Form {
  state = {
    data: {
      guardid: "",
      firstname: "",
      middlename: "",
      lastname: "",
      dob: "",
      idtype: "",
      idnumber: "",
      taxnumber: "",
      contactnumber: "",
      address: "",
      dateofemployment: "",
      terminationdate: "",
      statusid: "",
      picture: "",
      idimage: "",
      zone: "",
      employmenthistory: "",
      guarantor1_name: "",
      guarantor1contactnumber: "",
      guarantoridimage: "",
      guarantor2_name: "",
      guarantor2contactnumber: "",
      guarantor2idimage: "",
      ssnitnumber: "",
      bankname: "",
      bankbranch: "",
      acctnumber: "",
      basicsalary: "",
      genderid: "",
      clientname: "",
      location: "",
      designation: "",
      shiftid: "",
      offdayid: "",
      directionalmap: "",
    },
    status: [],
    gender: [],
    shift: [],
    offday: [],
    errors: {},
  };

  schema = {
    guardid: Joi.number().label("GuardID"),
    firstname: Joi.string().required().label("First Name"),
    middlename: Joi.string().required().label("Middle Name"),
    lastname: Joi.string().required().label("Last Name"),
    location: Joi.string().required().label("Location"),
    dob: Joi.date().required().label("Date of Birth"),
    idtype: Joi.string().required().label("Type of Id"),
    idnumber: Joi.string().required().label("Id Number"),
    contactnumber: Joi.number().required().label("Contact Number"),
    address: Joi.string().required().label("Address"),
    dateofemployment: Joi.date().required().label("Date of employment"),
    terminationdate: Joi.date().required().label("Termination Date"),
    statusid: Joi.string().required().label("Status"),
    taxnumber: Joi.string().required().label("Tax Number"),
    zone: Joi.string().required().label("Zone"),
    picture: Joi.object().required().label("Picture"),
    idimage: Joi.object().required().label("ID Image"),
    directionalmap: Joi.object().required().label("Directional Map"),
    employmenthistory: Joi.string().required().label("Employment History"),
    guarantor1_name: Joi.string().required().label("Guarantor1's Name"),
    guarantor1contactnumber: Joi.number()
      .required()
      .label("Guarantor1's Contact Number"),
    guarantoridimage: Joi.object().required().label("Guarantor1's Id image"),
    guarantor2_name: Joi.string().required().label("Guarantor2's Name"),
    guarantor2contactnumber: Joi.number()
      .required()
      .label("Guarantor2's Contact Number"),
    guarantor2idimage: Joi.object().required().label("Guarantor2's Id image"),
    ssnitnumber: Joi.string().required().label("SSNIT number"),
    bankname: Joi.string().required().label("Bank Name"),
    bankbranch: Joi.string().required().label("Bank Branch"),
    acctnumber: Joi.number().required().label("Account number"),
    basicsalary: Joi.number().required().label("Basic Salary"),
    genderid: Joi.string().required().label("Gender"),
    clientname: Joi.string().required().label("Client Name"),
    shiftid: Joi.string().required().label("Shift"),
    offdayid: Joi.string().required().label("Off Day"),
  };

  componentDidMount() {
    const status = getStatus();
    this.setState({ status });

    const gender = getGender();
    this.setState({ gender });

    const shift = getShift();
    this.setState({ shift });

    const offday = getOffday();
    this.setState({ offday });
  }

  doSubmit = () => {
    console.log("Submitted");
  };
  render() {
    return (
      <div className="New Client">
        <div>
          <header id="main-header" className="py-2 bg-success text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-user-secret"></i> Guard Setup
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
                    <h6>Personal Details</h6>
                    <div className="row border m-3">
                      <div className="col-11 m-3">
                        {this.renderInput("firstname", "Firstname")}
                        {this.renderInput("middlename", "Middlename")}
                        {this.renderInput("lastname", "Lastname")}
                        {this.renderInput("dob", "Date of Birth", "date")}
                        {this.renderSelect(
                          "genderid",
                          "Gender",
                          this.state.gender
                        )}
                        {this.renderInputtextarea("address", "Address")}
                      </div>
                    </div>
                  </th>
                  <td>
                    {" "}
                    <h6>Personal Details</h6>
                    <div className="row border m-3">
                      <div className="col-11 m-3">
                        {this.renderInput("idtype", "Type of ID")}
                        {this.renderInput("idnumber", "ID Number")}
                        {this.renderInput("contactnumber", "Contact")}
                        {this.renderInputtextarea(
                          "employmenthistory",
                          "Employment History"
                        )}
                        {this.renderInputfile("picture", "Image")}
                        {this.renderInputfile("idimage", "ID Image")}
                        {this.renderInputfile(
                          "directionalmap",
                          "Directional Map"
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row ">
                    <h6>Employee Details</h6>
                    <div className="row border m-3">
                      <div className="col-11 m-3">
                        {this.renderInput("guardid", "Guard ID #")}
                        {this.renderInput("ssnitnumber", "Ssnit Number")}
                        {this.renderInput("taxnumber", "Tax Number")}
                        {this.renderInput(
                          "dateofemployment",
                          "Date Of Employment"
                        )}
                        {this.renderInput(
                          "clientname",
                          "Client Name (Location)"
                        )}
                        {this.renderInput(
                          "guarantor1_name",
                          "Guarantor# 1 Fullname"
                        )}
                        {this.renderInput(
                          "guarantor1contactnumber",
                          "Guarantor# 1 Contact"
                        )}
                        {this.renderInputfile(
                          "guarantoridimage",
                          "Gurantor# 1 Id Image"
                        )}
                      </div>
                    </div>
                  </th>
                  <td>
                    {" "}
                    <h6>Employee Details</h6>
                    <div className="row border m-3">
                      <div className="col-11 m-3">
                        {this.renderInput("designation", "Designation")}
                        {this.renderInput("zone", "Zone")}
                        {this.renderSelect(
                          "shiftid",
                          "Shift",
                          this.state.shift
                        )}
                        {this.renderSelect(
                          "offdayid",
                          "Off Day",
                          this.state.offday
                        )}
                        {this.renderSelect(
                          "statusid",
                          "Status",
                          this.state.status
                        )}
                        {this.renderInput(
                          "guarantor2_name",
                          "Guarantor# 2 Fullname"
                        )}
                        {this.renderInput(
                          "guarantor2contactnumber",
                          "Guarantor# 2 Contact"
                        )}
                        {this.renderInputfile(
                          "guarantor2idimage",
                          "Gurantor# 2 Id Image"
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <h6>Bank Details</h6>
                    <div className="row border m-3">
                      <div className="col-11 m-3">
                        {this.renderInput("bankname", "Bank Name")}
                        {this.renderInput("bankbranch", "Branch")}
                        {this.renderInput("actnumber", "Acct #")}
                        {this.renderInput("basicsalary", "Basic Salary")}
                        {this.renderButton("Add")}
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

export default Guards;
