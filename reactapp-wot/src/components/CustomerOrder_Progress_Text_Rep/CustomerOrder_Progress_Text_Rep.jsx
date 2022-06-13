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
      <div className="row">
        <div className="col-md-1 mx-auto"></div>
        <div className="col-md-11 mx-auto">
          {reportData.operationDatas && reportData.operationDatas.length > 0 ? (
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

      <p></p>
      <hr />
      <p></p>

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
                <span className="noContent">Work-Order Not Found !</span>
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
                  <div className="card-body opBody">
                    {oprActivities && oprActivities.length > 0 ? (
                      <Table className="oprTable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Opr #</th>
                            <th>Op</th>
                            <th>QTY Done</th>
                            <th>Start</th>
                            <th>Pause</th>
                            <th>Cycle</th>
                          </tr>
                        </thead>
                        <tbody>
                          {oprActivities.map((data, index) => {
                            return (
                              <tr key={index}>
                                <td>{data.operatorActivityId}</td>
                                <td>
                                  {data.operator.firstName} ,{" "}
                                  {data.operator.lastName}
                                </td>
                                <td>
                                  {data.operationId} /{" "}
                                  {getOperationNumber(data.operationNumber)} [
                                  {getOperationStatusForOperator(
                                    data.operationStatus
                                  )}
                                  ]
                                </td>

                                <td>{data.opQtyDone}</td>
                                <td>
                                  {Moment(data.opStartRunTime).format(
                                    "MMM, DD - hh:mm A"
                                  )}
                                </td>
                                <td>
                                  {Moment(data.opPauseRunTime).format(
                                    "MMM, DD - hh:mm A"
                                  )}
                                </td>
                                <td>{data.cycleTime}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    ) : (
                      <span></span>
                    )}

                    <Table striped hover variant="light" className="opTable">
                      <thead>
                        <tr>
                          <th>Opr Log</th>
                          <th>#</th>
                          <th>OP Number</th>
                          <th>Details</th>
                          <th>Op Status</th>
                          <th>Op Start Date</th>
                          <th>QTY Done</th>
                          <th>QTY Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.operationDatas.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {data.operation.opQTYDone >=
                                data.operation.opQTYRequired ? (
                                  <span
                                    onClick={(e) =>
                                      getOprLog(data.operation.operationId)
                                    }
                                  >
                                    <i className="bi bi-check opCompleted"></i>
                                  </span>
                                ) : (
                                  <span
                                    onClick={(e) =>
                                      getOprLog(e, data.operation.operationId)
                                    }
                                  >
                                    <i className="bi-clock-history opNotCompleted"></i>
                                  </span>
                                )}
                              </td>
                              <td>{data.operation.operationId}</td>
                              <td>
                                {getOperationNumber(
                                  data.operation.operationNumber
                                )}
                              </td>
                              <td>
                                {data.operation.details ? (
                                  <span>{data.operation.details}</span>
                                ) : (
                                  <span>N/A</span>
                                )}
                              </td>
                              <td>
                                {getOperationStatus(
                                  data.operation.operationStatus
                                )}
                              </td>
                              <td>
                                {Moment(
                                  data.operation.operationStartDate
                                ).format("DD-MMM-YYYY")}
                              </td>
                              <td>{data.operation.opQTYDone}</td>
                              <td>{data.operation.opQTYRequired}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="noContent">Operations Not Found!</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <span className="noContent">Customer-Order Not Found !</span>
      )}

      <p></p>
    </div>
  );
};

export default CustomerOrder_Progress_Text_Rep;
