import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerEmployee } from "../services/adminServices";

function EmployeeRegistration() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    specialization: "",
    role: "receptionist",
  });

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setEmployeeData((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
    if (name === "role" && value === "doctor") {
      setDisabled((pv) => {
        return (pv = false);
      });
    } else if (name === "role") {
      setDisabled((pv) => {
        return (pv = true);
      });
    }
  }

  async function onRegisteration() {
    console.log(employeeData);
    // add employee data
    const responseData = await registerEmployee(employeeData);
    if (responseData.data) {
      toast.success(`Employee Added`);
      navigate(-1);
    } else {
      toast.error("Unable to Add Employee");
    }
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Employee Registration</div>
        <div className="content">
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Entername"
                  value={employeeData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="gender-details">
              <input
                type="radio"
                name="gender"
                id="dot-1"
                value="M"
                onChange={handleChange}
              />
              <input
                type="radio"
                name="gender"
                id="dot-2"
                value="F"
                onChange={handleChange}
              />
              <input
                type="radio"
                name="gender"
                id="dot-3"
                value="O"
                onChange={handleChange}
              />
              <span className="gender-title">Gender</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span className="gender">Male</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span className="gender">Female</span>
                </label>
                <label htmlFor="dot-3">
                  <span className="dot three"></span>
                  <span className="gender">Other</span>
                </label>
              </div>
            </div>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={employeeData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={employeeData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="select-box">
                <select
                  value={employeeData.role}
                  name="role"
                  onChange={handleChange}
                >
                  <option value="receptionist">Receptionist</option>
                  <option value="doctor">Doctor</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="fieldworker">Field Worker</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Specialization</span>
                <input
                  disabled={disabled}
                  name="specialization"
                  type="text"
                  placeholder="Enter specialization"
                  value={employeeData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="button">
              <input onClick={onRegisteration} type="button" value="REGISTER" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRegistration;
