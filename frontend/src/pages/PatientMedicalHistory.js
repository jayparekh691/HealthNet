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

function PatientMedicalHistory() {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [patientHistory, setPatientHistory] = useState([]);
  const [patientObj, setPatientObj] = useState({});
  const [deactivate, setDeactivated] = useState(false);

  useEffect(() => {
    setPatientHistory(state.patientHistory);
    setPatientObj(state.patientObj);
  }, [state.patientHistory, state.patientObj, deactivate]);

  async function onDeactivateFollowUp(appointmentID) {
    // try{
    const responseData = await deactivateFollowUp(appointmentID);
    if (responseData) {
      console.log("deactivated");
      toast.success("Follow Up has been deactivated!");
      setDeactivated((pv) => !deactivate);
    } else {
      toast.error("Sorry, Please try again");
    }
    // } catch (error) {
    //   handleAuthentication(error.response, navigate, "/login");
    // }
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
                          <label className="tableHeading">Instructions: </label>
                          <br />
                          <span>{e.followup.instructions}</span>
                          <br />
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
                                    <span>BP: {v.medicalData.bp}</span>
                                    <br />
                                    <span>
                                      Sugar:
                                      {v.medicalData.sugar_level}
                                    </span>
                                    <br />
                                    <span>
                                      Temperature:
                                      {v.medicalData &&
                                        v.medicalData.temperature}
                                    </span>
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
