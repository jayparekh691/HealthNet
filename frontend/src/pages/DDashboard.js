import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPatients } from "../services/doctorServices";

function DDashboard() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [doctorID, setDoctorID] = useState(null);
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    (async function () {
      setDoctorID(state.d_id);
      const responseData = await getAllPatients(state.d_id);
      const data = responseData.data;
      console.log(data);
      if (data) {
        setPatientList([...data]);
      } else {
        console.log("error! ");
      }
    })();
  }, [state.d_id]);

  function onCheckUPButtonClicked(e, event) {
    console.log(event.target.value);
    console.log(e.a_id);
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
        a_id: e.a_id,
      },
    });
  }

  return (
    <div className="paddingPage">
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
            </tr>
          </tbody>
          <tbody>
            {patientList
              .filter((e) => {
                return e.treated === false;
              })
              .map((e, i) => {
                return (
                  <tr key={e.a_id}>
                    <th>{e.a_id}</th>
                    <th>{e.patient.name}</th>
                    <th>{e.patient.age}</th>
                    <th>{e.patient.gender}</th>
                    <td>
                      <button
                        className="button"
                        value={i}
                        onClick={(event) => onCheckUPButtonClicked(e, event)}
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
  );
}

export default DDashboard;
