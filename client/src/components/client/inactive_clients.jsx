import React from "react";

import Form from "../layout/form";

class InactiveClients extends Form {
  render() {
    return (
      <div className="Inactive Clients">
        <div>
          <header id="main-header" className="py-2 bg-primary text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-address-book"></i> Inactive Client
                  </h1>
                </div>
              </div>
            </div>
          </header>
        </div>

        <div>
          {" "}
          <section id="clients">
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                      <h4>.............</h4>
                    </div>
                    <table class="table table-striped">
                      <thead class="thead-dark">
                        <tr>
                          <th>#</th>
                          <th>ClientName</th>
                          <th>Type of Business</th>
                          <th># of Guards</th>
                          <th>Rate</th>
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

export default InactiveClients;
