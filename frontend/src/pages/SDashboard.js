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
import Modal from "../components/Modal";
import SelectModal from "../components/SelectModal";
import { useNavigate } from "react-router-dom";
import { handleAuthentication } from "../utils/authentication";
import { searchPatient } from "../services/receptionistServices";

function SDashboard() {
  //get unassigned patients
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [fieldWorkerList, setFieldWorkerList] = useState([]);
  const [fieldWorkerID, setFieldWorkerID] = useState(null);
  const [assigned, setAssigned] = useState(false);
  const [reassignedFieldWorkerID, setReassignedFieldWorkerID] = useState(null);
  const [modalIndex, setModalIndex] = useState(-1);
  const [newModalIndex, setNewModalIndex] = useState(-1);
  const [modalIndexOnSearch, setModalIndexOnSearch] = useState(-1);
  const [searchedPatientList, setSearchedPatientList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async function getUnassignedPatientList() {
      try {
        const responseData = await getPatientList();
        const data = responseData.data;
        if (data) {
          setPatientList(data);
          console.log(data);
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
    try {
      const responseData = await assignFieldworker(pid, fieldWorkerID);
      const data = responseData.data;
      if (data) {
        console.log(data);
        toast.success(`Field Worker has been assigned`);
      } else {
        toast.error(`Unable to assign Field Worker`);
      }
      setAssigned((pv) => !assigned);
      closeSelectModal();
    } catch (error) {
      handleAuthentication(error.response, navigate, "/login");
    }
  }

  async function reassign(oldFieldWorkerID) {
    console.log(oldFieldWorkerID);
    console.log(reassignedFieldWorkerID);
    if (reassignedFieldWorkerID === null) {
      alert("Field worker not selected");
    } else {
      try {
        const responseData = await reassignFieldWorker(
          oldFieldWorkerID,
          reassignedFieldWorkerID
        );
        const data = responseData.data;
        if (data) {
          toast.success(`Field Worker has been reassigned`);
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

  async function reassignOnSearch(val, pid) {
    console.log(pid);
    try {
      const responseData = await assignFieldworker(
        pid,
        reassignedFieldWorkerID
      );
      const data = responseData.data;
      if (data) {
        console.log(data);
        toast.success(`Field Worker has been assigned`);
      } else {
        toast.error(`Unable to assign Field Worker`);
      }
      setAssigned((pv) => !assigned);
      closeModalOnSearch();
    } catch (error) {
      handleAuthentication(error.response, navigate, "/login");
    }
  }
  function openModal(index) {
    setModalIndex(index);
  }
  function closeModal() {
    setModalIndex(-1);
  }
  function openSelectModal(index) {
    setNewModalIndex(index);
  }
  function closeSelectModal() {
    setNewModalIndex(-1);
  }
  function openModalOnSearch(index) {
    setModalIndexOnSearch(index);
  }
  function closeModalOnSearch() {
    setModalIndexOnSearch(-1);
  }

  function dueVisit(event) {
    event.preventDefault();
    navigate("/visits-due-by-fieldworker");
  }
  function searchBarOnChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setSearchValue(value);

    // api call to get list
    if (value !== "") {
      (async function getSearchedPatientList() {
        try {
          const responseData = await searchPatient(value);
          let searchedPatientList = responseData.data;
          if (searchedPatientList) {
            console.log(searchedPatientList);
            setSearchedPatientList(searchedPatientList);
          }
        } catch (error) {
          handleAuthentication(error.response, navigate, "/login");
        }
      })();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
      }}
    >
      <div
        style={{
          flex: 2,
          height: "100vh",
          width: "300px",
          backgroundColor: "#516395",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button className="button2" onClick={dueVisit}>
          Due Visits
        </button>
      </div>

      <div
        style={{
          display: "flex",
          padding: "8px",
          flex: 10,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label className="tableHeading">
            Unassigned Patients: {patientList.length}
          </label>
          <div className="search">
            <TextField
              name="Patient Search"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              onChange={searchBarOnChange}
              placeholder="Search Patient by name or mobile number"
              value={searchValue}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <div
            className="table-wrapper"
            style={{
              flex: 1,
              marginRight: "4px",
              height: "100%",
              maxHeight: "700px",
              overflowY: "scroll",
              margin: "2px",
            }}
          >
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
              <tbody style={{ flex: "1" }}>
                {patientList.map((e, id) => {
                  return (
                    <tr key={id}>
                      <th>{e.name}</th>
                      <th>{e.age}</th>
                      <th>{e.gender}</th>
                      <td>
                        <div>
                          <button
                            onClick={() => {
                              openSelectModal(id);
                            }}
                          >
                            Assign
                          </button>
                          {newModalIndex === id && (
                            <SelectModal
                              key={id}
                              list={fieldWorkerList}
                              submitButton={assign}
                              buttonName={"ASSIGN"}
                              data={e}
                              closeModal={closeSelectModal}
                              handleOptionChange={handleChangeInFieldWorker}
                              heading={"Select Field Worker"}
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
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "4px",
              }}
            >
              <div
                className="table-wrapper"
                style={{
                  height: "100%",
                  maxHeight: "350px",
                  overflowY: "scroll",
                }}
              >
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                    </tr>
                  </tbody>
                  <tbody
                    style={{
                      flex: "1",
                    }}
                  >
                    {searchedPatientList
                      .filter((e, i) => {
                        return e.fieldworker !== null;
                      })
                      .map((e, i) => {
                        return (
                          <tr key={i}>
                            <th>{e.name}</th>
                            <th>{e.age}</th>
                            <th>{e.gender}</th>
                            <td>
                              <div>
                                <button
                                  onClick={() => {
                                    openModalOnSearch(i);
                                  }}
                                >
                                  Reassign Field Worker
                                </button>
                                {modalIndexOnSearch === i && (
                                  <Modal
                                    key={i}
                                    fieldWorkerList={fieldWorkerList}
                                    data={e.fieldworker}
                                    patientID={e.pid}
                                    reassign={reassignOnSearch}
                                    closeModal={closeModalOnSearch}
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
            <div>
              <div style={{ alignSelf: "flex-end" }}>
                <label className="tableHeading">Reassign Field Worker</label>
              </div>
              <div
                className="table-wrapper"
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                }}
              >
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
                  <tbody>
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
                                Reassign
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
      </div>
    </div>
  );
}
export default SDashboard;
