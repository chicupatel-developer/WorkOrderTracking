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

const CustomerOrder = ({ customerOrderData }) => {
  return (
    <div>
      {customerOrderData ? (
        <div>
          <div className="card">
            <div className="card-header">
              <h4>Customer-Order</h4>
            </div>
            <div className="card-body coBody">
              Customer-Order # <b>{customerOrderData.customerOrderId}</b>
              <br />
              Name : {customerOrderData.customerName}
              <br />
              Order Qty : {customerOrderData.orderQuantity}
              <br />
              Order Date :{" "}
              <span className="date">
                {Moment(customerOrderData.orderDate).format("DD-MMM-YYYY")}
              </span>
              <br />
              Order Due Date :{" "}
              <span className="date">
                {Moment(customerOrderData.orderDueDate).format("DD-MMM-YYYY")}
              </span>
              <br />
              Days Left #{" "}
              <span className="daysLeft">
                {getDaysLeft(
                  Moment(customerOrderData.orderDueDate).format("DD-MMM-YYYY"),
                  Moment(customerOrderData.orderDate).format("DD-MMM-YYYY")
                )}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <span className="noContent">Customer-Order Not Found !</span>
      )}
    </div>
  );
};

export default CustomerOrder;
