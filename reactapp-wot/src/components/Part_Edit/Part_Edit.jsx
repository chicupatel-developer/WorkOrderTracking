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
  const [part, setPart] = useState({});

  const [modelErrors, setModelErrors] = useState([]);

  const [partEditResponse, setPartEditResponse] = useState({});

  // form
  const [form, setForm] = useState({});
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
          console.log(response.data);
          setPart(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else navigate("/part");
  };

  // reset form
  // form reference
  const formRef = useRef(null);

  const setField = (field, value) => {
    console.log("editing..." + field);

    setForm({
      ...form,
      [field]: value,
    });

    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const findFormErrors = () => {
    const { name, desc, qty } = form;
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
      for (let prop in error.response.data.errors) {
        if (error.response.data.errors[prop].length > 1) {
          for (let error_ in error.response.data.errors[prop]) {
            errors.push(error.response.data.errors[prop][error_]);
          }
        } else {
          errors.push(error.response.data.errors[prop]);
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
        name: form.name,
        desc: form.desc,
        qty: parseInt(form.qty),
      };

      console.log(partModel);
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
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
                <h3>Edit Part</h3>
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
                      type="text"
                      isInvalid={!!errors.name}
                      onChange={(e) => setField("name", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p></p>
                  <Form.Group controlId="desc">
                    <Form.Label>Desc</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      isInvalid={!!errors.desc}
                      onChange={(e) => setField("desc", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.desc}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="qty">
                    <Form.Label>Qty</Form.Label>
                    <Form.Control
                      className="qtyDisplay"
                      type="text"
                      isInvalid={!!errors.qty}
                      onChange={(e) => setField("qty", e.target.value)}
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
