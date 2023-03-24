import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import PatientRegistration from "./pages/PatientRegistration";
import RDashboard from "./pages/RDashboard";
import DDashboard from "./pages/DDashboard";
import ADashboard from "./pages/ADashboard";
import EmployeeRegistration from "./pages/EmployeeRegistration";
import UpdateEmployeeDetails from "./pages/UpdateEmployeeDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/receptionist-dashboard" element={<RDashboard />} />
      <Route path="/doctor-dashboard" element={<DDashboard />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route path="/admin-dashboard" element={<ADashboard />} />
      <Route path="/employee-registration" element={<EmployeeRegistration />} />
      <Route
        path="/update-employee-details"
        element={<UpdateEmployeeDetails />}
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
