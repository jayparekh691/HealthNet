import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { getPatientHistory, getPatientList } from "../services/doctorServices";

function ViewAnyPatientHistory() {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [doctorID, setDoctorID] = useState(null);
  const [searchedPatientList, setSearchedPatientList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    setDoctorID(state.d_id);
  }, [state.d_id]);

  function searchBarOnChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setSearchValue(value);
    // api call to get list
    if (value !== "") {
      (async function getsearchedPatientList() {
        const responseData = await getPatientList(doctorID, value);
        const patientList = responseData.data;
        if (patientList) {
          console.log(patientList);
          setSearchedPatientList(patientList);
        }
      })();
    }
  }

  function onViewHistoryButtonClicked(p) {
    (async function getPatientMedicalHistory() {
      const responseData = await getPatientHistory(doctorID, p.pid);
      let data = responseData.data;
      if (data) {
        setPatientHistory(data);
      }
      console.log(data);
      navigate("/patient-medical-history", {
        state: {
          patientHistory: data,
          patientObj: p,
        },
      });
    })();
  }

  return (
    <div className="paddingPage">
      <label className="tableHeading">Search Patients</label>
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
      {/* TODO: Change gender to display full form */}
      <div className="paddingPage">
        <table>
          <tbody>
            <tr>
              <th>Patient Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </tbody>
          <tbody>
            {searchedPatientList.map((p, i) => {
              return (
                <tr key={i}>
                  <th>{p.pid}</th>
                  <th>{p.name}</th>
                  <th>{p.gender}</th>
                  <th>{p.age}</th>
                  <td>
                    <button
                      className="button"
                      value={i}
                      onClick={() => onViewHistoryButtonClicked(p)}
                    >
                      View History
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
export default ViewAnyPatientHistory;
