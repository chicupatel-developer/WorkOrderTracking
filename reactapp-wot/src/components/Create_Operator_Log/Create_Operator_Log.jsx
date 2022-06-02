import React, { useState, useEffect } from "react";
import "./style.css";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Create_Operator_Log = () => {
   let navigate = useNavigate();

   useEffect(() => {
     var currUser = AuthService.getCurrentUser();
     var currRole = AuthService.getCurrentUserRole();
     if (currUser !== null && currRole !== "Operator") navigate("/un-auth");
   });
  return <div className="mainContainer">Create Operator Log</div>;
};

export default Create_Operator_Log;
