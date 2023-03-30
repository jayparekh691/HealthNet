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
                <span className="details">Interval</span>
                <input
                  name="gap"
                  type="number"
                  min={1}
                  max={100}
                  placeholder="Interval"
                  value={followUpDetails.gap}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-box">
                <span className="details">Visit Count</span>
                <input
                  name="visitCount"
                  type="number"
                  min={1}
                  max={100}
                  placeholder="Visit Count"
                  value={followUpDetails.visitCount}
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
