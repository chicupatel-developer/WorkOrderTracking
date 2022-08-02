import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import OperatorLogService from "../../services/operatorLog.service";
import {
  getViewMyLogDataEnumValues,
  getWorkOrderStatus,
  getDaysLeft,
  getOperationStatus,
  getOperationNumber,
  getOperationStatusForOperator,
} from "../../services/local.service";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import Moment from "moment";

// react-bootstrap-table-2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const View_Operator_Log = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const [logData, setLogData] = useState([]);

  const [logDataOptions, setLogDataOptions] = useState([]);

  const [apiResponse, setApiResponse] = useState("");
  const [apiError, setApiError] = useState(false);
  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Operator"))
      navigate("/un-auth");
    else {
      setLogDataOptions(getViewMyLogDataEnumValues());
    }
  }, []);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { viewMyLogData } = form;
    const newErrors = {};

    if (!viewMyLogData || viewMyLogData === "")
      newErrors.viewMyLogData = "Log Option is required!";

    return newErrors;
  };

  const renderOptionsForViewMyLogData = () => {
    return logDataOptions.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.text}>
          {dt.text}
        </option>
      );
    });
  };

  const displayDate = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return Moment(cell).format("DD-MMM hh:mm A");
    }
  };

  const displayOperation = (cell, row) => {
    return (
      <span>
        <span># {cell}</span>
        <br />
        <span>{getOperationNumber(row.operationNumber)}</span>
        <br />
        <span>{getOperationStatus(row.operationStatus)}</span>
      </span>
    );
  };
  const columns = [
    {
      dataField: "operatorActivityId",
      text: "#",
    },
    {
      dataField: "workOrderId",
      text: "Wo #",
    },
    {
      dataField: "operationId",
      text: "Operation",
      formatter: (cell, row) => displayOperation(cell, row),
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
      dataField: "cycleTime",
      text: "Cycle Time",
    },
    {
      dataField: "opQtyDone",
      text: "QTY Done",
    },
  ];

  const goBack = (e) => {
    navigate("/home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("form is valid!");

      var operatorLogDataView = {
        logDataRange: form.viewMyLogData,
        userId: AuthService.getCurrentUserId(),
      };
      console.log(operatorLogDataView);
      // api call
      OperatorLogService.getMyLogData(operatorLogDataView)
        .then((response) => {
          console.log(response.data);
          if (response.data.response.responseCode === 0) {
            setApiResponse(response.data.response.responseMessage);
            setApiError(false);
            setLogData(response.data.logData);
          } else {
            setApiResponse(
              response.data.response.responseCode +
                " : " +
                response.data.response.responseMessage
            );
            setApiError(true);
            setLogData([]);
          }
        })
        .catch((error) => {
          console.log(error);
          setApiResponse("Error !");
          setApiError(true);
          setLogData([]);
        });
    }
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-10 mx-auto">
                    <h3>View Operator-Log</h3>
                    <p></p>
                  </div>
                  <div className="col-md-2 mx-auto">
                    <Button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => goBack(e)}
                    >
                      <i className="bi bi-arrow-return-left"></i> Back
                    </Button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <Form>
                  <Form.Group controlId="viewMyLogData">
                    <Form.Control
                      className="displayOptions"
                      as="select"
                      isInvalid={!!errors.viewMyLogData}
                      onChange={(e) => {
                        setField("viewMyLogData", e.target.value);
                      }}
                    >
                      <option value="">Choose My Log Option</option>
                      {renderOptionsForViewMyLogData()}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="formControlError"
                      type="invalid"
                    >
                      {errors.viewMyLogData}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      className="btn btn-success"
                      type="button"
                      onClick={(e) => handleSubmit(e)}
                    >
                      View My Log
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <p></p>
        <div className="row">
          <div className="col-md-12 mx-auto">
            <div>
              {logData && logData.length > 0 ? (
                <BootstrapTable
                  bootstrap4
                  keyField="operatorActivityId"
                  data={logData}
                  columns={columns}
                  pagination={paginationFactory({ sizePerPage: 10 })}
                  filter={filterFactory()}
                />
              ) : (
                <div>
                  {console.log(apiResponse)}
                  {apiResponse === "" ? (
                    <div></div>
                  ) : (
                    <div className="noData">Data Not Found!</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View_Operator_Log;
