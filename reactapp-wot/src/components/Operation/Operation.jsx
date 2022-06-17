import React, { useState, useEffect } from "react";
import "./style.css";
import AuthService from "../../services/auth.service";
import OperationService from "../../services/operation.service";
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

import { useParams } from "react-router-dom";

const Operation = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [ops, setOps] = useState([]);

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else getAllWorkOrderOperations(id);
  }, []);

  const getAllWorkOrderOperations = (id) => {
    OperationService.getAllWorkOrderOperations(id)
      .then((response) => {
        console.log(response.data);
        setOps(response.data);
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

  const displayDate = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return Moment(cell).format("DD-MMM-YYYY");
    }
  };

  const displayOpStatus = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return getOperationStatus(cell);
    }
  };

  const displayDetails = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return cell;
    }
  };

  const columns = [
    {
      dataField: "operationId",
      text: "OP #",
      sort: true,
    },
    {
      dataField: "details",
      text: "Details",
      formatter: (cell) => displayDetails(cell),
    },
    {
      dataField: "operationStatus",
      text: "Status",
      formatter: (cell) => displayOpStatus(cell),
    },
    {
      dataField: "operationStartDate",
      text: "Start Date",
      formatter: (cell) => displayDate(cell),
    },
    {
      dataField: "opQTYDone",
      text: "QTY-Done",
    },
    {
      dataField: "opQTYRequired",
      text: "QTY-Required",
    },
  ];

  const createNewOp = () => {
    console.log("create new operation fir wo# ", id);
    navigate("/operation-create");
  };

  return (
    <div className="container">
      <div className="mainHeader">Work-Orders [Operations]</div>
      <hr />
      <Button
        className="btn btn-success"
        type="button"
        onClick={(e) => createNewOp(e)}
      >
        Create New Operation
      </Button>
      <p></p>

      <div className="subHeader">Operations</div>
      <p></p>
      {ops && ops.length > 0 ? (
        <BootstrapTable
          bootstrap4
          keyField="operationId"
          data={ops}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 20 })}
          filter={filterFactory()}
        />
      ) : (
        <div className="noOps">No Operations!</div>
      )}
    </div>
  );
};

export default Operation;
