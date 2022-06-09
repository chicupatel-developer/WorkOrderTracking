import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import PartService from "../../services/part.service";

import { useNavigate } from "react-router";

const Part_Edit = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [modelErrors, setModelErrors] = useState([]);

  const [partEditResponse, setPartEditResponse] = useState({});

  // form
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState(0);
  const [errors, setErrors] = useState({});

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
          if (response.data === "") {
            // data not found on server!
            var partEditResponse = {
              responseCode: -1,
              responseMessage: "Part Not Found!",
            };

            setPartEditResponse(partEditResponse);
          } else {
            console.log(response.data);

            setName(response.data.name);
            setDesc(response.data.desc);
            setQty(parseInt(response.data.qty));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else navigate("/part");
  };

  // reset form
  // form reference
  const formRef = useRef(null);

  const handleName = (event) => {
    setName(event.target.value);
    if (!errors[name])
      setErrors({
        ...errors,
        name: "",
      });
  };
  const handleDesc = (event) => {
    setDesc(event.target.value);
    if (!errors[desc])
      setErrors({
        ...errors,
        desc: "",
      });
  };
  const handleQty = (event) => {
    setQty(event.target.value);
    if (!errors[qty])
      setErrors({
        ...errors,
        qty: "",
      });
  };

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const findFormErrors = () => {
    const newErrors = {};

    if (!name || name === "") newErrors.name = "Part Name is Required!";

    if (!desc || desc === "") newErrors.desc = "Part Desc is Required!";

    if (!qty || qty === "") newErrors.qty = "Qty is Required!";
    else {
      if (!checkForNumbersOnly(qty))
        newErrors.qty = "Only Numbers are Allowed!";
    }

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
      var partModel = {
        partId: parseInt(id),
        name: name,
        desc: desc,
        qty: parseInt(qty),
      };

      console.log(partModel);

      // api call
      PartService.editPart(partModel)
        .then((response) => {
          console.log(response.data);
          setModelErrors([]);
          setPartEditResponse({});
          var partEditResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };

          setPartEditResponse(partEditResponse);
          if (response.data.responseCode === 0) {
            setTimeout(() => {
              resetForm();
              navigate("/part");
            }, 3000);
          }
        })
        .catch((error) => {
          setModelErrors([]);
          setPartEditResponse({});
          // 400
          // ModelState
          if (error.response.status === 400) {
            console.log("400 !");
            var modelErrors = handleModelState(error);
            setModelErrors(modelErrors);
          }
        });
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setName("");
    setDesc("");
    setQty(0);
    setPartEditResponse({});
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
          <div className="col-md-5 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Edit Part # {id}</h3>
                <p></p>{" "}
                {partEditResponse && partEditResponse.responseCode === -1 ? (
                  <span className="partEditError">
                    {partEditResponse.responseMessage}
                  </span>
                ) : (
                  <span className="partEditSuccess">
                    {partEditResponse.responseMessage}
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
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={name}
                      type="text"
                      isInvalid={!!errors.name}
                      onChange={(e) => handleName(e)}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <Form.Group controlId="desc">
                    <Form.Label>Desc</Form.Label>
                    <Form.Control
                      value={desc}
                      as="textarea"
                      rows="3"
                      isInvalid={!!errors.desc}
                      onChange={(e) => handleDesc(e)}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.desc}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <Form.Group controlId="qty">
                    <Form.Label>Qty</Form.Label>
                    <Form.Control
                      value={qty}
                      className="qtyDisplay"
                      type="text"
                      isInvalid={!!errors.qty}
                      onChange={(e) => handleQty(e)}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.qty}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      className="btn btn-success"
                      type="button"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Edit Part
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
export default Part_Edit;
