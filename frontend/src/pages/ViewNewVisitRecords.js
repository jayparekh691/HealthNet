import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation } from "react-router-dom";
import {
  getNewVisitRecords,
  markSeenByDoctor,
} from "../services/doctorServices";
import { toast } from "react-toastify";

function ViewNewVisitRecords() {
  const state = useLocation().state;
  const [newVisitList, setNewVisitList] = useState([]);

  useEffect(() => {
    (async function getNewVisit() {
      const responseData = await getNewVisitRecords(state.doctorID);
      let data = responseData.data;
      if (data) {
        setNewVisitList(data);
      }
      console.log(data);
    })();
  }, [state.doctorID]);

  async function markAsSeenByDoctor(visitID) {
    console.log(visitID);
    const responseData = await markSeenByDoctor(visitID);
    const data = responseData.data;
    console.log(data);
    if (data) {
      toast.success("Marked as seen");
    } else {
      toast.error("Could not mark as seen");
    }
  }

  return (
    <div>
      <div>
        {/* {newVisitList.length !== 0 && ( */}
        <label className="tableHeading" style={{ textAlign: "center" }}>
          New Visit Records
        </label>
        {/*)*/}
        {/* {newVisitList.length === 0 && (
          <label className="tableHeading" style={{ textAlign: "center" }}>
            No New Visit Records
          </label>
        )} */}
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
                    <label className="tableHeading">
                      Follow Up ID: {e.followup.f_id}{" "}
                    </label>
                    <br />
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
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {
                                <Typography>
                                  <label className="tableHeading">
                                    Medical Data:
                                  </label>
                                  <br />
                                  <span>
                                    BP: {v.medicalData && v.medicalData.bp}
                                  </span>
                                  <br />
                                  <span>
                                    Sugar:
                                    {v.medicalData && v.medicalData.sugar_level}
                                  </span>
                                  <br />
                                  <span>
                                    Temperature:
                                    {v.medicalData && v.medicalData.temperature}
                                  </span>
                                  <br />
                                  {/* TODO: put this button to the right end */}
                                  <span>
                                    <button
                                      onClick={() => markAsSeenByDoctor(v.v_id)}
                                    >
                                      Mark as seen
                                    </button>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ViewNewVisitRecords;
