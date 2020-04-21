import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
      <div className="container">
        <Link to="#" className="navbar-brand">
          GMS
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item px-2">
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink to="/viewClients" className="nav-link">
                Client
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink to="/viewGuards" className="nav-link">
                Guard
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink to="/viewUsers" className="nav-link">
                Users
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown mr-3">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                <i className="fas fa-user"></i> Welcome
              </Link>
              <div className="dropdown-menu">
                <NavLink to="#" className="dropdown-item">
                  <i className="fas fa-cog"></i> Setup
                </NavLink>
                <NavLink to="#" className="dropdown-item">
                  <i className="fas fa-cog"></i> Settings
                </NavLink>
                <NavLink to="/zone" className="dropdown-item">
                  <i className="fas fa-cog"></i> Zone
                </NavLink>
                <NavLink to="/designation" className="dropdown-item">
                  <i className="fas fa-cog"></i> Designation
                </NavLink>
              </div>
            </li>
            <li className="nav-item">
              <NavLink to="#" className="nav-link">
                <i className="fas fa-user-times"></i> Logout
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                <i className="fas fa-sign-in-alt"></i> Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                <i className="fas fa-user-plus"></i> Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
