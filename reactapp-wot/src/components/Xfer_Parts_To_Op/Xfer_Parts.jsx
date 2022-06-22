import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import OperationService from "../../services/operation.service";
import { getOperationNumber } from "../../services/local.service";

import { useNavigate } from "react-router";

import Moment from "moment";

const Xfer_Parts = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [parts, setParts] = useState([]);
  const [xferInfo, setXferInfo] = useState({});

  const [modelErrors, setModelErrors] = useState([]);

  const [xferResponse, setXferResponse] = useState({});

  // form
  const [partId, setPartId] = useState("");
  const [xferQTY, setXferQTY] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else {
      getParts();
      getOperationDetails(id);
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
  const getOperationDetails = (id) => {
    OperationService.getOperationDetails(id)
      .then((response) => {
        setXferInfo(response.data);
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
    if (!xferQTY || xferQTY === "") newErrors.xferQTY = "XFER-QTY is Required!";
    else {
      if (!checkForNumbersOnly(xferQTY))
        newErrors.xferQTY = "Only Numbers are Allowed!";
    }

    return newErrors;
  };

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
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
        xFERQTY: parseInt(xferQTY),
      };
      console.log(xferModel);

      // api call
      OperationService.xferPartsForOperation(xferModel)
        .then((response) => {
          setModelErrors([]);
          setXferResponse({});
          console.log(response.data);

          var _xferResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };
          if (response.data.responseCode === 0) {
            resetForm();
            setXferResponse(_xferResponse);

            setTimeout(() => {
              navigate("/operation/" + xferInfo.workOrderId);
            }, 3000);
          } else if (response.data.responseCode === -1) {
            setXferResponse(_xferResponse);
          }
        })
        .catch((error) => {
          console.log(error);
          setModelErrors([]);
          setXferResponse({});
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
    setPartId("");
    setXferResponse({});
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
  const handleXferQTY = (event) => {
    setXferQTY(event.target.value);
    if (!errors[xferQTY])
      setErrors({
        ...errors,
        xferQTY: "",
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

  const goBack = (e) => {
    navigate("/operation/" + xferInfo.workOrderId);
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
                    <h3>XFER - Parts - TO - Operation</h3>
                    <div className="header">
                      <h5>Customer : {xferInfo.customerName}</h5>
                      <h5>Customer-Order # {xferInfo.customerOrderId}</h5>
                      <h5>Customer-Order QTY # {xferInfo.customerOrderQTY}</h5>
                      <h5>Work-Order # {xferInfo.workOrderId}</h5>
                      <h5>Operation # {id}</h5>
                      <h5>
                        Operation Number #{" "}
                        {getOperationNumber(xferInfo.operationNumber)}
                      </h5>
                    </div>
                    <p></p>{" "}
                    {xferResponse && xferResponse.responseCode === -1 ? (
                      <span className="xferError">
                        {xferResponse.responseMessage}
                      </span>
                    ) : (
                      <span className="xferSuccess">
                        {xferResponse.responseMessage}
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
                      <p></p>
                      <Form.Group controlId="xferQTY">
                        <Form.Label>XFER QTY</Form.Label>
                        <Form.Control
                          className="qtyDisplay"
                          type="text"
                          isInvalid={!!errors.xferQTY}
                          onChange={(e) => handleXferQTY(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.xferQTY}
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
