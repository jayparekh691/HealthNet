import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { updateEmployee } from "../services/adminServices";
import { handleAuthentication } from "../utils/authentication";
import { getValueForKey } from "../utils/localStorage";

function UpdateEmployeeDetails() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [employeeObj, setEmplyeeObj] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState({
    e_id: state.employeeObj.e_id,
    name: state.employeeObj.name,
    email: state.employeeObj.email,
    password: state.employeeObj.password,
    gender: state.employeeObj.gender,
    specialization: state.employeeObj.specialization,
    mobilenumber: state.employeeObj.mobilenumber,
    address: state.employeeObj.address,
    roles: state.employeeObj.roles,
  });
  const [genderDefault, setGenderDefault] = useState(state.employeeObj.gender);
  useEffect(() => {
    if (getValueForKey("token") === null) {
      navigate("/login");
    }
    setEmplyeeObj(state.employeeObj);
    if (state.employeeObj.roles === "Doctor") {
      setDisabled((pv) => {
        return false;
      });
    } else {
      setDisabled((pv) => {
        return true;
      });
    }
  }, [state.employeeObj, state.employeeObj.roles]);

  function handleChange(event) {
    // event.preventDefault();
    const { name, value } = event.target;
    setUpdatedEmployeeData((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
    if (name === "gender") {
      setGenderDefault(value);
    }
  }

  async function onUpdate(event) {
    event.preventDefault();
    console.log(updatedEmployeeData);
    // add employee data
    try {
      const responseData = await updateEmployee(
        updatedEmployeeData.e_id,
        updatedEmployeeData
      );
      if (responseData.data) {
        toast.success(`Updated Employee Data`);
        navigate(-1);
      } else {
        toast.error("Unable to Update Employee data");
      }
    } catch (error) {
      handleAuthentication(error.response, navigate, "/login");
    }
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Update Employee Data</div>
        <div className="content">
          <form onSubmit={onUpdate}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder={employeeObj.name}
                  value={updatedEmployeeData.name}
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
                  placeholder={employeeObj.email}
                  value={updatedEmployeeData.email}
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
                  placeholder={employeeObj.mobilenumber}
                  value={updatedEmployeeData.mobilenumber}
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
                  placeholder={employeeObj.address}
                  value={updatedEmployeeData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="select-box">
                <span className="details">Role</span>
                <select
                  value={updatedEmployeeData.roles}
                  name="roles"
                  onChange={handleChange}
                  disabled={true}
                >
                  <option value={updatedEmployeeData.roles}>
                    {updatedEmployeeData.roles}
                  </option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Specialization</span>
                <input
                  disabled={disabled}
                  name="specialization"
                  type="text"
                  placeholder={updatedEmployeeData.specialization}
                  value={
                    updatedEmployeeData.specialization === null
                      ? "No specialization"
                      : updatedEmployeeData.specialization
                  }
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="UPDATE" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateEmployeeDetails;
