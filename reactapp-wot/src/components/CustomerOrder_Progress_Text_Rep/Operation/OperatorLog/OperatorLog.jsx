import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import AuthService from "../../../../services/auth.service";
import {
  getWorkOrderStatus,
  getDaysLeft,
  getOperationStatus,
  getOperationNumber,
  getOperationStatusForOperator,
} from "../../../../services/local.service";
import CustomerOrderService from "../../../../services/customerOrder.service";
import { useNavigate } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

import Moment from "moment";

const OperatorLog = ({ operatorLogData, i }) => {
  return (
    <div>
      <div key={i} className="row oprBody">
        <div className="col-md-1 mx-auto"></div>
      </div>
    </div>
  );
};

export default OperatorLog;
