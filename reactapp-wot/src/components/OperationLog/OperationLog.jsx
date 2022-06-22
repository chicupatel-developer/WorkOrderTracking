import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import AuthService from "../../services/auth.service";
import {
  getWorkOrderStatus,
  getDaysLeft,
  getOperationStatus,
  getOperationNumber,
  getOperationStatusForOperator,
} from "../../services/local.service";
import OperationService from "../../services/operation.service";
import { useNavigate } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

import Moment from "moment";

const OperationLog = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [opLog, setOpLog] = useState([]);

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else GetOperationLogData(id);
  }, []);

  const GetOperationLogData = (id) => {
    OperationService.getOperationLogData(id)
      .then((response) => {
        console.log(response.data);
        setOpLog(response.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          console.log("Token Not Found!");
          AuthService.logout();
          navigate("/login");
        }
      });
  };

  return <div></div>;
};

export default OperationLog;
