import React, { useState, useEffect } from "react";
import "./style.css";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Operation = () => {
  let navigate = useNavigate();

  useEffect(() => {
    var currUser = AuthService.getCurrentUser();
    var currRole = AuthService.getCurrentUserRole();
    if (currUser !== null && currRole !== "Admin") navigate("/un-auth");
  });

  return <div className="mainContainer">Operations</div>;
};

export default Operation;
