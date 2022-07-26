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
import CustomerOrder_Edit from "./components/CustomerOrder_Edit/CustomerOrder_Edit";
import CustomerOrder_Remove from "./components/CustomerOrder_Remove/CustomerOrder_Remove";
import CustomerOrder_Progress_Text_Rep from "./components/CustomerOrder_Progress_Text_Rep/CustomerOrder_Progress_Text_Rep";
import Work_Order from "./components/Work_Order/Work_Order";
import WorkOrder_Create from "./components/WorkOrder_Create/WorkOrder_Create";
import WorkOrder_Edit from "./components/WorkOrder_Edit/WorkOrder_Edit";
import WorkOrder_Remove from "./components/WorkOrder_Remove/WorkOrder_Remove";
import Operation from "./components/Operation/Operation";
import Operation_Create from "./components/Operation_Create/Operation_Create";
import Operation_Edit from "./components/Operation_Edit/Operation_Edit";
import Xfer_Parts from "./components/Xfer_Parts_To_Op/Xfer_Parts";
import OperationLog from "./components/OperationLog/OperationLog";
import Create_Operator_Log from "./components/Create_Operator_Log/Create_Operator_Log";
import View_Operator_Log from "./components/View_Operator_Log/View_Operator_Log";
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
            <Route
              path="/customer-order-edit/:id"
              element={<CustomerOrder_Edit />}
            />
            <Route
              path="/customer-order-remove/:id"
              element={<CustomerOrder_Remove />}
            />
            <Route
              path="/customer-order-progress-text-report/:id"
              element={<CustomerOrder_Progress_Text_Rep />}
            />
            <Route path="/work-order" element={<Work_Order />} />
            <Route path="/work-order-create" element={<WorkOrder_Create />} />
            <Route path="/work-order-edit/:id" element={<WorkOrder_Edit />} />
            <Route
              path="/work-order-remove/:id"
              element={<WorkOrder_Remove />}
            />
            <Route path="/operation/:id" element={<Operation />} />
            <Route path="/operation-create" element={<Operation_Create />} />
            <Route path="/operation-edit" element={<Operation_Edit />} />
            <Route path="/xfer-parts/:id" element={<Xfer_Parts />} />
            <Route path="/operation-log/:id" element={<OperationLog />} />
            <Route
              path="/create-operator-log"
              element={<Create_Operator_Log />}
            />
            <Route path="/view-operator-log" element={<View_Operator_Log />} />
            <Route path="/un-auth" element={<UnAuthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
export default App;
