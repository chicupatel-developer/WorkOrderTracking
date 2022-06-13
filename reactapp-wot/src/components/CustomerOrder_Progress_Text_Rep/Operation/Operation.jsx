import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import AuthService from "../../../services/auth.service";
import {
  getWorkOrderStatus,
  getDaysLeft,
  getOperationStatus,
  getOperationNumber,
  getOperationStatusForOperator,
} from "../../../services/local.service";
import CustomerOrderService from "../../../services/customerOrder.service";
import { useNavigate } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

import Moment from "moment";

const Operation = ({ operationDatas, index }) => {
  const getOprLog = (opId) => {
    console.log("operator log", opId);
  };

  return (
    <div key={index} className="row opBody">
      <div className="col-md-1 mx-auto">
        {operationDatas.operation.opQTYDone >=
        operationDatas.operation.opQTYRequired ? (
          <span
            onClick={(e) => getOprLog(operationDatas.operation.operationId)}
          >
            <i className="bi bi-check "></i>
            {operationDatas.operation.operationId}
          </span>
        ) : (
          <span
            onClick={(e) => getOprLog(e, operationDatas.operation.operationId)}
          >
            <i className="bi-clock-history"></i>
            {operationDatas.operation.operationId}
          </span>
        )}
      </div>
      <div className="col-md-4 mx-auto">
        {operationDatas.operation.operationId} /{" "}
        {getOperationNumber(operationDatas.operation.operationNumber)}[{" "}
        {getOperationStatus(operationDatas.operation.operationStatus)} ]
      </div>
      <div className="col-md-2 mx-auto">
        {operationDatas.operation.details ? (
          <span>{operationDatas.operation.details}</span>
        ) : (
          <span>N/A</span>
        )}
      </div>
      <div className="col-md-2 mx-auto">
        {Moment(operationDatas.operation.operationStartDate).format(
          "DD-MMM-YYYY"
        )}
      </div>
      <div className="col-md-1 mx-auto">
        {operationDatas.operation.opQTYDone}
      </div>
      <div className="col-md-1 mx-auto">
        {operationDatas.operation.opQTYRequired}
      </div>
    </div>
  );
};

export default Operation;
