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

import OperatorLog from "./OperatorLog/OperatorLog";

const Operation = ({ operationDatas, index }) => {
  return (
    <div>
      <div key={index} className="row opBody">
        <div className="col-md-1 mx-auto">
          {operationDatas.operation.opQTYDone >=
          operationDatas.operation.opQTYRequired ? (
            <span className="opCompleted">
              <i className="bi bi-check"></i>
            </span>
          ) : (
            <span className="opNotCompleted">
              <i className="bi-clock-history"></i>
            </span>
          )}
        </div>
        <div className="col-md-3 mx-auto">
          {operationDatas.operation.operationId} /{" "}
          {getOperationNumber(operationDatas.operation.operationNumber)}
          <br />[{getOperationStatus(operationDatas.operation.operationStatus)}]
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
        <div className="col-md-2 mx-auto">
          {operationDatas.operation.opQTYDone}
        </div>
        <div className="col-md-2 mx-auto">
          {operationDatas.operation.opQTYRequired}
        </div>
      </div>

      <div className="row oprHeader">
        <div className="col-md-1 mx-auto"></div>
        <div className="col-md-2 mx-auto">Opr</div>
        <div className="col-md-3 mx-auto">Operation</div>
        <div className="col-md-2 mx-auto">QTY Done</div>
        <div className="col-md-1 mx-auto">Start</div>
        <div className="col-md-1 mx-auto">Pause</div>
        <div className="col-md-1 mx-auto">Cycle</div>
      </div>
      <div className="row">
        <div className="col-md-12 mx-auto">
          {operationDatas.operationHistory &&
          operationDatas.operationHistory.length > 0 ? (
            <div>
              {operationDatas.operationHistory.map((data, i) => {
                return <OperatorLog operatorLogData={data} key={i} />;
              })}
            </div>
          ) : (
            <div className="noContent">Operator's Log Not Found!</div>
          )}
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Operation;
