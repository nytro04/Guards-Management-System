import React from "react";

import Form from "../layout/form";

class InactiveUsers extends Form {
  render() {
    return (
      <div className="Inactive Users">
        <div>
          <header id="main-header" className="py-2 bg-warning text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-user-times"></i> Inactive Users
                  </h1>
                </div>
              </div>
            </div>
          </header>
        </div>

        <div>
          {" "}
          <section id="users">
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                      <h4>............</h4>
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

export default InactiveUsers;
