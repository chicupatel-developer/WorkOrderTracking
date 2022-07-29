import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import OperationService from "../../services/operation.service";
import { getViewMyLogDataEnumValues } from "../../services/local.service";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import Moment from "moment";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("form is valid!");
    }
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 mx-auto formControl">
                    <Form>
                      <Form.Group controlId="viewMyLogData">
                        <Form.Control
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
                  <div className="col-md-9 mx-auto">display log data</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View_Operator_Log;
