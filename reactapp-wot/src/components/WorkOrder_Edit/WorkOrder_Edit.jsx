import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import WorkOrderService from "../../services/workOrder.service";

import { useNavigate } from "react-router";

import Moment from "moment";

import { getWorkOrderStatusToDisplay } from "../../services/local.service";

const WorkOrder_Edit = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [workOrderStatusCollection, setWorkOrderStatusCollection] = useState(
    []
  );
  const [wo, setWo] = useState({});

  const [modelErrors, setModelErrors] = useState([]);

  const [woEditResponse, setWoEditResponse] = useState({});

  // form
  const [workOrderStatus, setWorkOrderStatus] = useState("");
  const [workOrderStartDate, setWorkOrderStartDate] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else {
      setWorkOrderStatusCollection(getWorkOrderStatusToDisplay());
      getWorkOrder(id);
    }
  }, []);

  const getWorkOrder = (id) => {
    console.log("Editing Work-Order : ", id);
    WorkOrderService.getWorkOrder(id)
      .then((response) => {
        if (response.data === "") {
          // data not found on server!

          setWo({});
          var woEditResponse = {
            responseCode: -1,
            responseMessage: "Work-Order Not Found!",
          };

          setWoEditResponse(woEditResponse);
        } else {
          console.log(response.data);

          setWo(response.data);

          setWorkOrderStatus(response.data.workOrderStatus);

          if (response.data.statusNote === null) {
            setStatusNote("");
          } else {
            setStatusNote(response.data.statusNote);
          }

          if (response.data.workOrderStartDate === null) {
            setWorkOrderStartDate("");
          } else {
            // convert c# date into react-bootstrap-date picker date format
            setWorkOrderStartDate(
              new Date(response.data.workOrderStartDate)
                .toISOString()
                .slice(0, 10)
            );
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // reset form
  // form reference
  const formRef = useRef(null);

  const handleWorkOrderStartDate = (event) => {
    setWorkOrderStartDate(event.target.value);
    if (!errors[workOrderStartDate])
      setErrors({
        ...errors,
        workOrderStartDate: "",
      });
  };
  const handleWorkOrderStatus = (event) => {
    setWorkOrderStatus(event.target.value);
    if (!errors[workOrderStatus])
      setErrors({
        ...errors,
        workOrderStatus: "",
      });
  };
  const handleStatusNote = (event) => {
    setStatusNote(event.target.value);
    if (!errors[statusNote])
      setErrors({
        ...errors,
        statusNote: "",
      });
  };

  const findFormErrors = () => {
    const newErrors = {};

    if (!workOrderStatus || workOrderStatus === "")
      newErrors.workOrderStatus = "Work-Order Status is Required!";

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
      var oDate = Moment(workOrderStartDate);
      var oCheck = oDate.isValid();
      if (oCheck) {
        var woModel = {
          customerOrderId: wo.customerOrderId,
          workOrderId: wo.workOrderId,
          workOrderStartDate: workOrderStartDate,
          workOrderStatus: workOrderStatus,
          statusNote: statusNote,
        };

        console.log(woModel);

        // api call
        WorkOrderService.editWorkOrder(woModel)
          .then((response) => {
            console.log(response.data);
            setModelErrors([]);
            setWoEditResponse({});
            var woEditResponse = {
              responseCode: response.data.responseCode,
              responseMessage: response.data.responseMessage,
            };

            if (response.data.responseCode === 0) resetForm();

            setWoEditResponse(woEditResponse);
            if (response.data.responseCode === 0) {
              setTimeout(() => {
                navigate("/work-order");
              }, 3000);
            }
          })
          .catch((error) => {
            setModelErrors([]);
            setWoEditResponse({});
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
        var woEditResponse = {
          responseCode: -1,
          responseMessage: "Invalid Date(s) !",
        };
        setWoEditResponse(woEditResponse);
        setModelErrors([]);
      }
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setWorkOrderStartDate("");
    setWorkOrderStatus("");
    setStatusNote("");
    setWoEditResponse({});
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
  const renderOptionsForWorkOrderStatus = () => {
    return workOrderStatusCollection.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.woStatus}>
          {dt.woStatus}
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
                <h3>Edit Work-Order # {id}</h3>
                <p></p>{" "}
                {woEditResponse && woEditResponse.responseCode === -1 ? (
                  <span className="woEditError">
                    {woEditResponse.responseMessage}
                  </span>
                ) : (
                  <span className="woEditSuccess">
                    {woEditResponse.responseMessage}
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
                      <Form.Group controlId="workOrderStartDate">
                        <Form.Label>Work-Order Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={workOrderStartDate}
                          name="workOrderStartDate"
                          placeholder="Work-Order Start Date"
                          isInvalid={!!errors.workOrderStartDate}
                          onChange={(e) => handleWorkOrderStartDate(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.workOrderStartDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="workOrderStatus">
                        <Form.Label>Work-Order Status</Form.Label>
                        <Form.Control
                          as="select"
                          value={workOrderStatus}
                          isInvalid={!!errors.workOrderStatus}
                          onChange={(e) => handleWorkOrderStatus(e)}
                        >
                          <option value="">Select Work-Order Status</option>
                          {renderOptionsForWorkOrderStatus()}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.workOrderStatus}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="statusNote">
                        <Form.Label>Note</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={statusNote}
                          rows="3"
                          isInvalid={!!errors.statusNote}
                          onChange={(e) => handleStatusNote(e)}
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
                      Edit Work-Order
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
export default WorkOrder_Edit;
