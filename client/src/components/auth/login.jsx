import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="container my-5">
          <h1 className="text-center my-5">Login</h1>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input id="username" type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="text" className="form-control" />
                </div>
                <button className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
