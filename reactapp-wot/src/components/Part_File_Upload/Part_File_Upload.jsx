import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthService from "../../services/auth.service";
import PartService from "../../services/part.service";

import { useNavigate } from "react-router";

import axios from "axios";
import http from "../../axios/part-http-common";
import authHeader from "../../services/auth.header";

const Part_File_Upload = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [statusFlag, setStatusFlag] = useState(0);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadHandler = (event) => {
    if (selectedFile === null || selectedFile === "") {
      console.log("No File To Upload!");
      return;
    } else {
      const formData = new FormData();

      formData.append("partImage", selectedFile, selectedFile.name);
      formData.append("partId", 2);

      console.log(formData);
      console.log(selectedFile);
      console.log(selectedFile.name);

      // api call
      axios
        .post(
          "https://localhost:44359/api/Part/partImageUpload",
          formData,
          { headers: authHeader() },
          {
            onUploadProgress: (progressEvent) => {
              setProgress((progressEvent.loaded / progressEvent.total) * 100);
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fileData = () => {};

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
                  <input type="file" onChange={(e) => onFileChange(e)} />

                  <Button
                    className="btn btn-success"
                    type="button"
                    onClick={(e) => uploadHandler(e)}
                  >
                    Upload Part File !
                  </Button>
                </div>
                {fileData()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part_File_Upload;
