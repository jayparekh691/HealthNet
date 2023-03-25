import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { updatePatientDetails } from "../services/receptionistServices";

function UpdatePatientDetails() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [patientObj, setPatientObj] = useState({});
  const [updatedPatientDate, setUpdatedPatientData] = useState({
    name: state.patientObj.name,
    address: state.patientObj.address,
    city: state.patientObj.city,
    gender: state.patientObj.gender,
    pincode: state.patientObj.pincode,
    state: state.patientObj.state,
    town: state.patientObj.town,
    mobilenumber: state.patientObj.mobilenumber,
    age: state.patientObj.age,
  });

  const [genderDefault, setGenderDefault] = useState(state.patientObj.gender);
  useEffect(() => {
    setPatientObj(state.patientObj);
  }, [state.patientObj]);

  function handleChange(event) {
    // event.preventDefault();
    const { name, value } = event.target;
    setUpdatedPatientData((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
    if (name === "gender") {
      setGenderDefault(value);
    }
  }

  async function onUpdatePatientDetails() {
    console.log(updatedPatientDate);
    const responseData = await updatePatientDetails(
      state.patientObj.pid,
      updatedPatientDate
    );
    if (responseData.data) {
      toast.success(`Updated Patient Data`);
      navigate(-1);
    } else {
      toast.error("Unable to Update Patient data");
    }
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Update Patient Details</div>
        <div className="content">
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder={patientObj.name}
                  value={updatedPatientDate.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Age</span>
                <input
                  name="age"
                  type="number"
                  min={0}
                  max={120}
                  placeholder={patientObj.age}
                  value={updatedPatientDate.age}
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
                <span className="details">Address</span>
                <textarea
                  name="address"
                  type="textarea"
                  rows={5}
                  cols={40}
                  placeholder={patientObj.address}
                  value={updatedPatientDate.address}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Mobile Number</span>
                <input
                  name="mobilenumber"
                  type="text"
                  placeholder={patientObj.mobilenumber}
                  value={updatedPatientDate.mobilenumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Town</span>
                <input
                  name="town"
                  type="text"
                  placeholder={patientObj.town}
                  value={updatedPatientDate.town}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">City</span>
                <input
                  name="city"
                  type="text"
                  placeholder={patientObj.city}
                  value={updatedPatientDate.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">State</span>
                <input
                  name="state"
                  type="text"
                  placeholder={patientObj.state}
                  value={updatedPatientDate.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Pincode</span>
                <input
                  name="pincode"
                  type="number"
                  min={100000}
                  max={999999}
                  placeholder={patientObj.pincode}
                  value={updatedPatientDate.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="button">
              <input
                onClick={onUpdatePatientDetails}
                type="button"
                value="UPDATE"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdatePatientDetails;
