import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPatientList } from "../services/receptionistServices";
import { searchPatient, getDoctorList } from "../services/receptionistServices";
import { addPatientAppointment } from "../services/receptionistServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";

function RDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [patientList, setPatientList] = useState([]);
  const [searchedPatientList, setSearchedPatientList] = useState({});
  const [doctorList, setDoctorList] = useState([]);
  const [doctorID, setDoctorID] = useState(null);
  const [searchValues, setSearchValues] = useState({
    name: "",
    mobilenumber: "",
  });

  function addPatient() {
    navigate("/patient-registration");
  }

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    (async function () {
      const responseData = await getAllPatientList();
      const data = responseData.data;
      console.log(data);
      if (data) {
        setPatientList(data);
      }
    })();

    (async function getDoctors() {
      const responseData = await getDoctorList();
      let doctorListData = responseData.data;
      console.log(doctorListData);
      if (doctorListData) {
        setDoctorList(doctorListData);
      }
    })();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setSearchValues((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
  }

  async function addAppointment() {
    // add appointment for patient using pid
    const responseData = await addPatientAppointment(
      searchedPatientList.pid,
      doctorID
    );
    const appointmentData = responseData.data;
    console.log(appointmentData);
    toast.success(`Appointment ID: ${appointmentData.a_id} generated!`);
    handleClose();
  }

  function handleChangeInDoctor(event) {
    event.preventDefault();
    const value = event.target.value;
    setDoctorID(value);
  }

  function onUpdatePatientData() {
    navigate("/update-patient-details", {
      state: {
        patientObj: searchedPatientList,
      },
    });
  }

  async function onSearchPatient() {
    console.log(searchValues);
    // add patient data
    const responseData = await searchPatient(searchValues);
    const searchedPatientData = responseData.data;
    if (searchedPatientData) {
      console.log(searchedPatientData);
      setSearchedPatientList(searchedPatientData);
    }
  }

  return (
    <div className="paddingPage ">
      <button onClick={addPatient}>Add Patient</button>
      <div>
        <div>
          <label className="tableHeading">
            Upcoming Patients: {patientList.length}
          </label>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Appointment No.</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Doctor</th>
            </tr>
          </tbody>
          <tbody>
            {patientList
              .filter((e) => {
                return e.treated === false;
              })
              .map((e, i) => {
                return (
                  <tr key={i}>
                    <th>{e.a_id}</th>
                    <th>{e.patient.name}</th>
                    <th>{e.patient.age}</th>
                    <th>{e.patient.gender}</th>
                    <th>{e.doctor.name}</th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full Name</span>
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              value={searchValues.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Mobile Number</span>
            <input
              name="mobilenumber"
              type="text"
              placeholder="Enter mobile number"
              value={searchValues.mobilenumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="button">
          <button onClick={onSearchPatient}>Search</button>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </tbody>
            <tbody>
              {
                <tr>
                  <th>{searchedPatientList.name}</th>
                  <th>{searchedPatientList.age}</th>
                  <th>{searchedPatientList.gender}</th>
                  <td>
                    <button className="button" onClick={handleShow}>
                      AddAppointment
                    </button>
                  </td>
                  <td>
                    <button className="button" onClick={onUpdatePatientData}>
                      UpdatePatientData
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>
          <label className="tableHeading">Doctors Available</label>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
            </tr>
          </tbody>
          <tbody>
            {doctorList.map((e, i) => {
              return (
                <tr key={i}>
                  <th>{e.name}</th>
                  <th>{e.specialization}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Doctor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <button className="button" onClick={addAppointment}>
              Add Appointment
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default RDashboard;
