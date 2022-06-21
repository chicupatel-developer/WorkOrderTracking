import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import OperationService from "../../services/operation.service";

import { useNavigate } from "react-router";

import Moment from "moment";

const Xfer_Parts = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [parts, setParts] = useState([]);

  const [modelErrors, setModelErrors] = useState([]);

  const [xferEditResponse, setXferEditResponse] = useState({});

  // form
  const [partId, setPartId] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else {
      getParts();
    }
  }, []);

  const getParts = () => {
    OperationService.getPartList()
      .then((response) => {
        setParts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // reset form
  // form reference
  const formRef = useRef(null);

  const findFormErrors = () => {
    const newErrors = {};

    if (!partId || partId === "") newErrors.partId = "Part is Required!";

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
      var xferModel = {
        partId: partId,
        operationId: id,
      };
      console.log(xferModel);
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setPartId("");
    setXferEditResponse({});
    setModelErrors([]);
  };

  const handlePartId = (event) => {
    setPartId(event.target.value);
    if (!errors[partId])
      setErrors({
        ...errors,
        partId: "",
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
  const renderOptionsForParts = () => {
    return parts.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.text}>
          {dt.text}
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
                <h3>XFER - Parts - TO - Operation</h3>
                <p></p>{" "}
                {xferEditResponse && xferEditResponse.responseCode === -1 ? (
                  <span className="xferEditError">
                    {xferEditResponse.responseMessage}
                  </span>
                ) : (
                  <span className="xferEditSuccess">
                    {xferEditResponse.responseMessage}
                  </span>
                )}
                {modelErrors.length > 0 ? (
                  <div className="modelError">{modelErrorList}</div>
                ) : (
                  <span></span>
                )}
              </div>
              <div className="card-body">
                <Form ref={formRef}>
                  <div className="row">
                    <div className="col-md-6 mx-auto">
                      <Form.Group controlId="partId">
                        <Form.Label>Part</Form.Label>
                        <Form.Control
                          as="select"
                          value={partId}
                          isInvalid={!!errors.partId}
                          onChange={(e) => handlePartId(e)}
                        >
                          <option value="">Select Part</option>
                          {renderOptionsForParts()}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.partId}
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
                      XFER Parts
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
export default Xfer_Parts;
