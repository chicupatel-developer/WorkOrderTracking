import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import CustomerOrderService from "../../services/customerOrder.service";

import { useNavigate } from "react-router";

const CustomerOrder_Create = () => {
  let navigate = useNavigate();

  const [modelErrors, setModelErrors] = useState([]);

  const [coCreateResponse, setCoCreateResponse] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
  }, []);

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

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const findFormErrors = () => {
    const {
      customerName,
      productName,
      productDesc,
      orderQty,
      orderDate,
      orderDueDate,
    } = form;
    const newErrors = {};

    if (!customerName || customerName === "")
      newErrors.customerName = "Customer Name is Required!";

    if (!productName || productName === "")
      newErrors.productName = "Product Name is Required!";

    if (!productDesc || productDesc === "")
      newErrors.productDesc = "Product Desc is Required!";

    if (!orderQty || orderQty === "")
      newErrors.orderQty = "Order Qty is Required!";
    else {
      if (!checkForNumbersOnly(orderQty))
        newErrors.orderQty = "Only Numbers are Allowed!";
    }

    if (!orderDate || orderDate === "")
      newErrors.orderDate = "Order Date is Required!";

    if (!orderDueDate || orderDueDate === "")
      newErrors.orderDueDate = "Order Due Date is Required!";

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
      var coModel = {
        customerName: form.customerName,
        productName: form.productName,
        productDesc: form.productDesc,
        orderQty: parseInt(form.orderQty),
        orderDate: form.orderDate,
        orderDueDate: form.orderDueDate,
      };

      console.log(coModel);
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
    setCoCreateResponse({});
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

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Create New Customer-Order</h3>
                <p></p>{" "}
                {coCreateResponse && coCreateResponse.responseCode === -1 ? (
                  <span className="coCreateError">
                    {coCreateResponse.responseMessage}
                  </span>
                ) : (
                  <span className="coCreateSuccess">
                    {coCreateResponse.responseMessage}
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
                  <Form.Group controlId="customerName">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      type="text"
                      isInvalid={!!errors.customerName}
                      onChange={(e) => setField("customerName", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.customerName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      isInvalid={!!errors.productName}
                      onChange={(e) => setField("productName", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.productName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <Form.Group controlId="productDesc">
                    <Form.Label>Product Desc</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      isInvalid={!!errors.productDesc}
                      onChange={(e) => setField("productDesc", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.productDesc}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <Form.Group controlId="orderQty">
                    <Form.Label>Order Qty</Form.Label>
                    <Form.Control
                      className="qtyDisplay"
                      type="text"
                      isInvalid={!!errors.orderQty}
                      onChange={(e) => setField("orderQty", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.orderQty}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <Form.Group controlId="orderDate">
                    <Form.Label>Order Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="orderDate"
                      placeholder="Order Date"
                      isInvalid={!!errors.orderDate}
                      onChange={(e) => setField("orderDate", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.orderDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <Form.Group controlId="orderDueDate">
                    <Form.Label>Order Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="orderDueDate"
                      placeholder="Order Due Date"
                      isInvalid={!!errors.orderDueDate}
                      onChange={(e) => setField("orderDueDate", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.orderDueDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      className="btn btn-success"
                      type="button"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Create Customer-Order
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
export default CustomerOrder_Create;
