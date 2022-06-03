import React, { useState, useEffect } from "react";
import "./style.css";
import AuthService from "../../services/auth.service";
import PartService from "../../services/part.service";
import { useNavigate } from "react-router-dom";

// react-bootstrap-table-2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import Button from "react-bootstrap/Button";

const Part = () => {
  let navigate = useNavigate();

  const [parts, setParts] = useState([]);

  const getAllParts = () => {
    PartService.allParts()
      .then((response) => {
        setParts(response.data);
        // setParts([]);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) console.log("Token Not Found!");
      });
  };

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else getAllParts();
  }, []);

  const columns = [
    {
      dataField: "partId",
      text: "#",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "desc",
      text: "Desc",
    },
    {
      dataField: "qty",
      text: "Qty",
    },
  ];

  const createNewPart = () => {
    navigate("/home");
  };

  return (
    <div className="container">
      <div className="mainHeader">Parts</div>
      <hr />
      <Button
        className="btn btn-success"
        type="button"
        onClick={(e) => createNewPart(e)}
      >
        Create New Part
      </Button>
      <p></p>
      {parts && parts.length > 0 ? (
        <BootstrapTable
          bootstrap4
          keyField="partId"
          data={parts}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
          filter={filterFactory()}
        />
      ) : (
        <div className="noParts">No Parts!</div>
      )}
    </div>
  );
};

export default Part;
