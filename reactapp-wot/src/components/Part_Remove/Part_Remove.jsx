import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import PartService from "../../services/part.service";

import { useNavigate } from "react-router";

const Part_Remove = () => {
  let navigate = useNavigate();

  let { id } = useParams();
  const [part, setPart] = useState({});
  const [partRemoveResponse, setPartRemoveResponse] = useState({});

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else getPart(id);
  }, []);

  const getPart = (id) => {
    console.log("Editing Part : ", id);
    if (checkForNumbersOnly(id)) {
      PartService.getPart(id)
        .then((response) => {
          console.log(response.data);
          setPart(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else navigate("/part");
  };

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("deleting part: ", part);
  };

  const goBack = (e) => {
    navigate("/part");
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Remove Part</h3>
                <h5>
                  <span className="headerText">
                    Are you sure wants to remove part?
                  </span>
                </h5>
                <p></p>{" "}
                {partRemoveResponse &&
                partRemoveResponse.responseCode === -1 ? (
                  <span className="partRemoveError">
                    {partRemoveResponse.responseMessage}
                  </span>
                ) : (
                  <span className="partRemoveSuccess">
                    {partRemoveResponse.responseMessage}
                  </span>
                )}
              </div>
              <div className="card-body">
                <p></p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    className="btn btn-success"
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Remove Part
                  </Button>
                  <Button
                    className="btn btn-primary"
                    type="button"
                    onClick={(e) => goBack(e)}
                  >
                    <i class="bi bi-arrow-return-left"></i> Back
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

export default Part_Remove;
