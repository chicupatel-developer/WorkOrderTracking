import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Register";
import Part from "./components/Part/Part";
import Part_Create from "./components/Part_Create/Part_Create";
import Part_Edit from "./components/Part_Edit/Part_Edit";
import Part_Remove from "./components/Part_Remove/Part_Remove";
import Part_File_Upload from "./components/Part_File_Upload/Part_File_Upload";
import NotFound from "./components/NotFound/NotFound";
import Customer_Order from "./components/Customer_Order/Customer_Order";
import CustomerOrder_Create from "./components/CustomerOrder_Create/CustomerOrder_Create";
import Work_Order from "./components/Work_Order/Work_Order";
import Operation from "./components/Operation/Operation";
import Create_Operator_Log from "./components/Create_Operator_Log/Create_Operator_Log";
import UnAuthorized from "./components/UnAuthorized/UnAuthorized";

function App() {
  return (
    <div className="App">
      <div className="main-wrapper">
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/part" element={<Part />} />
            <Route path="/part-create" element={<Part_Create />} />
            <Route path="/part-edit/:id" element={<Part_Edit />} />
            <Route path="/part-remove/:id" element={<Part_Remove />} />
            <Route path="/part-file-upload" element={<Part_File_Upload />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer-order" element={<Customer_Order />} />
            <Route
              path="/customer-order-create"
              element={<CustomerOrder_Create />}
            />
            <Route path="/work-order" element={<Work_Order />} />
            <Route path="/operation" element={<Operation />} />
            <Route
              path="/create-operator-log"
              element={<Create_Operator_Log />}
            />
            <Route path="/un-auth" element={<UnAuthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
export default App;
