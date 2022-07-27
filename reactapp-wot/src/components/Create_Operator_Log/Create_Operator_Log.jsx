import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import OperatorLogService from "../../services/operatorLog.service";
import { getOperationStatusForOperatorToDisplay } from "../../services/local.service";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import Moment from "moment";

import DateTimePicker from "react-datetime-picker";

const Create_Operator_Log = () => {
  let navigate = useNavigate();
  let location = useLocation();

  // reset form
  // form reference
  const formRef = useRef(null);

  const [operationStatusCollection, setOperationStatusCollection] = useState(
    []
  );
  const [workOrders, setWorkOrders] = useState([]);
  const [operations, setOperations] = useState([]);
  const [opQtyData, setOpQtyData] = useState("");

  const [modelErrors, setModelErrors] = useState([]);
  const [opCreateResponse, setOpCreateResponse] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [startControl, setStartControl] = useState(false);
  const [pauseControl, setPauseControl] = useState(false);

  // startRunTimeValue, pauseRunTimeValue are NOT part of the form-control
  // so validation is separate @ submit
  // const [startRunTimeValue, onStartTimeChange] = useState(new Date());
  const [startRunTimeValue, onStartTimeChange] = useState(null);
  const [pauseRunTimeValue, onPauseTimeChange] = useState(null);

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Operator"))
      navigate("/un-auth");
    else {
      setOperationStatusCollection(getOperationStatusForOperatorToDisplay());
      getWorkOrderList();
    }
  }, []);

  const setField = (field, value) => {
    // workorderid
    if (field === "workOrderId") {
      setOperations([]);
      setOpQtyData("");
      if (value !== "") {
        console.log("getting operations for wo#", value);
        getOperationList(value);
      }
    }

    // operationid
    if (field === "operationId") {
      setOpQtyData("");
      if (value !== "") {
        console.log("getting operation qty data for op#", value);
        getOpQtyData(value);
      }
    }

    // operationstatus
    if (field === "operationStatus") {
      // Start_Running
      if (value === "0") {
        // enable start_run_time
        setStartControl(true);
        // disable pause_run_time && qty-done
        setPauseControl(false);
      }
      // Pause_Running
      else if (value === "1") {
        // disable start_run_time
        setStartControl(false);
        // enable pause_run_time && qty-done
        setPauseControl(true);
      } else {
        setStartControl(false);
        setPauseControl(false);
      }
    }

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

  const getWorkOrderList = () => {
    OperatorLogService.getWorkOrderList()
      .then((response) => {
        console.log(response.data);
        setWorkOrders(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getOperationList = (selectedWoId) => {
    OperatorLogService.getOperationList(selectedWoId)
      .then((response) => {
        console.log(response.data);
        setOperations(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getOpQtyData = (selectedOpId) => {
    OperatorLogService.getOperationQtyData(selectedOpId)
      .then((response) => {
        if (response.data.statusCode !== -1) {
          setOpQtyData(
            "[ Qty Done : " +
              response.data.qtyDone +
              ", Qty Req : " +
              response.data.qtyRequired +
              " ]"
          );
        } else {
          setOpQtyData(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const goBack = (e) => {
    navigate("/home");
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
    setOpCreateResponse({});
    setModelErrors([]);
    onStartTimeChange(null);
    onPauseTimeChange(null);
  };

  const findFormErrors = () => {
    setModelErrors([]);
    setOpCreateResponse({});

    const { operationId, workOrderId, operationStatus, opQtyDone } = form;
    const newErrors = {};

    if (!operationId || operationId === "")
      newErrors.operationId = "Operation is Required!";
    if (!workOrderId || workOrderId === "")
      newErrors.workOrderId = "Work-Order is Required!";
    if (!operationStatus || operationStatus === "")
      newErrors.operationStatus = "Operation-Status is Required!";

    if (!(!opQtyDone || opQtyDone === "")) {
      if (!checkForNumbersOnly(opQtyDone))
        newErrors.opQtyDone = "Only Numbers are Allowed!";
    }

    if (pauseControl && (opQtyDone === "" || opQtyDone === undefined)) {
      newErrors.opQtyDone = "Qty-Done is Required!";
    }

    return newErrors;
  };

  const handleModelState = (error) => {
    var errors = [];
    if (error.response.status === 400) {
      for (let prop in error.response.data) {
        if (error.response.data[prop].length > 1) {
          for (let error_ in error.response.data[prop]) {
            errors.push(error.response.data[prop][error_]);
          }
        } else {
          errors.push(error.response.data[prop]);
        }
      }
    } else {
      console.log(error);
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    // startRunTimeValue, pauseRunTimeValue are NOT part of the form-control
    // so validation is separate @ submit
    if (startControl && startRunTimeValue === null) {
      newErrors.startRunTimeValue = "Start Run Time is Required!";
      newErrors.pauseRunTimeValue = "";
    }
    if (pauseControl && pauseRunTimeValue === null) {
      newErrors.pauseRunTimeValue = "Pause Run Time is Required!";
      newErrors.startRunTimeValue = "";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("form is valid!");

      var oprLogModel = {
        operationId: form.operationId,
        workOrderId: form.workOrderId,
        operationStatus: form.operationStatus,
        opQtyDone: form.opQtyDone,
        opStartRunTime: startRunTimeValue,
        opPauseRunTime: pauseRunTimeValue,
        userId: AuthService.getCurrentUserId(),
        operatorId: 0,
      };

      if (startControl) {
        oprLogModel.opQtyDone = 0;
        oprLogModel.opPauseRunTime = null;
        startRunTimeValue.setHours(startRunTimeValue.getHours() - 5);
        oprLogModel.opStartRunTime = startRunTimeValue;

        // check for ModelState on server side
        // oprLogModel.opStartRunTime = null;
      }
      if (pauseControl) {
        oprLogModel.opQtyDone = Number(form.opQtyDone);
        oprLogModel.opStartRunTime = null;
        pauseRunTimeValue.setHours(pauseRunTimeValue.getHours() - 5);
        oprLogModel.opPauseRunTime = pauseRunTimeValue;

        // check for ModelState on server side
        // oprLogModel.opPauseRunTime = null;
        // oprLogModel.opQtyDone = null;
      }

      console.log(oprLogModel);

      // api call
      OperatorLogService.createOperatorLog(oprLogModel)
        .then((response) => {
          setModelErrors([]);
          setOpCreateResponse({});
          console.log(response.data);

          var opCreateResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };
          if (response.data.responseCode === 0) {
            resetForm();
            setOpCreateResponse(opCreateResponse);
          } else if (response.data.responseCode === -1) {
            setOpCreateResponse(opCreateResponse);
          }
        })
        .catch((error) => {
          console.log(error);
          setModelErrors([]);
          setOpCreateResponse({});
          // 400
          // ModelState
          if (error.response.status === 400) {
            console.log("400 !");
            var modelErrors = handleModelState(error);
            setModelErrors(modelErrors);
          }
        });
    }
  };

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const renderOptionsForWorkOrders = () => {
    return workOrders.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.text}>
          {dt.text}
        </option>
      );
    });
  };
  const renderOptionsForOperations = () => {
    return operations.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.text}>
          {dt.text}
        </option>
      );
    });
  };
  const renderOptionsForOperationStatus = () => {
    return operationStatusCollection.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.opStatus}>
          {dt.opStatus}
        </option>
      );
    });
  };

  let modelErrorList =
    modelErrors.length > 0 &&
    modelErrors.map((item, i) => {
      return (
        <ul key={i} value={item}>
          <li style={{ marginTop: -20 }}>{item}</li>
        </ul>
      );
    }, this);

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-10 mx-auto">
                    <h3>Create Operator - Log</h3>
                    <p></p>
                    {opCreateResponse &&
                    opCreateResponse.responseCode === -1 ? (
                      <span className="opCreateError">
                        {opCreateResponse.responseMessage}
                      </span>
                    ) : (
                      <span className="opCreateSuccess">
                        {opCreateResponse.responseMessage}
                      </span>
                    )}
                    {modelErrors.length > 0 ? (
                      <div className="modelError">{modelErrorList}</div>
                    ) : (
                      <span></span>
                    )}
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
                <Form ref={formRef}>
                  <div className="row">
                    <div className="col-md-6 mx-auto">
                      <Form.Group controlId="workOrderId">
                        <Form.Label>Work-Order</Form.Label>
                        <Form.Control
                          as="select"
                          isInvalid={!!errors.workOrderId}
                          onChange={(e) => {
                            setField("workOrderId", e.target.value);
                          }}
                        >
                          <option value="">Select Work-Order</option>
                          {renderOptionsForWorkOrders()}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.workOrderId}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="operationId">
                        <Form.Label>Operation</Form.Label>

                        <br />
                        {opQtyData && (
                          <span className="opQtyData">{opQtyData}</span>
                        )}

                        <Form.Control
                          as="select"
                          isInvalid={!!errors.operationId}
                          onChange={(e) => {
                            setField("operationId", e.target.value);
                          }}
                        >
                          <option value="">Select Operation</option>
                          {renderOptionsForOperations()}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.operationId}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="operationStatus">
                        <Form.Label>Operation Status</Form.Label>
                        <Form.Control
                          as="select"
                          isInvalid={!!errors.operationStatus}
                          onChange={(e) => {
                            setField("operationStatus", e.target.value);
                          }}
                        >
                          <option value="">Select Operation Status</option>
                          {renderOptionsForOperationStatus()}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.operationStatus}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mx-auto">
                      <Form.Group controlId="opQtyDone">
                        <Form.Label>Qty-Done</Form.Label>
                        <Form.Control
                          disabled={!pauseControl}
                          className="qtyField"
                          type="text"
                          isInvalid={!!errors.opQtyDone}
                          onChange={(e) =>
                            setField("opQtyDone", e.target.value)
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.opQtyDone}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Label>Start Run Time</Form.Label>
                      <br />
                      {console.log(startRunTimeValue)}
                      <DateTimePicker
                        disabled={!startControl}
                        controlId="startRunTimeValue"
                        onChange={onStartTimeChange}
                        value={startRunTimeValue}
                      />
                      {errors.startRunTimeValue !== "" && (
                        <div className="timeError">
                          {errors.startRunTimeValue}
                        </div>
                      )}
                      <p></p>
                      <Form.Label>Pause Run Time</Form.Label>
                      <br />
                      <DateTimePicker
                        disabled={!pauseControl}
                        controlId="pauseRunTimeValue"
                        onChange={onPauseTimeChange}
                        value={pauseRunTimeValue}
                      />
                      {errors.pauseRunTimeValue && (
                        <div className="timeError">
                          {errors.pauseRunTimeValue}
                        </div>
                      )}
                    </div>
                  </div>
                  <p></p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      className="btn btn-success"
                      type="button"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Create New Operator Log
                    </Button>
                    <Button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => resetForm(e)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_Operator_Log;
