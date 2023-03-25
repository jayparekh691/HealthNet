import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode);

root.render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
);
