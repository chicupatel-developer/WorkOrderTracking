import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";

// react - new version
const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App />);

// react - old version
/*
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
reportWebVitals();
*/
