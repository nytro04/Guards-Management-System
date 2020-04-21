import React from "react";
import Form from "../layout/form";

class Dashboard extends Form {
  render() {
    return (
      <div className="Dashboard">
        <div>
          <header id="main-header" className="py-2 bg-info text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </h1>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="container my-5">
          <section id="actions" className="py-4 mb-4 bg-light">
            <div class="container">
              <div className="row">
                <div className="col-md-3">
                  <a href="client" className="btn btn-primary btn-block">
                    <i className="fas fa-plus"></i> Add Clients
                  </a>
                </div>
                <div className="col-md-3">
                  <a href="guards" className="btn btn-success btn-block">
                    <i className="fas fa-plus"></i> Add Guards
                  </a>
                </div>
                <div className="col-md-3">
                  <a href="users" className="btn btn-warning btn-block">
                    <i className="fas fa-plus"></i> Add Users
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="container my-5">
          <table className="table ">
            <tbody>
              <tr>
                <th scope="row ">
                  <div className="row">
                    <div className="col-11 m-3">
                      <div className="card text-center bg-warning text-white mb-3 ">
                        <div className="card-body ">
                          <h3>Total Users</h3>
                          <h4 className="display-4">
                            <i className="fas fa-users"></i>
                          </h4>
                          <a
                            href="total_users"
                            className="btn btn-outline-light btn-sm"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
                <td>
                  <div className="row">
                    <div className="col-11 m-3">
                      <div className="card text-center bg-warning text-white mb-3">
                        <div className="card-body">
                          <h3>Active Users</h3>
                          <h4 className="display-4">
                            <i className="fas fa-user-plus"></i>
                          </h4>
                          <a
                            href="/active_users"
                            className="btn btn-outline-light btn-sm"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div className="col-11 m-3">
                      <div className="card text-center bg-warning text-white mb-3">
                        <div className="card-body">
                          <h3>Inactive Users</h3>
                          <h4 className="display-4">
                            <i className="fas fa-user-times"></i>
                          </h4>
                          <a
                            href="/inactive_users"
                            className="btn btn-outline-light btn-sm"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row ">
                  <div className="row">
                    <div className="col-11 m-3">
                      <div className="card text-center bg-success text-white mb-3">
                        <div className="card-body">
                          <h3>Total Guards</h3>
                          <h4 className="display-4">
                            <i className="fas fa-user-secret"></i>
                          </h4>
                          <a
                            href="/total_guards"
                            className="btn btn-outline-light btn-sm"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
                <td>
                  <div className="row">
                    <div className="col-11 m-3">
                      <div className="card text-center bg-success text-white mb-3">
                        <div className="card-body">
                          <h3>Active Guards</h3>
                          <h4 className="display-4">
                            <i className="fas fa-user-secret"></i>
                          </h4>
                          <a
                            href="/active_guards"
                            className="btn btn-outline-light btn-sm"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div className="col-11 m-3">
                      <div className="card text-center bg-success text-white mb-3">
                        <div className="card-body">
                          <h3>Inactive Guards</h3>
                          <h4 className="display-4">
                            <i className="fas fa-user-secret"></i>
                          </h4>
                          <a
                            href="/inactive_guards"
                            className="btn btn-outline-light btn-sm"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row ">
                  <div className="row ">
                    <div className="col-11 m-3">
                      {" "}
                      <div className="card text-center bg-primary text-white mb-3">
                        <div className="card-body">
                          <h3>Total Clients</h3>
                          <h4 className="display-4">
                            <i className="fas fa-user-friends"></i>
                          </h4>
                          <a
                            href="/total_clients"
                            className="btn btn-outline-light btn-sm"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
                <td>
                  <div className="row ">
                    <div className="col-11 m-3">
                      {" "}
                      <div className="card text-center bg-primary text-white mb-3">
                        <div className="card-body">
                          <h3>Active Clients</h3>
                          <h4 className="display-4">
                            <i className="fas fa-address-card"></i>
                          </h4>
                          <a
                            href="/active_clients"
                            className="btn btn-outline-light btn-sm"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="row ">
                    <div className="col-11 m-3">
                      {" "}
                      <div className="card text-center bg-primary text-white mb-3">
                        <div className="card-body">
                          <h3>Inactive Clients</h3>
                          <h4 className="display-4">
                            <i className="fas fa-address-book"></i>
                          </h4>
                          <a
                            href="/inactive_clients"
                            className="btn btn-outline-light btn-sm"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dashboard;
