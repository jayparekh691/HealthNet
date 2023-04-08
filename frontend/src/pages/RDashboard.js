import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPatientList } from "../services/receptionistServices";
import { searchPatient, getDoctorList } from "../services/receptionistServices";
import { addPatientAppointment } from "../services/receptionistServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import TextField from "@mui/material/TextField";

function RDashboard() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [searchedPatientList, setSearchedPatientList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [doctorID, setDoctorID] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [receptionistId, setReceptionistId] = useState(null);

  function addPatient() {
    navigate("/patient-registration");
  }

  function updatePassword(event) {
    event.preventDefault();
    navigate("/update-password", {
      state: {
        employeeId: receptionistId,
      },
    });
  }

  useEffect(() => {
    setReceptionistId(state.r_id);
    (async function () {
      const responseData = await getAllPatientList();
      const data = responseData.data;
      console.log(data);
      if (data) {
        setPatientList(
          data.filter((e) => {
            return e.treated === false;
          })
        );
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

  async function addAppointment(p_id) {
    // add appointment for patient using pid
    const responseData = await addPatientAppointment(p_id, doctorID);
    const appointmentData = responseData.data;
    console.log(appointmentData);
    if (appointmentData) {
      toast.success(`Appointment ID: ${appointmentData.a_id} generated!`);
    } else {
      toast.error(`Unable to generate Appointment`);
    }
  }

  function handleChangeInDoctor(event) {
    event.preventDefault();
    const value = event.target.value;
    console.log(value);
    setDoctorID(value);
  }

  function onUpdatePatientData(searchedPatientObj) {
    navigate("/update-patient-details", {
      state: {
        patientObj: searchedPatientObj,
      },
    });
  }

  function searchBarOnChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setSearchValue(value);
    setDoctorID(doctorList[0].e_id);
    // api call to get list
    if (value !== "") {
      (async function getSearchedPatientList() {
        const responseData = await searchPatient(value);
        let searchedPatientList = responseData.data;
        if (searchedPatientList) {
          console.log(searchedPatientList);
          setSearchedPatientList(searchedPatientList);
        }
      })();
    }
  }

  return (
    <div style={{ padding: "8px", height: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <label className="tableHeading">Receptionist Dashboard</label>
        <button onClick={addPatient}>Add Patient</button>
        <span style={{ margin: "12px" }}>
          <button onClick={updatePassword}>Update Password</button>
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: "24px",
        }}
      >
        <label className="tableHeading">
          Upcoming Patients: {patientList.length}
        </label>
        <div className="search">
          <TextField
            name="Patient Search"
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            onChange={searchBarOnChange}
            value={searchValue}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "4px",
          height: "80vh",
        }}
      >
        <div className="table-wrapper" style={{ flex: 1, marginRight: "4px" }}>
          <table
            style={{
              width: "100%",
            }}
          >
            <tbody>
              <tr>
                <th>Appointment No.</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Doctor</th>
              </tr>
            </tbody>
            <tbody tbody style={{ flex: "1", overflowY: "auto" }}>
              {patientList.map((e, i) => {
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
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "4px",
            }}
          >
            <div className="table-wrapper">
              <table>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                  </tr>
                </tbody>
                <tbody style={{ flex: "1", overflowY: "auto" }}>
                  {searchedPatientList.map((e, i) => {
                    return (
                      <tr key={i}>
                        <th>{e.name}</th>
                        <th>{e.age}</th>
                        <th>{e.gender}</th>
                        <td>
                          <div>
                            <Popup
                              contentStyle={{ width: "20%", height: "30%" }}
                              trigger={<button> Add Appointment</button>}
                              position="right center"
                            >
                              <div style={{ padding: 10 }}>
                                <label className="popup-heading">
                                  Select Doctor
                                </label>
                                <div className="popup-select-box">
                                  <select
                                    name="doctor"
                                    onChange={handleChangeInDoctor}
                                  >
                                    {doctorList.map((e) => {
                                      return (
                                        <option value={e.e_id} key={e.e_id}>
                                          {e.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                <div>
                                  <button
                                    className="button"
                                    value={i}
                                    onClick={() => addAppointment(e.pid)}
                                  >
                                    CONFIRM
                                  </button>
                                </div>
                              </div>
                            </Popup>
                          </div>
                        </td>
                        <td>
                          <button
                            className="button"
                            value={i}
                            onClick={() => onUpdatePatientData(e)}
                          >
                            UpdatePatientData
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div style={{ alignSelf: "flex-end" }}>
              <label className="tableHeading">Doctors Available</label>
            </div>
            <div className="table-wrapper">
              <table
                style={{
                  width: "100%",
                }}
              >
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Specialization</th>
                  </tr>
                </tbody>
                <tbody style={{ flex: "1", overflowY: "auto" }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default RDashboard;
