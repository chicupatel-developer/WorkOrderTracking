import React from "react";
import {
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, NavDropdown, Nav, Dropdown } from "react-bootstrap";

import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Registration/Register";
import NotFound from "../NotFound/NotFound";
import Part from "../Part/Part";

import "./style.css";

class Header extends React.Component {
  render() {
      return (
        <>
          <Navbar            
            variant="light"
            expand="lg"
            sticky="top"
            className="navBar"
          >
            <Container>
              <Navbar.Brand href="#home">WorkOrder-Tracking</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
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
                    Customer-Order
                  </Link>
                  <Link to={"/work-order"} className="nav-link">
                    <i className="bi-file-word-fill"></i>
                    Work-Orders [Operations]
                    <i className="bi-hourglass-top"></i>
                  </Link>
                  <Link to={"/create-operator-log"} className="nav-link">
                    Create Log
                  </Link>
                </Nav>

                <Nav className="navbar-nav ms-auto">
                  <Link to={"/login"} className="nav-link">
                    <i className="bi bi-person-plus"></i>
                    Login
                  </Link>
                  <Link to={"/register"} className="nav-link">
                    <i className="bi bi-person-square"></i>
                    Register
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      );
  }
}
export default Header;
