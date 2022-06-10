import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import AuthService from "../../services/auth.service";
import { getWorkOrderStatus, getDaysLeft } from "../../services/local.service";
import CustomerOrderService from "../../services/customerOrder.service";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import Moment from "moment";

const CustomerOrder_Progress_Text_Rep = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [reportData, setReportData] = useState({});

  const getCustomerOrder_Progress_Text_Report = (id) => {
    CustomerOrderService.getCustomerOrderProgressTextReport(id)
      .then((response) => {
        console.log(response.data);
        setReportData(response.data);
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

  return (
    <div className="container">
      <div className="mainHeader">Customer-Order-Progress [Text-Report]</div>
      <hr />

      {reportData.customerOrder ? (
        <div>
          <div className="row">
            <div className="col-md-1 mx-auto"></div>
            <div className="col-md-5 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Customer-Order</h4>
                </div>
                <div className="card-body coBody">
                  Customer-Order #{" "}
                  <b>{reportData.customerOrder.customerOrderId}</b>
                  <br />
                  Name : {reportData.customerOrder.customerName}
                  <br />
                  Order Qty : {reportData.customerOrder.orderQuantity}
                  <br />
                  Order Date :{" "}
                  <span className="date">
                    {Moment(reportData.customerOrder.orderDate).format(
                      "DD-MMM-YYYY"
                    )}
                  </span>
                  <br />
                  Order Due Date :{" "}
                  <span className="date">
                    {Moment(reportData.customerOrder.orderDueDate).format(
                      "DD-MMM-YYYY"
                    )}
                  </span>
                  <br />
                  Days Left #{" "}
                  <span className="daysLeft">
                    {getDaysLeft(
                      Moment(reportData.customerOrder.orderDueDate).format(
                        "DD-MMM-YYYY"
                      ),
                      Moment(reportData.customerOrder.orderDate).format(
                        "DD-MMM-YYYY"
                      )
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-5 mx-auto">
              {reportData.workOrder ? (
                <div className="card">
                  <div className="card-header">
                    <h4>Work-Order</h4>
                  </div>
                  <div className="card-body coBody">
                    Work-Order # <b>{reportData.workOrder.workOrderId}</b>
                    <br />
                    Work-Order Status :{" "}
                    {getWorkOrderStatus(
                      reportData.workOrder.workOrderStatus
                    ) === "Completed" ? (
                      <span className="completedWos">
                        {getWorkOrderStatus(
                          reportData.workOrder.workOrderStatus
                        )}
                      </span>
                    ) : (
                      <span className="otherWos">
                        {getWorkOrderStatus(
                          reportData.workOrder.workOrderStatus
                        )}
                      </span>
                    )}
                    <p></p>
                    Work-Order Start Date :{" "}
                    {reportData.workOrder.workOrderStartDate ? (
                      <span className="date">
                        {Moment(reportData.workOrder.workOrderStartDate).format(
                          "DD-MMM-YYYY"
                        )}
                      </span>
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                </div>
              ) : (
                <span>Work-Order Not Found !</span>
              )}
            </div>
            <div className="col-md-1 mx-auto"></div>
          </div>

          <p></p>
          <div className="row">
            <div className="col-md-1 mx-auto"></div>
            <div className="col-md-11 mx-auto">
              {reportData.operationDatas &&
              reportData.operationDatas.length > 0 ? (
                <div className="card">
                  <div className="card-header">
                    <h4>Operations</h4>
                  </div>
                  <div className="card-body opBody"></div>
                </div>
              ) : (
                <div>Operations Not Found!</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <span>Customer-Order Not Found !</span>
      )}

      <p></p>
    </div>
  );
};

export default CustomerOrder_Progress_Text_Rep;
