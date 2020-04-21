import React from "react";

import Form from "../layout/form";

class UserDetails extends Form {
  render() {
    return (
      <div className="User Detail">
        <div>
          <header id="main-header" className="py-2 bg-primary text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-address-book"></i> User Detail
                  </h1>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div>
          <section id="actions" className="py-4 mb-4 bg-light">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <a href="/dashboard" className="btn btn-light btn-block">
                    <i className="fas fa-arrow-left"></i> Back To Dashboard
                  </a>
                </div>
                <div className="col-md-3">
                  <a href="/dashboard" className="btn btn-success btn-block">
                    <i className="fas fa-check"></i> Save Changes
                  </a>
                </div>
                <div className="col-md-3">
                  <a href="/dashboard" className="btn btn-danger btn-block">
                    <i className="fas fa-trash"></i> Disable
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section id="details">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-header">
                      <h4>Edit User</h4>
                    </div>
                    <div className="card-body">
                      <form></form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default UserDetails;
