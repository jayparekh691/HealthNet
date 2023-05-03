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
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={submitFollowUpDetails} style={{}}>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "lighter",
                display: "flex",
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                padding: "12px 0px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "lighter",
                  flex: 1,
                }}
              >
                Readings to be taken
              </span>

              <span
                style={{
                  flex: 1,
                  fontSize: "20px",
                  fontWeight: "lighter",
                }}
              >
                Instructions
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "18px",
                  flex: 1,
                  marginRight: "8%",
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
                <div className="user-details">
                  <div
                    className="input-box"
                    style={{
                      flex: 1,
                    }}
                  >
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
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <textarea
                  name="remarks"
                  type="textarea"
                  rows={5}
                  cols={40}
                  value={followUpDetails.remarks}
                  onChange={handleChange}
                  required
                />
                <div
                  className="user-details"
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    className="input-box"
                    style={{
                      flex: 1,
                    }}
                  >
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
