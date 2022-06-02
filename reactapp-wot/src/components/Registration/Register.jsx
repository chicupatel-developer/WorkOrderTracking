import React, { useState, useEffect } from "react";
import "./style.css";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();

  useEffect(() => {
    var currUser = AuthService.getCurrentUser();
    if (currUser !== null) navigate("/home");
  });

  return <div className="mainContainer">Register</div>;
};

export default Register;
