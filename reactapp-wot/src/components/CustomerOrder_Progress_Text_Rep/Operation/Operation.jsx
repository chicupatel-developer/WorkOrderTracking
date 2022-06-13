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
    <tr key={index}>
      <td>
        {operationDatas.operation.opQTYDone >=
        operationDatas.operation.opQTYRequired ? (
          <span
            onClick={(e) => getOprLog(operationDatas.operation.operationId)}
          >
            <i className="bi bi-check opCompleted"></i>
          </span>
        ) : (
          <span
            onClick={(e) => getOprLog(e, operationDatas.operation.operationId)}
          >
            <i className="bi-clock-history opNotCompleted"></i>
          </span>
        )}
      </td>
      <td>{operationDatas.operation.operationId}</td>
      <td>{getOperationNumber(operationDatas.operation.operationNumber)}</td>
      <td>
        {operationDatas.operation.details ? (
          <span>{operationDatas.operation.details}</span>
        ) : (
          <span>N/A</span>
        )}
      </td>
      <td>{getOperationStatus(operationDatas.operation.operationStatus)}</td>
      <td>
        {Moment(operationDatas.operation.operationStartDate).format(
          "DD-MMM-YYYY"
        )}
      </td>
      <td>{operationDatas.operation.opQTYDone}</td>
      <td>{operationDatas.operation.opQTYRequired}</td>
    </tr>
  );
};

export default Operation;
