import React, { Component} from 'react';
import { Route } from 'react-router-dom';
import Clients from './client';
import Guards from './guards';
import Register from './register';
import Login from './login';
import Navbar from './navBar';
import "./App.css";


class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Navbar />
      <main className="container">
          <Route path="/login" component={Login}></Route>
          <Route path="/client" component={Clients}></Route>
          <Route path="/guards" component={Guards}></Route>
          <Route path="/register" component={Register}></Route>
          
      </main>
      </React.Fragment>
    );
  }
  
}

export default App;
