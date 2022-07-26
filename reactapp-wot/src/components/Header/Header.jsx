import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, NavDropdown, Nav, Dropdown } from "react-bootstrap";

import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Registration/Register";
import NotFound from "../NotFound/NotFound";
import Part from "../Part/Part";

import "./style.css";

// after login(success), it refreshes the whole page and redirects to home page
// when it refreshes the whole page, Header.jsx also reloads
// and updates current-user's info
import AuthService from "../../services/auth.service";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserFullName, setCurrentUserFullName] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [currentUserToken, setCurrentUserToken] = useState("");

  useEffect(() => {
    var currUser = AuthService.getCurrentUser();

    if (currUser != null) {
      setCurrentUserName(currUser.userName);
      setCurrentUserFullName(currUser.fullName);
      setCurrentUserRole(currUser.role);
      setCurrentUserToken(currUser.token);
    } else {
      console.log("not logged in yet!");
    }
  });

  const logout = () => {
    AuthService.logout();
    setCurrentUserName("");
    setCurrentUserFullName("");
    setCurrentUserRole("");
    setCurrentUserToken("");
  };

  return (
    <>
      <Navbar variant="light" expand="lg" sticky="top" className="navBar">
        {/*
        <Container>
        */}

        <Navbar.Brand href="/home">
          <span>WorkOrder-Tracking</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {currentUserName && currentUserRole === "Admin" ? (
            <Nav className="me-auto">
              <Link to={"/home"} className="nav-link">
                <i className="bi bi-house-fill"></i>
                Home
              </Link>
              <Link to={"/part"} className="nav-link">
                <i className="bi bi-display"></i>
                Part
              </Link>
              <Link to={"/customer-order"} className="nav-link">
                <i className="bi-gear-fill"></i>
                Customer-Orders
              </Link>
              <Link to={"/work-order"} className="nav-link">
                <i className="bi-file-word-fill"></i>
                Work-Orders [Operations]
                <i className="bi-hourglass-top"></i>
              </Link>
            </Nav>
          ) : (
            <span></span>
          )}

          {currentUserName && currentUserRole === "Operator" ? (
            <Nav className="me-auto">
              <Link to={"/home"} className="nav-link">
                <i className="bi bi-house-fill"></i>
                Home
              </Link>
              <Link to={"/create-operator-log"} className="nav-link">
                Create Log
              </Link>
              <Link to={"/view-operator-log"} className="nav-link">
                View Log
              </Link>
            </Nav>
          ) : (
            <span></span>
          )}

          {currentUserName ? (
            <Nav>
              <a href="/login" onClick={() => logout()} className="nav-link">
                <h6>
                  <b>
                    [<span className="userRole">({currentUserRole})</span>{" "}
                    {currentUserName} ]LogOut{" "}
                  </b>
                </h6>
              </a>
            </Nav>
          ) : (
            <Nav>
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
        {/*
        </Container>
        */}
      </Navbar>
    </>
  );
};

export default Header;
