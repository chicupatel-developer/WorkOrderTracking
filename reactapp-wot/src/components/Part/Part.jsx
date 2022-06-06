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

  const partFilePath = "https://localhost:44359/PartFiles/";

  const [parts, setParts] = useState([]);

  const getAllParts = () => {
    PartService.allParts()
      .then((response) => {
        setParts(response.data);
        // setParts([]);

        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          console.log("Token Not Found!");
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    var currRole = AuthService.getCurrentUserRole();

    if (currRole === null || (currRole !== null && currRole !== "Admin"))
      navigate("/un-auth");
    else getAllParts();
  }, []);

  const displayImage = (cell) => {
    var imagePath = partFilePath + cell;
    if (cell === "N/A") return <div className="noImage">N/A</div>;
    else return <img src={imagePath} width="70" height="80" />;
  };
  const displayQty = (cell) => {
    return <div className="qtyColumn">{cell}</div>;
  };
  const displayActionBtn = (cell, row) => {
    // console.log(row);
    return (
      <div>
        {" "}
        <Button
          className="btn btn-info"
          type="button"
          onClick={(e) => editPart(e, row.partId)}
        >
          <i className="bi bi-pencil-square"></i>
        </Button>{" "}
        <Button
          className="btn btn-danger"
          type="button"
          onClick={(e) => removePart(e, row.partId)}
        >
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    );
  };

  const columns = [
    {
      dataField: "partId",
      text: "#",
      sort: true,
      style: { width: "80" },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      // filter: textFilter(),
    },
    {
      dataField: "desc",
      text: "Desc",
    },
    {
      dataField: "qty",
      text: "Qty",
      formatter: (cell) => displayQty(cell),
    },
    {
      dataField: "partFile",
      text: "File",
      formatter: (cell) => displayImage(cell),
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => displayActionBtn(cell, row),
    },
  ];

  const createNewPart = () => {
    navigate("/part-create");
  };

  const editPart = (e, partId) => {
    console.log("edit part : ", partId);
    navigate("/part-edit/" + partId);
  };
  const removePart = (e, partId) => {
    console.log("remove part : ", partId);
    navigate("/part-remove/" + partId);
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
