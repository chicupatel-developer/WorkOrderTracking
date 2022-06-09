import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import CustomerOrderService from "../../services/customerOrder.service";

import { useNavigate } from "react-router";

import Moment from "moment";

const CustomerOrder_Remove = () => {
  let navigate = useNavigate();

  let { id } = useParams();
  const [co, setCo] = useState({});
  const [coRemoveResponse, setCoRemoveResponse] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else getCustomerOrder(id);
  }, []);

  const getCustomerOrder = (id) => {
    console.log("Removing Customer-Order : ", id);
    if (checkForNumbersOnly(id)) {
      CustomerOrderService.getCustomerOrder(id)
        .then((response) => {
          if (response.data !== "") {
            console.log(response.data);
            setCo(response.data);
          } else {
            setCo({ customerOrderId: 0 });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else navigate("/customer-order");
  };

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("removing customer-order: ", co);
    console.log("removing customer-order-id: ", id);

    // api call
    CustomerOrderService.removeCustomerOrder(co)
      .then((response) => {
        console.log(response.data);
        setCoRemoveResponse({});
        var partRemoveResponse = {
          responseCode: response.data.responseCode,
          responseMessage: response.data.responseMessage,
        };

        setCoRemoveResponse(partRemoveResponse);
        if (response.data.responseCode === 0) {
          setTimeout(() => {
            navigate("/customer-order");
          }, 3000);
        }
      })
      .catch((error) => {
        setCoRemoveResponse({});
      });
  };

  const goBack = (e) => {
    navigate("/customer-order");
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Remove Customer-Order</h3>
                <h5>
                  <span className="headerText">
                    Are you sure wants to remove customer-order?
                  </span>
                </h5>
                <p></p>{" "}
                {coRemoveResponse && coRemoveResponse.responseCode === -1 ? (
                  <span className="coRemoveError">
                    {coRemoveResponse.responseMessage}
                  </span>
                ) : (
                  <span className="coRemoveSuccess">
                    {coRemoveResponse.responseMessage}
                  </span>
                )}
              </div>
              <div className="card-body">
                <div className="container">
                  <span className="headerText">Customer-Order </span>
                  {id ? <span>&nbsp;# {id}</span> : <span>&nbsp; # N/A</span>}
                  <p></p>

                  <div className="row">
                    <div className="col-md-6 mx-auto">
                      <span className="headerText">Customer Name</span>
                      {co.customerName ? (
                        <span>
                          <br />
                          {co.customerName}
                        </span>
                      ) : (
                        <span>&nbsp; # N/A</span>
                      )}
                      <p></p>
                      <span className="headerText">Product Name</span>
                      {co.productName ? (
                        <span>
                          <br />
                          {co.productName}
                        </span>
                      ) : (
                        <span>&nbsp; # N/A</span>
                      )}
                      <p></p>
                      <span className="headerText">Product Desc</span>
                      {co.productDesc ? (
                        <span>
                          <br />
                          {co.productDesc}
                        </span>
                      ) : (
                        <span>&nbsp; # N/A</span>
                      )}
                    </div>
                    <div className="col-md-1 mx-auto"></div>
                    <div className="col-md-5 mx-auto">
                      <span className="headerText">Order Qty</span>
                      {co.orderQuantity ? (
                        <span>&nbsp; # {co.orderQuantity}</span>
                      ) : (
                        <span>&nbsp; # N/A</span>
                      )}
                      <p></p>
                      <span className="headerText">Order Date</span>
                      {co.orderDate ? (
                        <span>
                          <br />
                          {Moment(co.orderDate).format("DD-MMM-YYYY")}
                        </span>
                      ) : (
                        <span>&nbsp; # N/A</span>
                      )}
                      <p></p>
                      <span className="headerText">Order Due Date</span>
                      {co.orderDueDate ? (
                        <span>
                          <br />
                          {Moment(co.orderDueDate).format("DD-MMM-YYYY")}
                        </span>
                      ) : (
                        <span>&nbsp; # N/A</span>
                      )}
                    </div>
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
                    Remove Customer-Order
                  </Button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrder_Remove;
