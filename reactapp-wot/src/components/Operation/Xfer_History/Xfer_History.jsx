import React, { useState, useEffect } from "react";
import "./style.css";
import AuthService from "../../../services/auth.service";
import OperationService from "../../../services/operation.service";
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
} from "../../../services/local.service";

import { useParams } from "react-router-dom";
const Xfer_History = ({ opId }) => {
  let navigate = useNavigate();
    
  const [partHistory, setPartHistory] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

      if (currRole === null || (currRole !== null && currRole !== "Admin"))
          navigate("/un-auth");
      else {
          getPartHistory(opId);
      };
  }, [opId]);

  const getPartHistory = (opId) => {
    console.log("parts xfer history for op : ", opId);

    OperationService.getPartHistory(opId)
      .then((response) => {
        console.log(response.data);
        setPartHistory(response.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          console.log("Token Not Found!");
          AuthService.logout();
          navigate("/login");
        } else if (e.response.status === 400)
          setPartHistory({ apiError: e.response.data });
      });

    openModal();
  };

  return (
    <div className="container">
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Parts XFER History</Modal.Title>
        </Modal.Header>
        {partHistory.apiError ? (
          <div className="apiErrorHistoryData">{partHistory.apiError}</div>
        ) : (
          <Modal.Body>
            <div className="card historyData">
              <div className="card-header">
                Operation # {partHistory.operationId}
              </div>
              <div className="card-body">
                Operation Number #{" "}
                {getOperationNumber(partHistory.operationNumber)}
                <br />
                Work-Order # {partHistory.workOrderId}
              </div>
            </div>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Xfer_History;
