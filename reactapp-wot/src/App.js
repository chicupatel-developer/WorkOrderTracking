import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Register";
import Part from "./components/Part/Part";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <div className="main-wrapper">
        <Header />
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/part" element={<Part />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
export default App;
