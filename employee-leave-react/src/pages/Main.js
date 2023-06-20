import React from "react";
import Home from "./Home";
import ApplyLeave from "./ApplyLeave";
import LeaveHistory from "./LeaveHistory";
import { Switch, Route, Redirect, NavLink, useHistory } from "react-router-dom";
import ApproveLeave from "./ApproveLeave";

const Main = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/auth/login");
  }
  return (
    <div id="app">
      <div id="sidebar" class="active">
        <div class="sidebar-wrapper active">
          <div
            class="sidebar-header"
            style={{ height: "50px", marginTop: "-30px" }}
          >
            <i class="fa fa-users text-success me-4"></i>
            <span>ELMS</span>
          </div>
          <div class="sidebar-menu">
            <ul class="menu">
              <li class="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/app/home"
                  activeClassName="active"
                >
                  <span>Home</span>
                </NavLink>
              </li>
              <li class="sidebar-item ">
                <NavLink
                  className="sidebar-link"
                  to="/app/applyleave"
                  activeClassName="active"
                >
                  <span>Apply Leave</span>
                </NavLink>
              </li>
              <li class="sidebar-item ">
                <NavLink
                  className="sidebar-link"
                  to="/app/leavehistory"
                  activeClassName="active"
                >
                  <span>Leave History</span>
                </NavLink>
              </li>
              <li class="sidebar-item ">
                <NavLink
                  className="sidebar-link"
                  to="/app/approveleave"
                  activeClassName="active"
                >
                  <span>Approve Leaves</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="main">
        <nav class="navbar navbar-header navbar-expand navbar-light">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav d-flex align-items-center navbar-light ms-auto">
              <li class="dropdown">
                <div class="nav-link dropdown-toggle nav-link-lg nav-link-user">
                  <div class="d-none d-md-block d-lg-inline-block">
                    Hi, Employee
                  </div>
                  &nbsp;&nbsp;
                  <a style={{ color: "#0070E0", cursor: "pointer" }} onClick={handleLogout}>Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div class="main-content container-fluid">
          {/* <Home/> */}
          <Route path="/app/home" exact component={Home} />
          <Route path="/app/applyleave" exact component={ApplyLeave} />
          <Route path="/app/leavehistory" exact component={LeaveHistory} />
          <Route path="/app/approveleave" exact component={ApproveLeave} />
        </div>
      </div>
    </div>
  );
};

export default Main;
