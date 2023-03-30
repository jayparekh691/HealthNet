import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import {
  getPatientList,
  getFieldworkerList,
  assignFieldworker,
  reassignFieldWorker,
} from "../services/supervisorServices";
import "reactjs-popup/dist/index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

function SDashboard() {
  //get unassigned patients
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [fieldWorkerList, setFieldWorkerList] = useState([]);
  const [fieldWorkerID, setFieldWorkerID] = useState(null);
  const [assigned, setAssigned] = useState(false);
  const [reassignedFieldWorkerID, setReassignedFieldWorkerID] = useState(null);
  const [modalIndex, setModalIndex] = useState(-1);

  useEffect(() => {
    (async function getUnassignedPatientList() {
      const responseData = await getPatientList();
      const data = responseData.data;
      if (data) {
        setPatientList(data);
        console.log(data);
      }
    })();
    (async function getFieldWorkerList() {
      const responseData = await getFieldworkerList();
      const data = responseData.data;
      if (data) {
        setFieldWorkerList(data);
      }
    })();
  }, [assigned]);

  function handleChangeInFieldWorker(event) {
    event.preventDefault();
    const value = event.target.value;
    console.log(value);
    setFieldWorkerID(value);
  }

  function handleChangeInReAssignFieldWorker(event) {
    event.preventDefault();
    const value = event.target.value;
    setReassignedFieldWorkerID(value);
  }

  async function assign(pid) {
    console.log(pid);
    const responseData = await assignFieldworker(pid, fieldWorkerID);
    const data = responseData.data;
    if (data) {
      console.log(data);
    }
    setAssigned((pv) => !assigned);
  }

  async function reassign(oldFieldWorkerID) {
    console.log(oldFieldWorkerID);
    if (reassignedFieldWorkerID === null) {
      alert("Field worker not selected");
    } else {
      const responseData = await reassignFieldWorker(
        oldFieldWorkerID,
        reassignedFieldWorkerID
      );
      const data = responseData.data;
      if (data) {
        toast.success(`Reassigned Field Worker`);
      } else {
        toast.error(`Unable to Reassign Field Worker`);
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

  function dueVisit(event) {
    event.preventDefault();
    navigate("/visits-due-by-fieldworker");
  }

  return (
    <div className="paddinPage">
      <div className="paddingPage" style={{ textAlign: "right" }}>
        <button onClick={dueVisit}>Visits Due BY FieldWorker</button>
      </div>
      <div
        className="paddingPage"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          className="table-wrapper"
          style={{
            flex: 1,
            margin: "10px",
          }}
        >
          <div>
            <label className="tableHeading">
              Unassigned Patients: {patientList.length}
            </label>
          </div>
          <div>
            {/* <div style={{ width: "40%", padding: "10px" }}>
            <TextField
              name="Search Patient"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              // onChange={}
              // value={searchValue}
            />
          </div> */}
          </div>
          <div>
            <table
              style={{
                width: "100%",
              }}
            >
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                </tr>
              </tbody>
              <tbody style={{ flex: "1", overflowY: "auto" }}>
                {patientList.map((e, i) => {
                  return (
                    <tr key={i}>
                      <th>{e.name}</th>
                      <th>{e.age}</th>
                      <th>{e.gender}</th>
                      <td>
                        <div>
                          <Popup
                            contentStyle={{ width: "20%", height: "35%" }}
                            trigger={<button> Assign Field Worker</button>}
                            position="right center"
                          >
                            <div style={{ padding: 10 }}>
                              <label className="popup-heading">
                                Select Field Worker
                              </label>
                              <div className="popup-select-box">
                                <select
                                  name="name"
                                  onChange={handleChangeInFieldWorker}
                                >
                                  <option hidden>Select</option>
                                  {fieldWorkerList.map((e) => {
                                    return (
                                      <option value={e.e_id} key={e.e_id}>
                                        {e.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div>
                                <button
                                  className="button"
                                  value={i}
                                  onClick={() => assign(e.pid)}
                                >
                                  ASSIGN
                                </button>
                              </div>
                            </div>
                          </Popup>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="table-wrapper"
          style={{
            flex: 1,
            margin: "10px",
          }}
        >
          <div>
            <label className="tableHeading">Reassign Patients</label>
          </div>
          <div className="table-wrapper">
            <table
              style={{
                width: "100%",
              }}
            >
              <tbody>
                <tr>
                  <th>Field Worker Name</th>
                  <th>Gender</th>
                </tr>
              </tbody>
              <tbody style={{ flex: "1", overflowY: "auto" }}>
                {fieldWorkerList.map((e, i) => {
                  return (
                    <tr key={i}>
                      <th>{e.name}</th>
                      <th>{e.gender}</th>
                      <td>
                        <div>
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
                              data={e}
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
    </div>
  );
}
export default SDashboard;
