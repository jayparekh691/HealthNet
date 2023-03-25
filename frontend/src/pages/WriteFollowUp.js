import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { writeDiagnosis, submitFollowUp } from "../services/doctorServices";

function WriteFollowUp() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [appointmentID, setAppointmentID] = useState(null);
  const [writtenData, setWrittenData] = useState({});
  const [followUpDetails, setFollowUpDetails] = useState({
    instructions: "",
    numberOfFollowup: "",
    secheduleCount: "",
    scheduleType: "Weekly",
  });

  useEffect(() => {
    setAppointmentID(state.a_id);
    setWrittenData(state.writtenData);
  }, [state.a_id, state.writtenData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFollowUpDetails((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
  }

  async function submitFollowUpDetails(event) {
    event.preventDefault();
    console.log(appointmentID);
    console.log(writtenData);
    console.log(followUpDetails);
    const responseData = await submitFollowUp(appointmentID, followUpDetails);
    const data = responseData.data;
    if (data) {
      console.log(data);
      const responseData = await writeDiagnosis(appointmentID, writtenData);
      const wData = responseData.data;
      if (wData) {
        console.log(wData);
        toast.success(`Diagnosis and Prescription Written and FollowUp Added`);
        navigate(-2);
      } else {
        toast.error("Unable to write Diagnosis and Prescription / follow up");
      }
    }
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Follow Up</div>
        <div className="content">
          <form onSubmit={submitFollowUpDetails}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Instructions</span>
                <textarea
                  name="instructions"
                  type="textarea"
                  rows={5}
                  cols={40}
                  value={followUpDetails.instructions}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Schecule Count</span>
                <input
                  name="secheduleCount"
                  type="number"
                  min={1}
                  max={100}
                  placeholder="Schedule Count"
                  value={followUpDetails.secheduleCount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="select-box">
                <select
                  defaultValue={followUpDetails.scheduleType}
                  name="scheduleType"
                  onChange={handleChange}
                  required
                >
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="input-box">
                <span className="details">Follow Up Count</span>
                <input
                  name="numberOfFollowup"
                  type="number"
                  min={1}
                  max={100}
                  placeholder="Follow Up Count"
                  value={followUpDetails.numberOfFollowup}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Submit Follow Up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default WriteFollowUp;
