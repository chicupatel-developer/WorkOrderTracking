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
import CustomerOrderService from "../../services/customerOrder.service";
import { useNavigate } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

import Moment from "moment";

import CustomerOrder from "./CustomerOrder/CustomerOrder";
import WorkOrder from "./WorkOrder/WorkOrder";
import Operation from "./Operation/Operation";

const CustomerOrder_Progress_Text_Rep = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [reportData, setReportData] = useState({});
  const [oprActivities, setOprActivities] = useState([]);

  const [customerOrderData, setCustomerOrderData] = useState({});
  const [workOrderData, setWorkOrderData] = useState({});
  const [operationData, setOperationData] = useState({});
  const [operationHistoryData, setOperationHistoryData] = useState([]);

  const getCustomerOrder_Progress_Text_Report = (id) => {
    CustomerOrderService.getCustomerOrderProgressTextReport(id)
      .then((response) => {
        console.log(response.data);
        setReportData(response.data);

        setCustomerOrderData(response.data.customerOrder);
        setWorkOrderData(response.data.workOrder);
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

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else getCustomerOrder_Progress_Text_Report(id);
  }, []);

  const getOprLog = (opId) => {
    console.log("operator log", opId);
    setOprActivities([]);
    var oprActivities = [];

    reportData.operationDatas.forEach(function (arrayItem) {
      arrayItem.operationHistory.forEach(function (item) {
        // console.log(item);
        if (item.operationId === opId) {
          oprActivities.push(item);
        }
      });
    });

    console.log(oprActivities);
    setOprActivities(oprActivities);
  };

  return (
    <div className="container">
      <div className="mainHeader">Customer-Order-Progress [Text-Report]</div>
      <hr />

      <div className="row">
        <div className="col-md-1 mx-auto"></div>
        <div className="col-md-5 mx-auto">
          <CustomerOrder customerOrderData={customerOrderData} />
        </div>
        <div className="col-md-5 mx-auto">
          <WorkOrder workOrderData={workOrderData} />
        </div>
        <div className="col-md-1 mx-auto"></div>
      </div>
      <p></p>

      <div className="opContent">
        <p></p>
        <span className="opMainHeader">Operations</span>
        <p></p>
        <div className="row">
          <div className="col-md-12 mx-auto">
            {reportData.operationDatas &&
            reportData.operationDatas.length > 0 ? (
              <div className="row opHeader">
                <div className="col-md-1 mx-auto">Status</div>
                <div className="col-md-3 mx-auto">Operation</div>
                <div className="col-md-2 mx-auto">Op Details</div>
                <div className="col-md-2 mx-auto">Op Start Date</div>
                <div className="col-md-2 mx-auto">QTY Done</div>
                <div className="col-md-2 mx-auto">QTY Required</div>
              </div>
            ) : (
              <span></span>
            )}

            <div className="row">
              <div className="col-md-12 mx-auto">
                {reportData.operationDatas &&
                reportData.operationDatas.length > 0 ? (
                  <div>
                    {reportData.operationDatas.map((data, index) => {
                      return <Operation operationDatas={data} key={index} />;
                    })}
                  </div>
                ) : (
                  <div className="noContent">Operations Not Found!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p></p>
    </div>
  );
};

export default CustomerOrder_Progress_Text_Rep;
