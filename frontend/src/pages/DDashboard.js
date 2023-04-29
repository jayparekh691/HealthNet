import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPatients } from "../services/doctorServices";
import { handleAuthentication } from "../utils/authentication";
import { logout } from "../utils/authentication";
import ConfirmModal from "../components/ConfirmModal";
import { getValueForKey } from "../utils/localStorage";
import {
  DiagnoseContext,
  resetDiagnoseData,
} from "../contexts/DiagnoseContext";
import {
  resetFollowupData,
  WriteFollowUpContext,
} from "../contexts/WriteFollowUpContext";

function DDashboard() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [doctorID, setDoctorID] = useState(null);
  const [patientList, setPatientList] = useState([]);
  const [modal, setModal] = useState(false);
  const [writtenData, setWrittenData] = useContext(DiagnoseContext);
  const [followUpDetails, setFollowUpDetails] =
    useContext(WriteFollowUpContext);

  useEffect(() => {
    if (getValueForKey("token") === null) {
      navigate("/login");
    }
    setWrittenData(resetDiagnoseData);
    setFollowUpDetails(resetFollowupData);
    setDoctorID(state.d_id);
    (async function () {
      try {
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
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login");
      }
    })();
  }, [state.d_id, navigate, setFollowUpDetails, setWrittenData]);

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
  function openConfirmModal() {
    setModal(true);
  }
  function closeConfirmModal() {
    setModal(false);
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
          flex: 3,
          height: "100vh",
          width: "300px",
          backgroundColor: "#516395",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button className="button2" onClick={updatePassword}>
          Update Profile
        </button>
        <button className="button2" onClick={viewAnyPatientHistory}>
          View Patient History
        </button>
        <button className="button2" onClick={viewNewVisitRecords}>
          New Visit Records
        </button>
        <button
          className="button2"
          onClick={() => {
            openConfirmModal();
          }}
        >
          Logout
        </button>
        {modal && (
          <ConfirmModal
            onSubmit={logout}
            param1={navigate}
            param2={"/login"}
            closeModal={closeConfirmModal}
            submitText={"Logout"}
          />
        )}
      </div>

      <div
        className="paddingPage"
        style={{
          flex: 12,
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
