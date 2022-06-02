import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";

import { useNavigate } from "react-router";

const Login = () => {
  let navigate = useNavigate();

  const [loginResponse, setLoginResponse] = useState({});

  // form
  // this will contain email and password
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currUser = AuthService.getCurrentUser();
    if (currUser !== null) navigate("/home");
  });

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
    const { email, password } = form;
    const newErrors = {};

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!email || email === "") newErrors.email = "User Name is Required!";
    else if (!pattern.test(email)) newErrors.email = "Invalid Email Address!";

    if (!password || password === "")
      newErrors.password = "Password is Required!";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log(form);

      var loginModel = {
        email: form.email,
        password: form.password,
      };

      // api call
      AuthService.login(loginModel)
        .then((response) => {
          console.log(response.data);

          var loginResponse = {
            responseCode: response.data.response.responseCode,
            responseMessage: response.data.response.responseMessage,
          };
          setLoginResponse(loginResponse);

          if (response.data.response.responseCode === 0) {
            // reset local-storage
            localStorage.setItem("currentUser", null);

            let apiResponse = {
              userName: response.data.userName,
              role: response.data.myRole,
              token: response.data.token,
              fullName: response.data.firstName + ", " + response.data.lastName,
            };
            localStorage.setItem("currentUser", JSON.stringify(apiResponse));

            setTimeout(() => {
              navigate("/home");
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3>Login</h3>
                <p></p>
                {loginResponse && loginResponse.responseCode === -1 ? (
                  <span className="loginError">
                    {loginResponse.responseMessage}
                  </span>
                ) : (
                  <span className="loginSuccess">
                    {loginResponse.responseMessage}
                  </span>
                )}
              </div>
              <div className="card-body">
                <Form ref={formRef}>
                  <Form.Group controlId="email">
                    <Form.Label>User Name</Form.Label>
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      className="btn btn-success"
                      type="button"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Login
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

export default Login;
