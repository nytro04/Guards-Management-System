import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div>
                <h1>Register</h1>
                <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" className="form-control"/></div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="text" className="form-control"/></div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" className="form-control"/></div>
                    <button className="btn btn-primary">Register</button>
                </form>
            </div>
        
        );
    }
   
}
 
export default Register;