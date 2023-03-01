import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import PatientRegistration from "./pages/PatientRegistration";
import RDashboard from "./pages/RDashboard";
import DDashboard from "./pages/DDashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/receptionist-dashboard" element={<RDashboard />} />
      <Route path="/doctor-dashboard" element={<DDashboard />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
