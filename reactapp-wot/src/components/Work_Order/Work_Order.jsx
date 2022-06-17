import React, { useState, useEffect } from "react";
import "./style.css";
import AuthService from "../../services/auth.service";
import CustomerOrderService from "../../services/customerOrder.service";
import WorkOrderService from "../../services/workOrder.service";
import { useNavigate } from "react-router-dom";

// react-bootstrap-table-2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import { Modal, Button } from "react-bootstrap";

import Moment from "moment";

import {
  getWorkOrderStatus,
  getDaysLeft,
  getOperationStatus,
  getOperationNumber,
  getOperationStatusForOperator,
} from "../../services/local.service";

const Work_Order = () => {
  let navigate = useNavigate();

  const [wos, setWos] = useState([]);
  const [co, setCo] = useState({});

  // bootstrap modal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const getAllWorkOrders = () => {
    WorkOrderService.allWorkOrders()
      .then((response) => {
        console.log(response.data);
        setWos(response.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          console.log("Token Not Found!");
          AuthService.logout();
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else getAllWorkOrders();
  }, []);

  const displayDate = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return Moment(cell).format("DD-MMM-YYYY");
    }
  };

  const displayNote = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return cell;
    }
  };

  const displayWoStatus = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return getWorkOrderStatus(cell);
    }
  };

  const displayActionBtn = (cell, row) => {
    return (
      <div>
        <Button
          className="btn btn-info"
          type="button"
          onClick={(e) => editWo(e, row.workOrderId)}
        >
          <i className="bi bi-pencil-square"></i>
        </Button>
        &nbsp;
        <Button
          className="btn btn-danger"
          type="button"
          onClick={(e) => removeWo(e, row.workOrderId)}
        >
          <i className="bi bi-trash"></i>
        </Button>
        &nbsp;
        <Button
          className="btn btn-success"
          type="button"
          onClick={(e) => connectWithOperations(e, row.workOrderId)}
        >
          <i className="bi-list-task"></i>
        </Button>
      </div>
    );
  };

  const getCustomerOrderDetails = (e, coid) => {
    console.log("getting customer order info #", coid);

    WorkOrderService.getCustomerOrderDetails(coid)
      .then((response) => {
        if (response.data === "") {
          // data not found on server!
          setCo(null);
        } else {
          console.log(response.data);

          setCo(response.data);
        }
        openModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const displayCustomerOrder = (cell, row) => {
    return (
      <div>
        <button
          className="btn btn-link"
          type="button"
          onClick={(e) => getCustomerOrderDetails(e, row.customerOrderId)}
        >
          {cell}
        </button>
      </div>
    );
  };
  const columns = [
    {
      dataField: "workOrderId",
      text: "#",
      sort: true,
    },
    {
      dataField: "customer",
      text: "Customer",
      sort: true,
      formatter: (cell, row) => displayCustomerOrder(cell, row),
    },
    {
      dataField: "workOrderStartDate",
      text: "Start Date",
      sort: true,
      formatter: (cell) => displayDate(cell),
    },
    {
      dataField: "workOrderStatus",
      text: "Status",
      formatter: (cell) => displayWoStatus(cell),
    },
    {
      dataField: "statusNote",
      text: "Notes",
      formatter: (cell) => displayNote(cell),
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => displayActionBtn(cell, row),
    },
  ];

  const createNewWo = () => {
    navigate("/work-order-create");
  };
  const editWo = (e, woId) => {
    console.log("edit wo : ", woId);
    navigate("/work-order-edit/" + woId);
  };
  const removeWo = (e, woId) => {
    console.log("remove wo : ", woId);
    navigate("/work-order-remove/" + woId);
  };
  const connectWithOperations = (e, woId) => {
    console.log("getting operations for wo : ", woId);
    navigate("/operation/" + woId);
  };

  return (
    <div className="container">
      <div className="mainHeader">Work-Orders [Operations]</div>
      <hr />
      <Button
        className="btn btn-success"
        type="button"
        onClick={(e) => createNewWo(e)}
      >
        Create New Work-Order
      </Button>
      <p></p>

      <div className="subHeader">Work-Orders</div>
      <p></p>
      {wos && wos.length > 0 ? (
        <BootstrapTable
          bootstrap4
          keyField="workOrderId"
          data={wos}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 20 })}
          filter={filterFactory()}
        />
      ) : (
        <div className="noWos">No Work-Orders!</div>
      )}

      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Order Details!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {co ? (
            <div className="card">
              <div className="card-header">
                <span className="coHeader">
                  Customer Order # {co.customerOrderId}
                </span>
              </div>
              <div className="card-body">
                <h4>
                  <span className="coLabel">Customer Name :</span>{" "}
                  {co.customerName}
                </h4>
                <h5>
                  <span className="coLabel">Product Name : </span>
                  {co.productName}
                </h5>
                <h6>
                  <span className="coLabel">Product Desc : </span>
                  {co.productDesc}
                </h6>
                <h6>
                  <span className="coLabel">Order QTY #</span>{" "}
                  <span className="coQty">{co.orderQuantity}</span>
                </h6>
                <h6>
                  <span className="coLabel">Order Date #</span>{" "}
                  {Moment(co.orderDate).format("DD-MMM-YYYY")}
                </h6>
                <h5>
                  <span className="coLabel">Order Due Date #</span>{" "}
                  <span className="coDueDate">
                    {Moment(co.orderDueDate).format("DD-MMM-YYYY")}
                  </span>
                </h5>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header">Customer Order # N/A</div>
              <div className="card-body noCo">
                Customer Order Details Not Found !
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Work_Order;
