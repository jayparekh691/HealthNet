import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPatients } from "../services/doctorServices";

function DDashboard() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [doctorID, setDoctorID] = useState(null);
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    setDoctorID(state.d_id);
    (async function () {
      const responseData = await getAllPatients(state.d_id);
      const data = responseData.data;
      console.log(data);
      if (data) {
        setPatientList(
          data.filter((e) => {
            return e.treated === false;
          })
        );
      } else {
        console.log("error! ");
      }
    })();
  }, [state.d_id]);

  function updatePassword(event) {
    event.preventDefault();
    navigate("/update-password", {
      state: {
        employeeId: doctorID,
      },
    });
  }

  function onCheckUPButtonClicked(p, event) {
    console.log(p.a_id);
    const index = Number(event.target.value);
    setPatientList((list) => {
      let filteredList = list.filter((_, i) => {
        return i !== index;
      });
      console.log(filteredList);
      return [...filteredList];
    });

    navigate("/diagnose-patient", {
      state: {
        doctorID: doctorID,
        a_id: p.a_id,
        patientObj: p.patient,
      },
    });
  }

  function viewAnyPatientHistory() {
    navigate("/view-any-patient-history", {
      state: {
        d_id: doctorID,
      },
    });
  }

  function viewNewVisitRecords() {
    navigate("/view-new-visit-records", {
      state: {
        doctorID: doctorID,
      },
    });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
      }}
    >
      <div
        style={{
          flex: 2,
          height: "100vh",
          width: "300px",
          backgroundColor: "#516395",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button className="button2" onClick={updatePassword}>
          Update Password
        </button>
        <button className="button2" onClick={viewAnyPatientHistory}>
          View Patient History
        </button>
        <button className="button2" onClick={viewNewVisitRecords}>
          New Visit Records
        </button>
      </div>

      <div
        className="paddingPage"
        style={{
          flex: 10,
        }}
      >
        <div>
          <div style={{ margin: "8px" }}>
            <label className="tableHeading">
              Upcoming Patients: {patientList.length}
            </label>
          </div>
          <table>
            <tbody>
              <tr>
                <th>A_No.</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </tbody>
            <tbody>
              {patientList.map((p, i) => {
                return (
                  <tr key={p.a_id}>
                    <th>{p.a_id}</th>
                    <th>{p.patient.name}</th>
                    <th>{p.patient.age}</th>
                    <th>{p.patient.gender}</th>
                    <td>
                      <button
                        className="button"
                        value={i}
                        onClick={(event) => onCheckUPButtonClicked(p, event)}
                      >
                        Check-up
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DDashboard;
