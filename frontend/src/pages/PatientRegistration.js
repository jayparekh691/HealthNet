import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addPatientAppointment,
  getDoctorList,
  registerPatient,
} from "../services/receptionistServices";
import { handleAuthentication } from "../utils/authentication";

function PatientRegistration() {
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const [doctorID, setDoctorID] = useState(null);
  const [genderDefault, setGenderDefault] = useState("M");

  const [patientData, setPatientData] = useState({
    name: "",
    address: "",
    city: "",
    gender: "M",
    pincode: "",
    state: "",
    town: "",
    mobilenumber: "",
    age: "",
  });

  // storing the doctorlist from location.state into doctorList state
  useEffect(() => {
    async function getDoctors() {
      try {
        const responseData = await getDoctorList();
        let doctorList = responseData.data;
        if (doctorList) {
          setDoctorList(doctorList);
          setDoctorID(doctorList[0].e_id);
        }
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login");
      }
    }
    getDoctors();
  }, []);

  function handleChange(event) {
    // event.preventDefault();
    const { name, value } = event.target;
    if (name === "gender") {
      setGenderDefault(value);
    }
    setPatientData((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
  }

  async function onRegisteration(event) {
    event.preventDefault();
    console.log(patientData);
    // add patient data
    try {
      const responseData = await registerPatient(patientData);
      const registrationData = responseData.data;
      if (registrationData) {
        console.log(registrationData);
        const pid = registrationData.pid;
        // add appointment for patient using pid
        const responseData = await addPatientAppointment(pid, doctorID);
        const appointmentData = responseData.data;
        console.log(appointmentData);
        toast.success(`Appointment ID: ${appointmentData.a_id} generated!`);
      }
    } catch (error) {
      handleAuthentication(error.response, navigate, "/login");
    }
  }

  function handleChangeInDoctor(event) {
    event.preventDefault();
    const value = event.target.value;
    setDoctorID(value);
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Patient Registration</div>
        <div className="content">
          <form onSubmit={onRegisteration}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  value={patientData.name}
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
                  placeholder="Enter age"
                  value={patientData.age}
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
                  rows={3}
                  cols={37}
                  placeholder="Enter address"
                  value={patientData.address}
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
                  // TODO: Change it back to 10 and add back the pattern
                  maxLength={15}
                  // pattern="[1-9]{1}[0-9]{9}"
                  title="mobile no can only be between 0 to 9"
                  placeholder="+91"
                  value={patientData.mobilenumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Town</span>
                <input
                  name="town"
                  type="text"
                  placeholder="Enter town"
                  value={patientData.town}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">City</span>
                <input
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={patientData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">State</span>
                <input
                  name="state"
                  type="text"
                  placeholder="Enter state"
                  value={patientData.state}
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
                  placeholder="Enter pincode"
                  value={patientData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="select-box">
                <select name="role" onChange={handleChangeInDoctor}>
                  {doctorList.map((e, i) => {
                    return (
                      <option value={e.e_id} key={e.e_id}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
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

export default PatientRegistration;
