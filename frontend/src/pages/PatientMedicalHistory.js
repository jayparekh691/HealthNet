import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deactivateFollowUp } from "../services/doctorServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleAuthentication } from "../utils/authentication";
import { getPatientHistory } from "../services/doctorServices";
import { getValueForKey } from "../utils/localStorage";

function PatientMedicalHistory() {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [patientHistory, setPatientHistory] = useState([]);
  const [patientObj, setPatientObj] = useState({});
  const [deactivate, setDeactivated] = useState(false);

  useEffect(() => {
    if (getValueForKey("token") === null) {
      navigate("/login");
    }

    setPatientObj(state.patientObj);
    (async function getPatientMedicalHistory() {
      try {
        const responseData = await getPatientHistory(
          state.doctorID,
          state.patientObj.pid
        );
        let data = responseData.data;
        if (data) {
          setPatientHistory(data);
        }
        console.log(data);
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login", toast);
      }
    })();
  }, [state.patientObj, deactivate, state.doctorID, navigate]);

  async function onDeactivateFollowUp(appointmentID) {
    try {
      const responseData = await deactivateFollowUp(appointmentID);
      if (responseData) {
        console.log("deactivated");
        toast.success("Follow Up has been deactivated!");
        setDeactivated((pv) => !deactivate);
      }
    } catch (error) {
      toast.error("Sorry, Please try again");
      handleAuthentication(error.response, navigate, "/login", toast);
    }
  }

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <div style={{ textAlign: "center" }}>
          <label className="tableHeading">Patient Medical History</label>
        </div>
        <div>
          <label className="tableHeading">Patient Details:</label>
        </div>
        <div>
          <label className="tableHeading">
            <span className="spaceBetweenLabels">ID: {patientObj.pid}</span>
            <span className="spaceBetweenLabels">Name: {patientObj.name}</span>
            <span className="spaceBetweenLabels">Age: {patientObj.age}</span>
            <span className="spaceBetweenLabels">
              Gender: {patientObj.gender}
            </span>
          </label>
        </div>
      </div>
      <div>
        {patientHistory.map((e, i) => {
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
                      Appointment ID : {e.a_id}
                    </span>
                    <span className="spaceBetweenLabels">
                      Date : {e.curr_date.split("T")[0]}
                    </span>
                    <span className="spaceBetweenLabels">
                      Field Worker :{" "}
                      {e.patient.fieldworker === null
                        ? "Not Assigned"
                        : e.patient.fieldworker.name}
                    </span>
                    {e.followupRemaining === true && (
                      <span style={{ textAlign: "right" }}>
                        <button onClick={() => onDeactivateFollowUp(e.a_id)}>
                          Deactivate Follow Up
                        </button>
                      </span>
                    )}
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
                  </Typography>
                </AccordionDetails>

                {e.followup && (
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
                          Follow Up ID : {e.followup.f_id}
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {
                        <Typography>
                          {/* <label className="tableHeading">Instructions: </label>
                          <br />
                          <span>{e.followup.instructions}</span>
                          <br /> */}
                          <label className="tableHeading">
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
                      }
                    </AccordionDetails>
                    {e.followup.visitList
                      .filter((v, i) => v.visited === true)
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
                                  <Typography>
                                    <label className="tableHeading">
                                      Medical Data:
                                    </label>
                                    <br />
                                    {e.followup.instructions.temperature && (
                                      <>
                                        <span>
                                          Temperature:
                                          {v.medicalData.temperature}
                                        </span>
                                        <br />
                                      </>
                                    )}

                                    {e.followup.instructions.sugarLevel && (
                                      <>
                                        <span>
                                          Sugar:
                                          {v.medicalData.sugarLevel}
                                        </span>
                                        <br />
                                      </>
                                    )}

                                    {e.followup.instructions.bloodPressure && (
                                      <>
                                        <span>
                                          BP:
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

                                    <br />
                                  </Typography>
                                }
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        );
                      })}
                  </Accordion>
                )}
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default PatientMedicalHistory;
