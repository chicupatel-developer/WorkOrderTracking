import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import AuthService from "../../services/auth.service";
import PartService from "../../services/part.service";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

const Part_File_Upload = () => {
  const partFilePath = "https://localhost:44359/PartFiles/";

  let navigate = useNavigate();
  let location = useLocation();

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");

  const [modelErrors, setModelErrors] = useState([]);

  const partId = location.state.partId;
  const partFile = location.state.partFile;
  const partFileLocation = partFilePath + "" + partFile;
  const partName = location.state.partName;

  useEffect(() => {
    console.log("partId : ", partId);
    console.log("partFileLocation : ", partFile);

    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
  }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
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

  let modelErrorList =
    modelErrors.length > 0 &&
    modelErrors.map((item, i) => {
      return (
        <ul key={i} value={item}>
          <li style={{ marginTop: 5 }}>{item}</li>
        </ul>
      );
    }, this);

  const upload = () => {
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);
    PartService.upload(currentFile, partId, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        setClassName("uploadSuccess");
      })
      .catch((error) => {
        console.log(error.response.data);
        // 400
        if (error.response.status === 400) {
          console.log("400 !");
          var modelErrors = handleModelState(error);
          setMessage("");
          setModelErrors(modelErrors);
          setClassName("uploadError");
        }
        // 500
        else {
          setProgress(0);
          setModelErrors([]);
          setMessage(error.response.data.message);
          setClassName("uploadError");
          setCurrentFile(undefined);
        }
      });
    setSelectedFiles(undefined);
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-1 mx-auto"></div>
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h5>Part File Upload!</h5>
                <p></p>
                <div>
                  <label className="btn btn-info">
                    <input type="file" onChange={selectFile} />
                  </label>
                  <p></p>
                  {currentFile && (
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-info progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: progress + "%" }}
                      >
                        {progress}%
                      </div>
                    </div>
                  )}
                  <p></p>
                  <button
                    className="btn btn-success"
                    disabled={!selectedFiles}
                    onClick={upload}
                  >
                    Upload Part File
                  </button>

                  {className === "uploadSuccess" ? (
                    <div
                      className="alert alert-light uploadSuccess"
                      role="alert"
                    >
                      {message}
                    </div>
                  ) : (
                    <div className="alert alert-light uploadError" role="alert">
                      {modelErrors && modelErrors.length > 0 ? (
                        <div>
                          Model Error(s)
                          <br />
                          <div>{modelErrorList}</div>
                        </div>
                      ) : (
                        <span>{message}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mx-auto">
            {partFile !== "N/A" ? (
              <div className="withImage">
                Part # {partId}
                <p></p>
                Name : {partName}
                <p></p>
                <img src={partFileLocation} width="200" height="200" />
              </div>
            ) : (
              <div className="noImage">
                Part # {partId}
                <p></p>
                Name : {partName}
                <p></p>
                <span>No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part_File_Upload;
