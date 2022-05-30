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

class Header extends React.Component {
  render() {
      return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
              <Navbar.Brand href="#home">WorkOrder-Tracking</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        </>
      );
  }
}
export default Header;
