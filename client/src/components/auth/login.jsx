import React from "react";
import Joi from "joi-browser";
import Form from "../layout/form";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div className="New Client">
        <div>
          <header id="main-header" className="py-2 bg-warning text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-sign-in-alt"></i> Login
                  </h1>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="login">
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("username", "Username")}
                  {this.renderInput("password", "Password", "password")}
                  {this.renderButton("Login")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
