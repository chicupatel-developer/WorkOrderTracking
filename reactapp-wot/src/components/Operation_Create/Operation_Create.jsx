import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import OperationService from "../../services/operation.service";
import {
  getOperationStatusToDisplay,
  getOperationNumberToDisplay,
} from "../../services/local.service";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import Moment from "moment";

const Operation_Create = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const workOrderIdParam = location.state.workOrderId;
  const [workOrders, setWorkOrders] = useState([]);
  const [operationStatusCollection, setOperationStatusCollection] = useState(
    []
  );
  const [operationNumberCollection, setOperationNumberCollection] = useState(
    []
  );
  const [modelErrors, setModelErrors] = useState([]);
  const [opCreateResponse, setOpCreateResponse] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else {
      setOperationStatusCollection(getOperationStatusToDisplay());
      setOperationNumberCollection(getOperationNumberToDisplay());
      getWorkOrderList();
    }
  }, []);

  const getWorkOrderList = () => {
    OperationService.getWorkOrderList()
      .then((response) => {
        console.log(response.data);
        setWorkOrders(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // reset form
  // form reference
  const formRef = useRef(null);

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
    const {
      operationNumber,
      workOrderId,
      operationStatus,
      operationStartDate,
      opQTYRequired,
    } = form;
    const newErrors = {};

    if (!operationNumber || operationNumber === "")
      newErrors.operationNumber = "Operation-Number is Required!";
    if (!workOrderId || workOrderId === "")
      newErrors.workOrderId = "Work-Order is Required!";
    if (!operationStatus || operationStatus === "")
      newErrors.operationStatus = "Operation-Status is Required!";

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      var oDate = Moment(form.operationStartDate);
      var oCheck = oDate.isValid();
      if (oCheck) {
        var opModel = {
          operationNumber: form.operationNumber,
          workOrderId: form.workOrderId,
          operationStatus: form.operationStatus,
          operationStartDate: form.operationStartDate,
          details: form.details,
          opQTYRequired: form.opQTYRequired,
        };

        console.log(opModel);

        // api call
        OperationService.createOperation(opModel)
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

              setTimeout(() => {
                navigate("/operation/" + workOrderIdParam);
              }, 3000);
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
      } else {
        console.log("Invalid Date(s) !");
        var opCreateResponse = {
          responseCode: -1,
          responseMessage: "Invalid Date !",
        };
        setOpCreateResponse(opCreateResponse);
        setModelErrors([]);
      }
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
    setOpCreateResponse({});
    setModelErrors([]);
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
  const renderOptionsForOperationStatus = () => {
    return operationStatusCollection.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.opStatus}>
          {dt.opStatus}
        </option>
      );
    });
  };

  const renderOptionsForOperationNumber = () => {
    return operationNumberCollection.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.opNumber}>
          {dt.opNumber}
        </option>
      );
    });
  };

  const goBack = (e) => {
    navigate("/operation/" + workOrderIdParam);
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
                    <h3>Create New Operation</h3>
                    <p></p>{" "}
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
                      <Form.Group controlId="operationNumber">
                        <Form.Label>Operation Number</Form.Label>
                        <Form.Control
                          as="select"
                          isInvalid={!!errors.operationNumber}
                          onChange={(e) => {
                            setField("operationNumber", e.target.value);
                          }}
                        >
                          <option value="">Select Operation Number</option>
                          {renderOptionsForOperationNumber()}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.operationNumber}
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
                      <p></p>
                      <Form.Group controlId="operationStartDate">
                        <Form.Label>Operation Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="operationStartDate"
                          placeholder="Operation Start Date"
                          isInvalid={!!errors.operationStartDate}
                          onChange={(e) =>
                            setField("operationStartDate", e.target.value)
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.operationStartDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="opQTYRequired">
                        <Form.Label>Qty Required</Form.Label>
                        <Form.Control
                          className="opQTYRequired"
                          type="text"
                          isInvalid={!!errors.opQTYRequired}
                          onChange={(e) =>
                            setField("opQTYRequired", e.target.value)
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.opQTYRequired}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="details">
                        <Form.Label>Details</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          isInvalid={!!errors.details}
                          onChange={(e) => setField("details", e.target.value)}
                        />
                      </Form.Group>
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
                      Create Operation
                    </Button>
                    <Button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => resetForm(e)}
                    >
                      Reset
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
export default Operation_Create;
