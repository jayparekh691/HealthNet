import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { writeDiagnosis } from "../services/doctorServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DiagnosePatient() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [appointmentID, setAppointmentID] = useState(null);
  const [writtenData, setWrittenData] = useState({
    diagnosis: "",
    remarks: "",
    prescription: "",
  });

  useEffect(() => {
    setAppointmentID(state.a_id);
  }, [state.a_id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setWrittenData((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
  }
  function checkPatientHistory() {}

  function writeFollowUp() {
    navigate("/write-follow-up", {
      state: {
        a_id: appointmentID,
        writtenData: writtenData,
      },
    });
  }

  async function onSubmit() {
    console.log(writtenData);
    const responseData = await writeDiagnosis(appointmentID, writtenData);
    if (responseData.data) {
      toast.success(`Diagnosis and Prescription Written`);
      navigate(-1);
    } else {
      toast.error("Unable to write Diagnosis and Prescription");
    }
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Diagnosis and Prescription</div>
        <div className="content">
          <form action="#">
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
                  required
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
                onClick={checkPatientHistory}
                type="button"
                value="Check Patient History"
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
              <input onClick={onSubmit} type="button" value="SUBMIT" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default DiagnosePatient;
