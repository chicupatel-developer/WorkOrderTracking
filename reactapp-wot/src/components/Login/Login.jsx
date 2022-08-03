import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";

import { useNavigate } from "react-router";

const Login = () => {
  let navigate = useNavigate();

  const [modelErrors, setModelErrors] = useState([]);

  const [loginResponse, setLoginResponse] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var currUser = AuthService.getCurrentUser();
    if (currUser !== null) navigate("/home");
  },[]);

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
              userId: response.data.userId,
            };
            localStorage.setItem("currentUser", JSON.stringify(apiResponse));

            resetForm();

            setTimeout(() => {
              navigate("/home");
            }, 3000);
          } else if (response.data.response.responseCode === -1) {
            var loginResponse = {
              responseCode: response.data.response.responseCode,
              responseMessage: response.data.response.responseMessage,
            };
            setLoginResponse(loginResponse);
            setModelErrors([]);
          }
        })
        .catch((error) => {
          setModelErrors([]);
          setLoginResponse({});
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
    setForm({});
    setLoginResponse({});
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
                {modelErrors.length > 0 ? (
                  <div className="modelError">{modelErrorList}</div>
                ) : (
                  <span></span>
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
