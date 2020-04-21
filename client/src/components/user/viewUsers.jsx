import React from "react";

import Form from "../layout/form";

class ViewUsers extends Form {
  render() {
    return (
      <div className="View Users">
        <div>
          <header id="main-header" className="py-2 bg-warning text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-users"></i> View Users
                  </h1>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div>
          <section id="search" className="py-4 mb-4 bg-light">
            <div className="container">
              <div className="row">
                <div className="col-md-6 ml-auto">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Users..."
                    />
                    <div className="input-group-append">
                      <button className="btn btn-warning">Search</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          {" "}
          <section id="users">
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                      <h4>Latest Users</h4>
                    </div>
                    <table class="table table-striped">
                      <thead class="thead-dark">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <a href="userDetails" class="btn btn-secondary">
                              <i class="fas fa-angle-double-right"></i> Details
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default ViewUsers;
