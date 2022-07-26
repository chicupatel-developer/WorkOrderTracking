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

  const [modelErrors, setModelErrors] = useState([]);
  const [opCreateResponse, setOpCreateResponse] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

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

  const goBack = (e) => {
    navigate("/home");
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
    setOpCreateResponse({});
    setModelErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                    <p></p>{" "}
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
                    <div className="col-md-6 mx-auto"></div>
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
