import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import OperationService from "../../services/operation.service";
import {
  getOperationStatusToDisplay,
  getOperationNumber,
  getOperationStatus,
} from "../../services/local.service";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import Moment from "moment";

const Operation_Edit = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const workOrderIdParam = location.state.workOrderId;
  const operationIdParam = location.state.operationId;

  const [operationStatusCollection, setOperationStatusCollection] = useState(
    []
  );

  const [modelErrors, setModelErrors] = useState([]);

  const [opEditResponse, setOpEditResponse] = useState({});

  // form
  const [details, setDetails] = useState("");
  const [operationStatus, setOperationStatus] = useState("");
  const [operationStartDate, setOperationStartDate] = useState("");
  const [opQTYRequired, setOpQTYRequired] = useState(0);
  const [operationNumber, setOperationNumber] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else {
      setOperationStatusCollection(getOperationStatusToDisplay());
      getOperation(operationIdParam);
    }
  }, []);

  const getOperation = (id) => {
    console.log("Editing Operation : ", id);
    if (checkForNumbersOnly(id)) {
      OperationService.getOperation(id)
        .then((response) => {
          if (response.data === "") {
            // data not found on server!
            var opEditResponse = {
              responseCode: -1,
              responseMessage: "Operation Not Found!",
            };

            setOpEditResponse(opEditResponse);
          } else {
            console.log(response.data);

            if (response.data.details === null) {
              setDetails("");
            } else {
              setDetails(response.data.details);
            }

            if (response.data.operationStartDate === null) {
              setOperationStartDate("");
            } else {
              // convert c# date into react-bootstrap-date picker date format
              setOperationStartDate(
                new Date(response.data.operationStartDate)
                  .toISOString()
                  .slice(0, 10)
              );
            }

            setOperationStatus(response.data.operationStatus);
            setOpQTYRequired(response.data.opQTYRequired);
            setOperationNumber(response.data.operationNumber);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else navigate("/operation/" + workOrderIdParam);
  };

  // reset form
  // form reference
  const formRef = useRef(null);

  const handleDetails = (event) => {
    setDetails(event.target.value);
    if (!errors[details])
      setErrors({
        ...errors,
        details: "",
      });
  };
  const handleOperationStatus = (event) => {
    setOperationStatus(event.target.value);
    if (!errors[operationStatus])
      setErrors({
        ...errors,
        operationStatus: "",
      });
  };
  const handleOperationStartDate = (event) => {
    setOperationStartDate(event.target.value);
    if (!errors[operationStartDate])
      setErrors({
        ...errors,
        operationStartDate: "",
      });
  };
  const handleOpQTYRequired = (event) => {
    setOpQTYRequired(event.target.value);
    if (!errors[opQTYRequired])
      setErrors({
        ...errors,
        opQTYRequired: "",
      });
  };

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const findFormErrors = () => {
    const newErrors = {};

    if (!operationStatus || operationStatus === "")
      newErrors.operationStatus = "Operatiopn-Status is Required!";

    if (
      (opQTYRequired || opQTYRequired !== "") &&
      !checkForNumbersOnly(opQTYRequired)
    )
      newErrors.opQTYRequired = "Only Numbers are Allowed!";

    return newErrors;
  };

  const handleModelState = (error) => {
    var errors = [];
    if (error.response.status === 400) {
      // console.log(error.response.data);

      // for (let prop in error.response.data.errors) {
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
      var oDate = Moment(operationStartDate);
      var oCheck = oDate.isValid();

      if (!oCheck) setOperationStartDate("");

      var opModel = {
        operationId: operationIdParam,
        workOrderId: workOrderIdParam,
        operationNumber: parseInt(operationNumber),
        details: details,
        operationStatus: operationStatus,
        operationStartDate: operationStartDate,
        opQTYRequired: parseInt(opQTYRequired),
      };

      console.log(opModel);

      // api call
      OperationService.editOperation(opModel)
        .then((response) => {
          console.log(response.data);

          setModelErrors([]);
          setOpEditResponse({});
          var opEditResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };
          if (response.data.responseCode === 0) resetForm();

          setOpEditResponse(opEditResponse);
          if (response.data.responseCode === 0) {
            setTimeout(() => {
              navigate("/operation/" + workOrderIdParam);
            }, 3000);
          }
        })
        .catch((error) => {
          setModelErrors([]);
          setOpEditResponse({});
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

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setDetails("");
    setOperationStatus("");
    setOperationStartDate("");
    setOpQTYRequired(0);
    setOpEditResponse({});
    setModelErrors([]);
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

  const renderOptionsForOperationStatus = () => {
    return operationStatusCollection.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.opStatus}>
          {dt.opStatus}
        </option>
      );
    });
  };

  const goBack = (e) => {
    navigate("/operation/" + workOrderIdParam);
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-10 mx-auto">
                    <h3>
                      Edit Operation # {operationIdParam}
                      <br />
                      Work-Order # {workOrderIdParam}
                      <br />
                      Operation # {getOperationNumber(operationNumber)}
                    </h3>
                    <p></p>{" "}
                    {opEditResponse && opEditResponse.responseCode === -1 ? (
                      <span className="opEditError">
                        {opEditResponse.responseMessage}
                      </span>
                    ) : (
                      <span className="opEditSuccess">
                        {opEditResponse.responseMessage}
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
                      <Form.Group controlId="details">
                        <Form.Label>Op-Details</Form.Label>
                        <Form.Control
                          value={details}
                          as="textarea"
                          rows="3"
                          isInvalid={!!errors.details}
                          onChange={(e) => handleDetails(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.details}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="opQTYRequired">
                        <Form.Label>Op-QTY-Required</Form.Label>
                        <Form.Control
                          value={opQTYRequired}
                          className="qtyDisplay"
                          type="text"
                          isInvalid={!!errors.opQTYRequired}
                          onChange={(e) => handleOpQTYRequired(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.opQTYRequired}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                    </div>
                    <div className="col-md-1 mx-auto"></div>
                    <div className="col-md-5 mx-auto">
                      <p></p>
                      <Form.Group controlId="operationStartDate">
                        <Form.Label>Op-Start-Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="operationStartDate"
                          value={operationStartDate}
                          placeholder="Operation Start Date"
                          isInvalid={!!errors.operationStartDate}
                          onChange={(e) => handleOperationStartDate(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.operationStartDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="operationStatus">
                        <Form.Label>Op-Status</Form.Label>
                        <Form.Control
                          as="select"
                          value={operationStatus}
                          isInvalid={!!errors.operationStatus}
                          onChange={(e) => handleOperationStatus(e)}
                        >
                          <option value="">Select Operation Status</option>
                          {renderOptionsForOperationStatus()}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.operationStatus}
                        </Form.Control.Feedback>
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
                      Edit Operation
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
export default Operation_Edit;
