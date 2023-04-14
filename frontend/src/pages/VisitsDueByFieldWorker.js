import React, { useEffect, useState } from "react";
import {
  dueVisits,
  getFieldworkerList,
  reassignFieldworkerAndDueDate,
} from "../services/supervisorServices";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleAuthentication } from "../utils/authentication";
import { useNavigate } from "react-router-dom";

function VisitsDueByFieldWorker() {
  const navigate = useNavigate();
  const [dueVisitList, setDueVisitList] = useState([]);
  const [fieldWorkerList, setFieldWorkerList] = useState([]);
  const [modalIndex, setModalIndex] = useState(-1);
  const [assigned, setAssigned] = useState(false);
  const [reassignedFieldWorkerID, setReassignedFieldWorkerID] = useState(null);
  useEffect(() => {
    (async function getDueVisitList() {
      try {
        const responseData = await dueVisits();
        const data = responseData.data;
        if (data) {
          setDueVisitList(data);
        }
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login");
      }
    })();

    (async function getFieldWorkerList() {
      try {
        const responseData = await getFieldworkerList();
        const data = responseData.data;
        if (data) {
          setFieldWorkerList(data);
        }
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login");
      }
    })();
  }, [assigned]);

  async function reassign(e_id, patientID) {
    if (reassignedFieldWorkerID === null) {
      alert("Field worker not selected");
    } else {
      try {
        const responseData = await reassignFieldworkerAndDueDate(
          patientID,
          reassignedFieldWorkerID
        );
        const data = responseData.data;
        if (data) {
          toast.success(`Reassigned Field Worker`);
        } else {
          toast.error(`Unable to Reassign Field Worker`);
        }
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login");
      }
    }
    setAssigned((pv) => !assigned);
    closeModal();
  }
  function openModal(index) {
    setModalIndex(index);
  }
  function closeModal() {
    setModalIndex(-1);
  }

  function handleChangeInReAssignFieldWorker(event) {
    event.preventDefault();
    const value = event.target.value;
    setReassignedFieldWorkerID(value);
  }

  return (
    <div>
      <div className="paddingPage">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: "12px",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              justifyItems: "center",
              // alignItems: "flex-end",
            }}
          >
            <span className="tableHeading" style={{}}>
              Visits Due:
            </span>
          </div>
        </div>
        {/* TODO: Change gender to display full form */}
        <div
          style={{
            width: "100%",
            height: "80%",
            maxHeight: "400px",
            overflowY: "scroll",
          }}
        >
          <table>
            <tbody>
              <tr>
                <th>Patient Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Field Worker Name</th>
                <th>Due Date</th>
              </tr>
            </tbody>
            <tbody style={{}}>
              {dueVisitList.map((v, i) => {
                return (
                  <tr key={i}>
                    <th>{v.patient.name}</th>
                    <th>{v.patient.gender}</th>
                    <th>{v.patient.age}</th>
                    <th>{v.patient.fieldworker.name}</th>
                    <th>{v.visit[0].date.split("T")[0]}</th>
                    <td>
                      <div style={{ marginLeft: "24px" }}>
                        <button
                          onClick={() => {
                            openModal(i);
                          }}
                        >
                          Reassign Field Worker
                        </button>
                        {modalIndex === i && (
                          <Modal
                            key={i}
                            fieldWorkerList={fieldWorkerList}
                            data={v.patient.fieldworker}
                            patientID={v.patient.pid}
                            reassign={reassign}
                            closeModal={closeModal}
                            handleOptionChange={
                              handleChangeInReAssignFieldWorker
                            }
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default VisitsDueByFieldWorker;
