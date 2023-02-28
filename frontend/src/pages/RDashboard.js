import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPatientList } from "../services/receptionistServices";

function RDashboard() {
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);

  function addPatient() {
    navigate("/patient-registration");
  }

  useEffect(() => {
    (async function () {
      const responseData = await getAllPatientList();
      const data = responseData.data;
      console.log(data);
      if (data) {
        setPatientList(data);
      }
    })();
  }, []);

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
    </div>
  );
}

export default RDashboard;
