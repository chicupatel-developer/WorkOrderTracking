import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";

import { useNavigate } from "react-router";

import { getRoles } from "../../services/local.service";

const Register = () => {
  let navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  const [registerResponse, setRegisterResponse] = useState({});

  // form
  // this will contain email and password
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setRoles(getRoles());
    var currUser = AuthService.getCurrentUser();
    if (currUser !== null) navigate("/home");
  }, []);

  // reset form
  // form reference
  const formRef = useRef(null);

  const setField = (field, value) => {
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

  const findFormErrors = () => {
    const { appRole, firstName, lastName, email, password, confirmPassword } =
      form;
    const newErrors = {};
    if (!firstName || firstName === "")
      newErrors.firstName = "First Name is Required!";

    if (!lastName || lastName === "")
      newErrors.lastName = "Last Name is Required!";

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!email || email === "") newErrors.email = "Email is Required!";
    else if (!pattern.test(email)) newErrors.email = "Invalid Email Address!";

    if (!password || password === "")
      newErrors.password = "Password is Required!";

    if (!confirmPassword || confirmPassword === "")
      newErrors.confirmPassword = "Confirm Password is Required!";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords don't match!";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      var registerModel = {
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        firstName: form.firstName,
        lastName: form.lastName,
        appRole: form.appRole,
      };

      console.log(registerModel);

      // api call
      AuthService.register(registerModel)
        .then((response) => {
          console.log(response.data);
          var registerResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };
          setRegisterResponse(registerResponse);
        })
        .catch((error) => {
          if (error.response.data.responseCode === -1) {
            var registerResponse = {
              responseCode: error.response.data.responseCode,
              responseMessage: error.response.data.responseMessage,
            };
            setRegisterResponse(registerResponse);
            console.log(registerResponse);
          }
        });
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
    setRegisterResponse({});
  };

  const renderOptionsForRole = () => {
    return roles.map((dt, i) => {
      return (
        <option value={dt.name} key={i} name={dt.name}>
          {dt.name}
        </option>
      );
    });
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Register</h3>
                <p></p>
                {registerResponse && registerResponse.responseCode === -1 ? (
                  <span className="registerError">
                    {registerResponse.responseMessage}
                  </span>
                ) : (
                  <span className="registerSuccess">
                    {registerResponse.responseMessage}
                  </span>
                )}
              </div>
              <div className="card-body">
                <Form ref={formRef}>
                  <div className="row">
                    <div className="col-sm-6">
                      <Form.Group controlId="appRole">
                        <Form.Label>App Role</Form.Label>
                        <Form.Control
                          as="select"
                          isInvalid={!!errors.appRole}
                          onChange={(e) => {
                            setField("appRole", e.target.value);
                          }}
                        >
                          {renderOptionsForRole()}
                        </Form.Control>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          isInvalid={!!errors.firstName}
                          onChange={(e) =>
                            setField("firstName", e.target.value)
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          isInvalid={!!errors.lastName}
                          onChange={(e) => setField("lastName", e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-sm-6">
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          isInvalid={!!errors.email}
                          onChange={(e) => setField("email", e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          isInvalid={!!errors.password}
                          onChange={(e) => setField("password", e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p></p>
                      <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          isInvalid={!!errors.confirmPassword}
                          onChange={(e) =>
                            setField("confirmPassword", e.target.value)
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
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
                      Register
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
export default Register;
