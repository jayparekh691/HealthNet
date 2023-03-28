import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { WriteFollowUpContext } from "../contexts/WriteFollowUpContext";

function WriteFollowUp() {
  const navigate = useNavigate();
  const [followUpDetails, setFollowUpDetails] =
    useContext(WriteFollowUpContext);

  function handleChange(event) {
    const { name, value } = event.target;
    setFollowUpDetails((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
  }

  function submitFollowUpDetails(event) {
    event.preventDefault();
    navigate(-1);
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
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default WriteFollowUp;
