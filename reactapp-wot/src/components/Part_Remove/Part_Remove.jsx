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
    console.log("Removing Part : ", id);
    if (checkForNumbersOnly(id)) {
      PartService.getPart(id)
        .then((response) => {
          if (response.data !== "") {
            console.log(response.data);
            setPart(response.data);
          } else {
            setPart({ partId: 0 });
          }
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

    console.log("removing part: ", part);

    if (part.partId > 0) {
      // api call
      PartService.removePart(part)
        .then((response) => {
          console.log(response.data);
          setPartRemoveResponse({});
          var partRemoveResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };

          setPartRemoveResponse(partRemoveResponse);
          if (response.data.responseCode === 0) {
            setTimeout(() => {
              navigate("/part");
            }, 3000);
          }
        })
        .catch((error) => {
          setPartRemoveResponse({});
        });
    } else {
      console.log("Can Not Call API!");
    }
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
                <div className="container">
                  <span className="headerText">Part </span>
                  {part.partId ? (
                    <span>&nbsp;# {part.partId}</span>
                  ) : (
                    <span>&nbsp; # N/A</span>
                  )}
                  <p></p>
                  <span className="headerText">Name</span>
                  {part.name ? (
                    <span>
                      <br />
                      {part.name}
                    </span>
                  ) : (
                    <span>&nbsp; # N/A</span>
                  )}
                  <p></p>
                  <span className="headerText">Desc</span>
                  {part.desc ? (
                    <span>
                      <br />
                      {part.desc}
                    </span>
                  ) : (
                    <span>&nbsp; # N/A</span>
                  )}
                  <p></p>
                  <span className="headerText">Qty</span>
                  {part.qty ? (
                    <span>&nbsp; # {part.qty}</span>
                  ) : (
                    <span>&nbsp; # N/A</span>
                  )}
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
                    Remove Part
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

export default Part_Remove;
