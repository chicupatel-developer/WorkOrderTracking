import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import AuthService from "../../services/auth.service";
import PartService from "../../services/part.service";

import { useNavigate } from "react-router";

const Part_File_Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);
    PartService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        setClassName("uploadSuccess");
      })
      .catch((error) => {
        setProgress(0);
        setMessage(error.response.data.message);
        setClassName("uploadError");
        setCurrentFile(undefined);
        console.log(error.response.data.message);
      });
    setSelectedFiles(undefined);
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-7 mx-auto">
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
                      {message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part_File_Upload;
