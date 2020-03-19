import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Clients from "./client";
import Guards from "./guards";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Navbar from "./components/layout/navBar";

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
          <Route exact path="/register" component={Register}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
