import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import CustomerOrderService from "../../services/customerOrder.service";

import { useNavigate } from "react-router";

import Moment from "moment";

const Operation_Edit = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [modelErrors, setModelErrors] = useState([]);

  const [coEditResponse, setCoEditResponse] = useState({});

  // form
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [orderQty, setOrderQty] = useState(0);
  const [orderDate, setOrderDate] = useState("");
  const [orderDueDate, setOrderDueDate] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else getCustomerOrder(id);
  }, []);

  const getCustomerOrder = (id) => {
    console.log("Editing Customer-Order : ", id);
    if (checkForNumbersOnly(id)) {
      CustomerOrderService.getCustomerOrder(id)
        .then((response) => {
          if (response.data === "") {
            // data not found on server!
            var coEditResponse = {
              responseCode: -1,
              responseMessage: "Customer-Order Not Found!",
            };

            setCoEditResponse(coEditResponse);
          } else {
            console.log(response.data);

            setCustomerName(response.data.customerName);
            setProductName(response.data.productName);
            setProductDesc(response.data.productDesc);
            setOrderQty(response.data.orderQuantity);

            // convert c# date into react-bootstrap-date picker date format
            setOrderDate(
              new Date(response.data.orderDate).toISOString().slice(0, 10)
            );
            setOrderDueDate(
              new Date(response.data.orderDueDate).toISOString().slice(0, 10)
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else navigate("/customer-order");
  };

  // reset form
  // form reference
  const formRef = useRef(null);

  const handleCustomerName = (event) => {
    setCustomerName(event.target.value);
    if (!errors[customerName])
      setErrors({
        ...errors,
        customerName: "",
      });
  };
  const handleProductName = (event) => {
    setProductName(event.target.value);
    if (!errors[productName])
      setErrors({
        ...errors,
        productName: "",
      });
  };
  const handleProductDesc = (event) => {
    setProductDesc(event.target.value);
    if (!errors[productDesc])
      setErrors({
        ...errors,
        productDesc: "",
      });
  };
  const handleOrderQty = (event) => {
    setOrderQty(event.target.value);
    if (!errors[orderQty])
      setErrors({
        ...errors,
        orderQty: "",
      });
  };
  const handleOrderDate = (event) => {
    setOrderDate(event.target.value);
    if (!errors[orderDate])
      setErrors({
        ...errors,
        orderDate: "",
      });
  };
  const handleOrderDueDate = (event) => {
    setOrderDueDate(event.target.value);
    if (!errors[orderDueDate])
      setErrors({
        ...errors,
        orderDueDate: "",
      });
  };

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const findFormErrors = () => {
    const newErrors = {};

    /*
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

    if (orderDate > orderDueDate)
      newErrors.orderDate = "Order-Date Must be < Order-Due-Date!";

    if (orderDueDate < orderDate)
      newErrors.orderDueDate = "Order-Due-Date Must be >= Order-Date!";
    */

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
      var oDate = Moment(orderDate);
      var oCheck = oDate.isValid();
      var odDate = Moment(orderDueDate);
      var odCheck = odDate.isValid();
      if (oCheck && odCheck) {
        var coModel = {
          customerName: customerName,
          productName: productName,
          productDesc: productDesc,
          orderQuantity: parseInt(orderQty),
          orderDate: orderDate,
          orderDueDate: orderDueDate,
          customerOrderId: parseInt(id),
        };

        console.log(coModel);

        // api call
        CustomerOrderService.editCustomerOrder(coModel)
          .then((response) => {
            console.log(response.data);
            setModelErrors([]);
            setCoEditResponse({});
            var coEditResponse = {
              responseCode: response.data.responseCode,
              responseMessage: response.data.responseMessage,
            };

            resetForm();
            setCoEditResponse(coEditResponse);
            if (response.data.responseCode === 0) {
              setTimeout(() => {
                navigate("/customer-order");
              }, 3000);
            }
          })
          .catch((error) => {
            setModelErrors([]);
            setCoEditResponse({});
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
        var coEditResponse = {
          responseCode: -1,
          responseMessage: "Invalid Date(s) !",
        };
        setCoEditResponse(coEditResponse);
        setModelErrors([]);
      }
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setCustomerName("");
    setProductName("");
    setProductDesc("");
    setOrderQty(0);
    setOrderDate("");
    setOrderDueDate("");
    setCoEditResponse({});
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
          <div className="col-md-10 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Edit Customer-Order # {id}</h3>
                <p></p>{" "}
                {coEditResponse && coEditResponse.responseCode === -1 ? (
                  <span className="coEditError">
                    {coEditResponse.responseMessage}
                  </span>
                ) : (
                  <span className="coEditSuccess">
                    {coEditResponse.responseMessage}
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
                      <Form.Group controlId="customerName">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control
                          value={customerName}
                          type="text"
                          isInvalid={!!errors.customerName}
                          onChange={(e) => handleCustomerName(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.customerName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="productName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          value={productName}
                          type="text"
                          isInvalid={!!errors.productName}
                          onChange={(e) => handleProductName(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.productName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="productDesc">
                        <Form.Label>Product Desc</Form.Label>
                        <Form.Control
                          value={productDesc}
                          as="textarea"
                          rows="3"
                          isInvalid={!!errors.productDesc}
                          onChange={(e) => handleProductDesc(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.productDesc}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-md-1 mx-auto"></div>
                    <div className="col-md-5 mx-auto">
                      <Form.Group controlId="orderQty">
                        <Form.Label>Order Qty</Form.Label>
                        <Form.Control
                          value={orderQty}
                          className="qtyDisplay"
                          type="text"
                          isInvalid={!!errors.orderQty}
                          onChange={(e) => handleOrderQty(e)}
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
                          value={orderDate}
                          isInvalid={!!errors.orderDate}
                          onChange={(e) => handleOrderDate(e)}
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
                          value={orderDueDate}
                          isInvalid={!!errors.orderDueDate}
                          onChange={(e) => handleOrderDueDate(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.orderDueDate}
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
                      Edit Customer-Order
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
