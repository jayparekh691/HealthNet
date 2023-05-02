import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerEmployee } from "../services/adminServices";
import { handleAuthentication } from "../utils/authentication";
import { getValueForKey } from "../utils/localStorage";

function EmployeeRegistration() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "M",
    address: "",
    mobilenumber: "",
    specialization: "",
    roles: "Receptionist",
  });

  const [genderDefault, setGenderDefault] = useState("M");

  useEffect(() => {
    if (getValueForKey("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;
    setEmployeeData((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
    if (name === "gender") {
      setGenderDefault(value);
    }
    if (name === "roles" && value === "Doctor") {
      setDisabled((pv) => {
        return false;
      });
    } else if (name === "roles") {
      setEmployeeData((pv) => {
        return {
          ...pv,
          specialization: "",
        };
      });
      setDisabled((pv) => {
        return true;
      });
    }
  }

  async function onRegisteration(e) {
    e.preventDefault();
    console.log(employeeData);
    // add employee data
    try {
      const responseData = await registerEmployee(employeeData);
      handleAuthentication(responseData, navigate, "/login");
      if (responseData.data) {
        toast.success(`Employee Added`);
        navigate(-1);
      } else {
        toast.error("Unable to Add Employee");
      }
    } catch (error) {
      handleAuthentication(error.response, navigate, "/login", toast);
    }
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Employee Registration</div>
        <div className="content">
          <form onSubmit={onRegisteration}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
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
                checked={genderDefault === "M"}
                onChange={handleChange}
              />
              <input
                type="radio"
                name="gender"
                id="dot-2"
                value="F"
                checked={genderDefault === "F"}
                onChange={handleChange}
              />
              <input
                type="radio"
                name="gender"
                id="dot-3"
                value="O"
                checked={genderDefault === "O"}
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
                  placeholder="Email"
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
                  minLength={3}
                  placeholder="Password"
                  value={employeeData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <textarea
                  name="address"
                  type="textarea"
                  rows={3}
                  cols={38}
                  placeholder="Address"
                  value={employeeData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Mobile Number</span>
                <input
                  name="mobilenumber"
                  type="text"
                  minLength={10}
                  maxLength={10}
                  pattern="[1-9]{1}[0-9]{9}"
                  title="mobile no can only be between 0 to 9"
                  placeholder="+91"
                  value={employeeData.mobilenumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="select-box">
                <span className="details">Role</span>

                <select
                  value={employeeData.roles}
                  name="roles"
                  onChange={handleChange}
                >
                  <option value="Receptionist">Receptionist</option>
                  <option value="Doctor">Doctor</option>
                  <option value="FieldWorker">Field Worker</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Specialization</span>
                <input
                  disabled={disabled}
                  name="specialization"
                  type="text"
                  placeholder="Specialization"
                  value={employeeData.specialization}
                  onChange={handleChange}
                  required={disabled === false ? true : false}
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="REGISTER" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRegistration;
