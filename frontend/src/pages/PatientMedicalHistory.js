import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function PatientMedicalHistory() {
  const state = useLocation().state;
  const [patientHistory, setPatientHistory] = useState([]);
  const [patientObj, setPatientObj] = useState({});

  useEffect(() => {
    setPatientHistory(state.patientHistory);
    setPatientObj(state.patientObj);
  }, [state.patientHistory, state.patientObj]);

  return (
    <div>
      <div style={{ padding: "10px" }}>
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
                        <label className="tableHeading">Schedule Type: </label>
                        <br />
                        <span>{e.followup.scheduleType}</span>
                        <br />
                        <label className="tableHeading">Schedule Count: </label>
                        <br />
                        <span>{e.followup.scheduleCount}</span>
                        <br />
                      </Typography>
                    }
                  </AccordionDetails>
                  {e.followup.visitList.map((v, i) => {
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
                                <span>Sugar : {v.medicalData.sugar_level}</span>
                                <br />
                              </Typography>
                            }
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    );
                  })}
                </Accordion>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default PatientMedicalHistory;
