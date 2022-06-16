import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import WorkOrderService from "../../services/workOrder.service";

import { useNavigate } from "react-router";

import Moment from "moment";

const WorkOrder_Remove = () => {
  let navigate = useNavigate();

  let { id } = useParams();
  const [wo, setWo] = useState({});
  const [woRemoveResponse, setWoRemoveResponse] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else getWorkOrder(id);
  }, []);

  const getWorkOrder = (id) => {
    console.log("Removing Work-Order : ", id);
    if (checkForNumbersOnly(id)) {
      WorkOrderService.getWorkOrder(id)
        .then((response) => {
          if (response.data !== "") {
            console.log(response.data);
            setWo(response.data);
          } else {
            setWo({ workOrderId: 0 });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else navigate("/work-order");
  };

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // api call
    WorkOrderService.removeWorkOrder(wo)
      .then((response) => {
        console.log(response.data);
        setWoRemoveResponse({});
        var woRemoveResponse = {
          responseCode: response.data.responseCode,
          responseMessage: response.data.responseMessage,
        };

        setWoRemoveResponse(woRemoveResponse);
        if (response.data.responseCode === 0) {
          setTimeout(() => {
            navigate("/work-order");
          }, 3000);
        }
      })
      .catch((error) => {
        setWoRemoveResponse({});
      });
  };

  const goBack = (e) => {
    navigate("/work-order");
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Remove Work-Order</h3>
                <h5>
                  <span className="headerText">
                    Are you sure wants to remove work-order?
                  </span>
                </h5>
                <p></p>{" "}
                {woRemoveResponse && woRemoveResponse.responseCode === -1 ? (
                  <span className="woRemoveError">
                    {woRemoveResponse.responseMessage}
                  </span>
                ) : (
                  <span className="woRemoveSuccess">
                    {woRemoveResponse.responseMessage}
                  </span>
                )}
              </div>
              <div className="card-body">
                <div className="container">
                  <span className="headerText">Work-Order </span>
                  {id ? <span>&nbsp;# {id}</span> : <span>&nbsp; # N/A</span>}
                  <p></p>

                  <div className="row">
                    <div className="col-md-6 mx-auto">
                      <span className="headerText">Customer Name</span>
                      {wo.customerOrderId ? (
                        <span>
                          <br />
                          [# {wo.customerOrderId}] {wo.customer.customerName}
                        </span>
                      ) : (
                        <span>&nbsp; # N/A</span>
                      )}
                      <p></p>
                      <span className="headerText">Work-Order Start Date</span>
                      {wo.workOrderStartDate ? (
                        <span>
                          <br />
                          {wo.workOrderStartDate}
                        </span>
                      ) : (
                        <span>&nbsp; # N/A</span>
                      )}
                      <p></p>
                      <span className="headerText">Work-Order Status</span>
                      {wo.workOrderSatus ? (
                        <span>
                          <br />
                          {wo.workOrderSatus}
                        </span>
                      ) : (
                        <span>&nbsp; # N/A</span>
                      )}
                      <p></p>
                      <span className="headerText">Status</span>
                      {wo.statusNote ? (
                        <span>
                          <br />
                          {wo.statusNote}
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
                    Remove Work-Order
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

export default WorkOrder_Remove;
