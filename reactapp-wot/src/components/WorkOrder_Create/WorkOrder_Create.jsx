import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import CustomerOrderService from "../../services/customerOrder.service";
import WorkOrderService from "../../services/workOrder.service";

import { useNavigate } from "react-router";

import Moment from "moment";

import { getWorkOrderStatusToDisplay } from "../../services/local.service";

const WorkOrder_Create = () => {
  let navigate = useNavigate();

  const [customerOrders, setCustomerOrders] = useState([]);
  const [workOrderStatusCollection, setWorkOrderStatusCollection] = useState(
    []
  );

  const [modelErrors, setModelErrors] = useState([]);

  const [woCreateResponse, setWoCreateResponse] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else {
      setWorkOrderStatusCollection(getWorkOrderStatusToDisplay());
      getCustomerOrders();
    }
  }, []);

  const getCustomerOrders = () => {
    WorkOrderService.getCustomerOrders()
      .then((response) => {
        console.log(response.data);

        setCustomerOrders(response.data);
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
    const { customerOrderId, workOrderStartDate, workOrderStatus, statusNote } =
      form;
    const newErrors = {};

    if (!customerOrderId || customerOrderId === "")
      newErrors.customerOrderId = "Customer is Required!";

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
      var oDate = Moment(form.workOrderStartDate);
      var oCheck = oDate.isValid();
      if (oCheck) {
        var woModel = {
          customerOrderId: form.customerOrderId,
          workOrderStartDate: form.workOrderStartDate,
          workOrderStatus: form.workOrderStatus,
          statusNote: form.statusNote,
        };

        console.log(woModel);
      } else {
        console.log("Invalid Date(s) !");
        var woCreateResponse = {
          responseCode: -1,
          responseMessage: "Invalid Date !",
        };
        setWoCreateResponse(woCreateResponse);
        setModelErrors([]);
      }
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
    setWoCreateResponse({});
    setModelErrors([]);
  };

  const renderOptionsForCustomerOrders = () => {
    return customerOrders.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.text}>
          {dt.text}
        </option>
      );
    });
  };
  const renderOptionsForWorkOrderStatus = () => {
    return workOrderStatusCollection.map((dt, i) => {
      return (
        <option value={dt.value} key={i} name={dt.woStatus}>
          {dt.woStatus}
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
          <div className="col-md-9 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Create New Work-Order</h3>
                <p></p>{" "}
                {woCreateResponse && woCreateResponse.responseCode === -1 ? (
                  <span className="woCreateError">
                    {woCreateResponse.responseMessage}
                  </span>
                ) : (
                  <span className="woCreateSuccess">
                    {woCreateResponse.responseMessage}
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
                      <Form.Group controlId="customerOrderId">
                        <Form.Label>Customer</Form.Label>
                        <Form.Control
                          as="select"
                          isInvalid={!!errors.customerOrderId}
                          onChange={(e) => {
                            setField("customerOrderId", e.target.value);
                          }}
                        >
                          {renderOptionsForCustomerOrders()}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.customerOrderId}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="workOrderStartDate">
                        <Form.Label>Work-Order Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="workOrderStartDate"
                          placeholder="Work-Order Start Date"
                          isInvalid={!!errors.workOrderStartDate}
                          onChange={(e) =>
                            setField("workOrderStartDate", e.target.value)
                          }
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
                          isInvalid={!!errors.workOrderStatus}
                          onChange={(e) => {
                            setField("workOrderStatus", e.target.value);
                          }}
                        >
                          {renderOptionsForWorkOrderStatus()}
                        </Form.Control>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="workOrderStartDate">
                        <Form.Label>Work-Order Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="workOrderStartDate"
                          placeholder="Work-Order Start Date"
                          isInvalid={!!errors.workOrderStartDate}
                          onChange={(e) =>
                            setField("workOrderStartDate", e.target.value)
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="statusNote">
                        <Form.Label>Note</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          isInvalid={!!errors.statusNote}
                          onChange={(e) =>
                            setField("statusNote", e.target.value)
                          }
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
                      Create Work-Order
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
export default WorkOrder_Create;
