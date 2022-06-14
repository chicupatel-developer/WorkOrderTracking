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

// google chart api
import Chart from "react-google-charts";

const CustomerOrder_Progress_Text_Rep = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [customerOrderData, setCustomerOrderData] = useState({});
  const [workOrderData, setWorkOrderData] = useState({});
  const [operationData, setOperationData] = useState({});

  const [chartData, setChartData] = useState([[]]);

  const getCustomerOrder_Progress_Text_Report = (id) => {
    CustomerOrderService.getCustomerOrderProgressTextReport(id)
      .then((response) => {
        console.log(response.data);

        setCustomerOrderData(response.data.customerOrder);
        setWorkOrderData(response.data.workOrder);
        setOperationData(response.data.operationDatas);
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

  // operation progress v/s QTY - [Done] [Required]
  // display google chart
  const displayOperationProgress = (e) => {
    CustomerOrderService.getCustomerOrderProgressChartReport(id)
      .then((response) => {
        console.log(response.data);

        if (response.data.length < 1) {
          setChartData([]);
        } else {
          var chartDatas_ = [];
          var firstItem = ["Operation Number", "QTY Done", "QTY Required"];
          chartDatas_.push(firstItem);
          setChartData(chartDatas_);

          response.data.map((item, i) => {
            setChartData((oldValues) => [
              ...oldValues,
              [item.operationNumber + "", item.qtyDone, item.qtyRequired],
            ]);
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
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

      <div className="container">
        {chartData && chartData.length > 1 ? (
          <Chart
            // width={"700px"}
            // height={"320px"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
              title: "Operation Progress v/s QTY - [Done] [Required]",
              chartArea: { width: "70%" },
              hAxis: {
                title: "QTY - [Done] [Required]",
                minValue: 0,
                textStyle: {
                  fontSize: 12,
                  color: "black",
                  bold: true,
                  italic: true,
                },
              },
              vAxis: {
                title: "Operation",
                textStyle: {
                  fontSize: 14,
                  color: "black",
                  bold: true,
                  italic: true,
                },
              },
              colors: ["green", "red"],
            }}
            rootProps={{ "data-testid": "1" }}
          />
        ) : (
          <div>
            {chartData && chartData.length === 0 ? (
              <div className="noContent">Chart-Data Not Found !</div>
            ) : (
              <Button
                className="btn btn-success"
                type="button"
                onClick={(e) => displayOperationProgress(e)}
              >
                Operation Progress [google Chart api]
              </Button>
            )}
          </div>
        )}
      </div>

      <hr />
      <p></p>
      <div className="opContent">
        <p></p>
        <span className="opMainHeader">Operations</span>
        <p></p>
        <div className="row">
          <div className="col-md-12 mx-auto">
            {operationData && operationData.length > 0 ? (
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
                {operationData && operationData.length > 0 ? (
                  <div>
                    {operationData.map((data, index) => {
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
