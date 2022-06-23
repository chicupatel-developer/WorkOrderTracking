import React, { useState, useEffect } from "react";
import "./style.css";
import AuthService from "../../services/auth.service";
import OperationService from "../../services/operation.service";
import { useNavigate } from "react-router-dom";

// react-bootstrap-table-2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import { Button } from "react-bootstrap";

import Moment from "moment";

import {
  getWorkOrderStatus,
  getDaysLeft,
  getOperationStatus,
  getOperationNumber,
  getOperationStatusForOperator,
} from "../../services/local.service";

import { useParams } from "react-router-dom";

// child component
import Xfer_History from "./Xfer_History/Xfer_History";

const Operation = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [ops, setOps] = useState([]);

  const [opId, setOpId] = useState(0);

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

  const displayPKColumn = (cell, row) => {
    return (
      <span>
        <Button
          className="btn btn-primary"
          type="button"
          onClick={(e) => getOpLog(e, row.operationId)}
        >
          <i className="bi-binoculars"></i>
        </Button>
        &nbsp;{cell}
      </span>
    );
  };

  const displayActionBtn = (cell, row) => {
    // console.log(row);
    return (
      <div>
        {" "}
        <Button
          className="btn btn-info"
          type="button"
          onClick={(e) => editOp(e, row.operationId)}
        >
          <i className="bi bi-pencil-square"></i>
        </Button>{" "}
        <Button
          className="btn btn-warning"
          type="button"
          onClick={(e) => xferParts(e, row.operationId)}
        >
          <i className="bi-arrows-move"></i>
        </Button>{" "}
        <Button
          className="btn btn-success"
          type="button"
          onClick={(e) => getPartHistory(e, row.operationId)}
        >
          <i className="bi-clock-history"></i>
        </Button>
      </div>
    );
  };
  const columns = [
    {
      dataField: "operationId",
      text: "OP #",
      formatter: (cell, row) => displayPKColumn(cell, row),
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
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => displayActionBtn(cell, row),
    },
  ];

  const getPartHistory = (e, opId) => {
    console.log("parts xfer history for op : ", opId);
    setOpId(opId);
  };

  const xferParts = (e, opId) => {
    console.log("xfer parts to op : ", opId);
    navigate("/xfer-parts/" + opId);
  };

  const getOpLog = (e, opId) => {
    console.log("operation-log data for op : ", opId);
    navigate("/operation-log/" + opId);
  };

  const editOp = (e, opId) => {
    console.log("edit op : ", opId);
    navigate("/operation-edit", {
      state: {
        workOrderId: id,
        operationId: opId,
      },
    });
  };

  const createNewOp = () => {
    console.log("create new operation for wo# ", id);
    // navigate("/operation-create");

    navigate("/operation-create", {
      state: {
        workOrderId: id,
      },
    });
  };

  return (
    <div className="container">
      <div className="mainHeader">Work-Orders [Operations]</div>
      <hr />

      <div className="row">
        <div className="col-md-3 mx-auto">
          <Button
            className="btn btn-success"
            type="button"
            onClick={(e) => createNewOp(e)}
          >
            Create New Operation
          </Button>
        </div>
        <div className="col-md-6 mx-auto">
          <div className="subHeaderOp">Work-Order # {id}</div>
          {ops && ops.length > 0 && (
            <div className="subHeaderOp">Operations</div>
          )}
        </div>
        <div className="col-md-3 mx-auto"></div>
      </div>

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

      <p></p>
      {opId > 0 && (
        <div className="container">
          <Xfer_History opId={opId} />
        </div>
      )}
    </div>
  );
};

export default Operation;
