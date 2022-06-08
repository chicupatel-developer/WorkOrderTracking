import React, { useState, useEffect } from "react";
import "./style.css";
import AuthService from "../../services/auth.service";
import CustomerOrderService from "../../services/customerOrder.service";
import { useNavigate } from "react-router-dom";

// react-bootstrap-table-2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import Button from "react-bootstrap/Button";

import Moment from "moment";

const Customer_Order = () => {
  let navigate = useNavigate();

  const [cos, setCos] = useState([]);
  const getAllCustomerOrders = () => {
    CustomerOrderService.allCustomerOrders()
      .then((response) => {
        setCos(response.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          console.log("Token Not Found!");
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else getAllCustomerOrders();
  }, []);

  const displayDate = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return Moment(cell).format("DD-MMM-YYYY");
    }
  };

  const columns = [
    {
      dataField: "customerOrderId",
      text: "#",
      sort: true,
      style: { width: "80" },
    },
    {
      dataField: "customerName",
      text: "Name",
      sort: true,
    },
    {
      dataField: "productName",
      text: "Product",
    },
    {
      dataField: "productDesc",
      text: "Pr-Desc",
    },
    {
      dataField: "orderQuantity",
      text: "Order-Qty",
    },
    {
      dataField: "orderDate",
      text: "Order-Date",
      sort: true,
      formatter: (cell) => displayDate(cell),
    },
    {
      dataField: "orderDueDate",
      text: "Due-Date",
      sort: true,
      formatter: (cell) => displayDate(cell),
    },
  ];

  const createNewCo = () => {
    console.log("create new co");
  };
  const editCo = (e, coId) => {
    console.log("edit co : ", coId);
    navigate("/customer-order-edit/" + coId);
  };
  const removeCo = (e, coId) => {
    console.log("remove co : ", coId);
    navigate("/customer-order-remove/" + coId);
  };

  return (
    <div className="container">
      <div className="mainHeader">Customer-Orders</div>
      <hr />
      <Button
        className="btn btn-success"
        type="button"
        onClick={(e) => createNewCo(e)}
      >
        Create New Customer-Order
      </Button>
      <p></p>
      {cos && cos.length > 0 ? (
        <BootstrapTable
          bootstrap4
          keyField="customerOrderId"
          data={cos}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
          filter={filterFactory()}
        />
      ) : (
        <div className="noCos">No Customer-Orders!</div>
      )}
    </div>
  );
};

export default Customer_Order;
