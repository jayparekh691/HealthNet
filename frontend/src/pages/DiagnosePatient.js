import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getPatientHistory,
  writeDiagnosis,
  submitFollowUp,
} from "../services/doctorServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DiagnoseContext,
  diagnoseData,
  resetDiagnoseData,
} from "../contexts/DiagnoseContext";
import {
  resetFollowupData,
  WriteFollowUpContext,
} from "../contexts/WriteFollowUpContext";

function DiagnosePatient() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [appointmentID, setAppointmentID] = useState(null);
  const [patientObj, setPatientObj] = useState({});
  const [doctorID, setDoctorID] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [writtenData, setWrittenData] = useContext(DiagnoseContext);
  const [followUpDetails, setFollowUpDetails] =
    useContext(WriteFollowUpContext);

  useEffect(() => {
    setAppointmentID(state.a_id);
    setPatientObj(state.patientObj);
    setDoctorID(state.doctorID);
  }, [state.a_id, state.patientObj, state.doctorID]);

  function handleChange(event) {
    const { name, value } = event.target;
    setWrittenData((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
  }
  function viewPatientHistory() {
    console.log(appointmentID);
    console.log(patientObj);
    (async function getPatientMedicalHistory() {
      const responseData = await getPatientHistory(doctorID, patientObj.pid);
      let data = responseData.data;
      if (data) {
        setPatientHistory(data);
      }
      console.log(data);
      navigate("/patient-medical-history", {
        state: {
          patientHistory: data,
          patientObj: patientObj,
        },
      });
    })();
  }

  function writeFollowUp() {
    navigate("/write-follow-up");
  }

  async function onSubmit(event) {
    event.preventDefault();
    console.log(writtenData);
    const responseData = await writeDiagnosis(appointmentID, writtenData);
    if (responseData.data) {
      console.log(followUpDetails);
      const responseData = await submitFollowUp(appointmentID, followUpDetails);
      const wData = responseData.data;
      if (wData) {
        setWrittenData(resetDiagnoseData);
        setFollowUpDetails(resetFollowupData);
        console.log(wData);
        toast.success(`Diagnosis and Prescription Written and FollowUp Added`);
        navigate(-1);
      } else {
        toast.error("Unable to write Diagnosis and Prescription / follow up");
      }
    } else {
      toast.error("Unable to write Diagnosis and Prescription");
    }
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Diagnosis and Prescription</div>
        <div className="content">
          <form onSubmit={onSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Diagnosis</span>
                <textarea
                  name="diagnosis"
                  type="textarea"
                  rows={5}
                  cols={40}
                  value={writtenData.diagnosis}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-box">
                <span className="details">Prescription</span>
                <textarea
                  name="prescription"
                  type="textarea"
                  rows={5}
                  cols={40}
                  value={writtenData.prescription}
                  onChange={handleChange}
                />
              </div>

              <div className="input-box">
                <span className="details">Remarks</span>
                <textarea
                  name="remarks"
                  type="textarea"
                  rows={5}
                  cols={40}
                  value={writtenData.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="button">
              <input
                onClick={viewPatientHistory}
                type="button"
                value="View Patient History"
              />
            </div>

            <div className="button">
              <input
                onClick={writeFollowUp}
                type="button"
                value="Write FollowUp"
              />
            </div>

            <div className="button">
              <input type="submit" value="SUBMIT" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default DiagnosePatient;
