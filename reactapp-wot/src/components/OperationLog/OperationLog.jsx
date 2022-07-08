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
import OperationService from "../../services/operation.service";
import { useNavigate } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

// react-bootstrap-table-2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import Moment from "moment";

const OperationLog = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [opLog, setOpLog] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else GetOperationLogData(id);
  }, []);

  const GetOperationLogData = (id) => {
    OperationService.getOperationLogData(id)
      .then((response) => {
        console.log(response.data);

        // add index column to response.data.operationHistory
        var index = 1;
        response.data.operationHistory.forEach(function (element) {
          element.id = index++;
        });
        console.log(response.data.operationHistory);

        setOpLog(response.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          console.log("Token Not Found!");
          AuthService.logout();
          navigate("/login");
        } else if (e.response.status === 400) {
          setApiError(e.response.data);
        }
      });
  };

  const displayDate = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return Moment(cell).format("DD-MMM, h:mm a");
    }
  };

  const displayOperator = (cell, row) => {
    return row.operatorName + " [" + cell + "]";
  };

  const columns = [
    {
      dataField: "id",
      text: "#",
      sort: true,
    },
    {
      dataField: "cycleTime",
      text: "Cycle Time",
      sort: true,
    },
    {
      dataField: "opStartRunTime",
      text: "Start Time",
      formatter: (cell) => displayDate(cell),
    },
    {
      dataField: "opPauseRunTime",
      text: "Pause Time",
      formatter: (cell) => displayDate(cell),
    },
    {
      dataField: "operatorId",
      text: "Operator",
      formatter: (cell, row) => displayOperator(cell, row),
    },
    {
      dataField: "qtyDone",
      text: "QTY-Done",
    },
  ];

  const goBack = (e) => {
    navigate("/operation/" + opLog.workOrderId);
  };

  return (
    <div className="container">
      <div className="mainHeader">Operation-Log</div>
      <hr />

      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="subHeader">
            Operation # {id}
            <br />
            Operation Number # {getOperationNumber(opLog.operationNumber)}
            <br />
            Work-Order # {opLog.workOrderId}
          </div>
          {apiError && <div className="apiError">{apiError}</div>}

          {opLog.operationHistory && opLog.operationHistory.length > 0 && (
            <div className="operationHeader">Operation-Log-Data</div>
          )}
        </div>

        <div className="col-md-2 mx-auto">
          {opLog && opLog.workOrderId ? (
            <Button
              className="btn btn-primary"
              type="button"
              onClick={(e) => goBack(e)}
            >
              <i className="bi bi-arrow-return-left"></i> Back
            </Button>
          ) : (
            <span></span>
          )}
        </div>
      </div>

      <p></p>

      {opLog.operationHistory && opLog.operationHistory.length > 0 ? (
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={opLog.operationHistory}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 20 })}
          filter={filterFactory()}
        />
      ) : (
        <div className="noOps">No Operation-History!</div>
      )}
    </div>
  );
};

export default OperationLog;
