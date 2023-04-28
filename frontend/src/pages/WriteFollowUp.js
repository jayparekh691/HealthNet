import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { WriteFollowUpContext } from "../contexts/WriteFollowUpContext";
import { getValueForKey } from "../utils/localStorage";

function WriteFollowUp() {
  const navigate = useNavigate();
  const [followUpDetails, setFollowUpDetails] =
    useContext(WriteFollowUpContext);

  useEffect(() => {
    if (getValueForKey("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  function handleChange(event) {
    console.log(followUpDetails);
    const { name, value } = event.target;
    setFollowUpDetails((pv) => {
      if (
        name === "temperature" ||
        name === "sugarLevel" ||
        name === "spo2Level" ||
        name === "bloodPressure"
      ) {
        const prev = { ...pv };
        prev.instructions[name] = !prev.instructions[name];
        return prev;
      }
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
            {/* <span className="details">Instructions</span> */}
            {/* <textarea
                  name="instructions"
                  type="textarea"
                  rows={5}
                  cols={40}
                  value={followUpDetails.instructions}
                  onChange={handleChange}
                  required
                /> */}
            <span
              style={{
                fontSize: "20px",
                fontWeight: "lighter",
              }}
            >
              Readings to be taken:
            </span>
            <div
              style={{
                margin: "8px",
                display: "flex",
                flexDirection: "column",
                fontSize: "18px",
                width: "200px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <label>Temperature</label>
                <input
                  name="temperature"
                  type="checkbox"
                  checked={followUpDetails.instructions.temperature}
                  onChange={handleChange}
                />
              </div>

              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <label> Sugar Level</label>
                <input
                  name="sugarLevel"
                  type="checkbox"
                  checked={followUpDetails.instructions.sugarLevel}
                  onChange={handleChange}
                />
              </div>

              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <label>Spo2 Level</label>
                <input
                  name="spo2Level"
                  type="checkbox"
                  checked={followUpDetails.instructions.spo2Level}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <label>Blood Pressure</label>
                <input
                  name="bloodPressure"
                  type="checkbox"
                  checked={followUpDetails.instructions.bloodPressure}
                  onChange={handleChange}
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
