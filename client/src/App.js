import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Clients from "./components/client/client";
import Guards from "./components/guard/guards";
import ViewUsers from "./components/user/viewUsers";
import ViewClients from "./components/client/viewClients";
import ViewGuards from "./components/guard/viewGuards";
import Zone from "./components/setup/zone";
import Designation from "./components/setup/designation";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Navbar from "./components/layout/navBar";
import Dashboard from "./components/layout/dashboard";
import TotalUsers from "./components/user/total_users";
import ActiveUsers from "./components/user/active_users";
import InactiveUsers from "./components/user/inactive_users";
import TotalGuards from "./components/guard/total_guards";
import ActiveGuards from "./components/guard/active_guards";
import InactiveGuards from "./components/guard/inactive_guards";
import TotalClients from "./components/client/total_clients";
import ActiveClients from "./components/client/active_clients";
import InactiveClients from "./components/client/inactive_clients";
import ClientDetails from "./components/client/clientDetails";
import GuardDetails from "./components/guard/guardDetails";
import UserDetails from "./components/user/userDetails";

import "./scss/main.scss";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/client" component={Clients}></Route>
          <Route exact path="/guards" component={Guards}></Route>
          <Route exact path="/viewUsers" component={ViewUsers}></Route>
          <Route exact path="/viewGuards" component={ViewGuards}></Route>
          <Route exact path="/viewClients" component={ViewClients}></Route>
          <Route exact path="/total_users" component={TotalUsers}></Route>
          <Route exact path="/active_users" component={ActiveUsers}></Route>
          <Route exact path="/inactive_users" component={InactiveUsers}></Route>
          <Route exact path="/total_guards" component={TotalGuards}></Route>
          <Route exact path="/active_guards" component={ActiveGuards}></Route>
          <Route
            exact
            path="/inactive_guards"
            component={InactiveGuards}
          ></Route>
          <Route exact path="/total_clients" component={TotalClients}></Route>
          <Route
            exact
            path="/inactive_clients"
            component={InactiveClients}
          ></Route>
          <Route exact path="/clientDetails" component={ClientDetails}></Route>
          <Route exact path="/guardDetails" component={GuardDetails}></Route>
          <Route exact path="/userDetails" component={UserDetails}></Route>
          <Route exact path="/active_clients" component={ActiveClients}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/zone" component={Zone}></Route>
          <Route exact path="/designation" component={Designation}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
