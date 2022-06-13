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

const WorkOrder = ({ workOrderData }) => {
  return (
    <div>
      {workOrderData ? (
        <div>
          <div className="card">
            <div className="card-header">
              <h4>Work-Order</h4>
            </div>
            <div className="card-body coBody">
              Work-Order # <b>{workOrderData.workOrderId}</b>
              <br />
              Work-Order Status :{" "}
              {getWorkOrderStatus(workOrderData.workOrderStatus) ===
              "Completed" ? (
                <span className="completedWos">
                  {getWorkOrderStatus(workOrderData.workOrderStatus)}
                </span>
              ) : (
                <span className="otherWos">
                  {getWorkOrderStatus(workOrderData.workOrderStatus)}
                </span>
              )}
              <p></p>
              Work-Order Start Date :{" "}
              {workOrderData.workOrderStartDate ? (
                <span className="date">
                  {Moment(workOrderData.workOrderStartDate).format(
                    "DD-MMM-YYYY"
                  )}
                </span>
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <span className="noContent">Work-Order Not Found !</span>
      )}
    </div>
  );
};

export default WorkOrder;
