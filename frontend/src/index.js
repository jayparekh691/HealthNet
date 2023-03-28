import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { DiagnoseProvider } from "./contexts/DiagnoseContext";
import { WriteFollowUpProvider } from "./contexts/WriteFollowUpContext";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode);

root.render(
  <BrowserRouter>
    <WriteFollowUpProvider>
      <DiagnoseProvider>
        <App />
        <ToastContainer />
      </DiagnoseProvider>
    </WriteFollowUpProvider>
  </BrowserRouter>
);
