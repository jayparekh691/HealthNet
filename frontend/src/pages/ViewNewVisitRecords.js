import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getNewVisitRecords,
  markSeenByDoctor,
} from "../services/doctorServices";
import { toast } from "react-toastify";
import { handleAuthentication } from "../utils/authentication";
import { getValueForKey } from "../utils/localStorage";
import { Padding } from "@mui/icons-material";

function ViewNewVisitRecords() {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [newVisitList, setNewVisitList] = useState([]);

  useEffect(() => {
    if (getValueForKey("token") === null) {
      navigate("/login");
    }
    (async function getNewVisit() {
      try {
        const responseData = await getNewVisitRecords(state.doctorID);
        let data = responseData.data;
        if (data) {
          setNewVisitList(data);
        }
        console.log(data);
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login");
      }
    })();
    if (newVisitList.length === 0) {
      alert("No New Visits");
      navigate(-1);
    }
  }, [state.doctorID]);

  async function markAsSeenByDoctor(visitID) {
    console.log(visitID);
    try {
      const responseData = await markSeenByDoctor(visitID);
      const data = responseData.data;
      console.log(data);
      if (data) {
        toast.success("Marked as seen");
      } else {
        toast.error("Could not mark as seen");
      }
    } catch (error) {
      handleAuthentication(error.response, navigate, "/login");
    }
  }

  return (
    <div>
      <div style={{ margin: "16px" }}>
        <label className="tableHeading" style={{ textAlign: "center" }}>
          New Visit Records
        </label>
      </div>
      <div>
        {newVisitList.map((e, i) => {
          return (
            <div key={i}>
              <Accordion
                style={{ margin: "10px" }}
                TransitionProps={{ unmountOnExit: true }}
              >
                <AccordionSummary
                  sx={{
                    backgroundColor: "lavender",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <span className="spaceBetweenLabels">
                      Patient ID : {e.patient.pid}
                    </span>
                    <span className="spaceBetweenLabels">
                      Name : {e.patient.name}
                    </span>
                    <span className="spaceBetweenLabels">
                      Age : {e.patient.age}
                    </span>
                    <span className="spaceBetweenLabels">
                      Gender : {e.patient.gender}
                    </span>
                    <span className="spaceBetweenLabels">
                      Appointment ID : {e.a_id}
                    </span>
                    <span className="spaceBetweenLabels">
                      Date : {e.curr_date.split("T")[0]}
                    </span>
                    <span className="spaceBetweenLabels">
                      Current Field Worker :{" "}
                      {e.patient.fieldworker === null
                        ? "Not Assigned"
                        : e.patient.fieldworker.name}
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <label className="tableHeading">Diagnostics: </label>
                    <br />
                    <span>{e.diagnostics.diagnosis}</span>
                    <br />
                    <label className="tableHeading">Prescription: </label>
                    <br />
                    <span>{e.diagnostics.prescription}</span>
                    <br />
                    <label className="tableHeading">Remarks: </label>
                    <br />
                    <span>{e.diagnostics.remarks}</span>
                    <br />
                    <label className="tableHeading">
                      Follow Up ID: {e.followup.f_id}{" "}
                    </label>
                    <br />
                    <label style={{ fontSize: "20px" }}>
                      Readings to be taken:{" "}
                    </label>
                    <br />
                    {e.followup.instructions.temperature && (
                      <>
                        <span>Temperature Readings</span>
                        <br />
                      </>
                    )}

                    {e.followup.instructions.sugarLevel && (
                      <>
                        <span>Sugar Level</span>
                        <br />
                      </>
                    )}

                    {e.followup.instructions.bloodPressure && (
                      <>
                        <span>Blood Pressure</span>
                        <br />
                      </>
                    )}
                    {e.followup.instructions.spo2Level && (
                      <>
                        <span>spo2Level</span>
                        <br />
                      </>
                    )}
                    <label className="tableHeading">Interval: </label>
                    <br />
                    <span>{e.followup.gap}</span>
                    <br />
                    <label className="tableHeading">Visit Count: </label>
                    <br />
                    <span>{e.followup.visitCount}</span>
                    <br />
                  </Typography>
                </AccordionDetails>

                {e.followup &&
                  e.followup.visitList
                    .filter((v, i) => {
                      return v.visited === true && v.seenByDoctor === false;
                    })
                    .map((v, i) => {
                      return (
                        <div key={i}>
                          <Accordion style={{ margin: "10px" }}>
                            <AccordionSummary
                              sx={{
                                backgroundColor: "lavender",
                              }}
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>
                                <span className="spaceBetweenLabels">
                                  Visit ID : {v.v_id}
                                </span>
                                <span className="spaceBetweenLabels">
                                  Visit Date : {v.date.split("T")[0]}
                                </span>
                                <span className="spaceBetweenLabels">
                                  Field Worker : {v.fieldWorker.name}
                                </span>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {
                                <Typography
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Typography
                                    style={{
                                      flex: 1,
                                    }}
                                  >
                                    <label className="tableHeading">
                                      Medical Data:
                                    </label>
                                    <br />
                                    {e.followup.instructions.temperature && (
                                      <>
                                        <span>
                                          Temperature Readings:
                                          {v.medicalData.temperature}
                                        </span>
                                        <br />
                                      </>
                                    )}

                                    {e.followup.instructions.sugarLevel && (
                                      <>
                                        <span>
                                          Sugar Level:
                                          {v.medicalData.sugarLevel}
                                        </span>
                                        <br />
                                      </>
                                    )}

                                    {e.followup.instructions.bloodPressure && (
                                      <>
                                        <span>
                                          Blood Pressure:
                                          {v.medicalData.bloodPressure}
                                        </span>
                                        <br />
                                      </>
                                    )}

                                    {e.followup.instructions.spo2Level && (
                                      <>
                                        <span>
                                          spO2Level: {v.medicalData.spo2Level}
                                        </span>
                                        <br />
                                      </>
                                    )}

                                    {v.medicalData.photo !== null &&
                                      v.medicalData.photo !== "" && (
                                        <img
                                          style={{ height: "200px" }}
                                          src={v.medicalData.photo}
                                          alt="medicalphoto"
                                        />
                                      )}
                                    {/* TODO: put this button to the right end */}
                                    <br />
                                  </Typography>
                                  <Typography>
                                    <span
                                      style={{ float: "right", margin: "4px" }}
                                    >
                                      <button
                                        onClick={() =>
                                          markAsSeenByDoctor(v.v_id)
                                        }
                                      >
                                        Mark as seen
                                      </button>
                                    </span>
                                    <br />
                                  </Typography>
                                </Typography>
                              }
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      );
                    })}
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ViewNewVisitRecords;
