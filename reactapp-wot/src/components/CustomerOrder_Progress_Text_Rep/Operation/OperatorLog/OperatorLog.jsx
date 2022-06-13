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
        <div className="col-md-2 mx-auto">
          {operatorLogData.operator.firstName},{" "}
          {operatorLogData.operator.lastName}
        </div>
        <div className="col-md-3 mx-auto">
          {operatorLogData.operationId} /{" "}
          {getOperationNumber(operatorLogData.operationNumber)}
          <br />[
          {getOperationStatusForOperator(operatorLogData.operationStatus)}]
        </div>
        <div className="col-md-2 mx-auto">{operatorLogData.opQtyDone}</div>
        <div className="col-md-1 mx-auto">
          {Moment(operatorLogData.opStartRunTime).format("MMM, DD")}
          <br />
          {Moment(operatorLogData.opStartRunTime).format("hh:mm A")}
        </div>
        <div className="col-md-1 mx-auto">
          {Moment(operatorLogData.opPauseRunTime).format("MMM, DD")}
          <br />
          {Moment(operatorLogData.opPauseRunTime).format("hh:mm A")}
        </div>
        <div className="col-md-1 mx-auto">{operatorLogData.cycleTime}</div>
      </div>
    </div>
  );
};

export default OperatorLog;
