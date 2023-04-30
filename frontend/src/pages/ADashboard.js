import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { getEmployeeList, deleteEmployee } from "../services/adminServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleAuthentication } from "../utils/authentication";
import { logout } from "../utils/authentication";
import ConfirmModal from "../components/ConfirmModal";
import { getValueForKey } from "../utils/localStorage";

function ADashboard() {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [searchName, setSearchName] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [adminId, setAdminId] = useState(null);
  // const [deleted, setDeleted] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (getValueForKey("token") === null) {
      navigate("/login");
    }

    if (state === null) {
      navigate("/login");
    }

    if (state !== null) {
      setAdminId(state.a_id);
    }
  }, [state.a_id, navigate, state]);

  function addEmployee() {
    navigate("/employee-registration");
  }

  function searchBarOnChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setSearchName(value);
    // api call to get list
    if (value !== "") {
      (async function getEmployees() {
        try {
          const responseData = await getEmployeeList(value);
          let employeeList = responseData.data;
          if (employeeList) {
            console.log(employeeList);
            setEmployeeList(employeeList);
          }
        } catch (error) {
          handleAuthentication(error.response, navigate, "/login", toast);
        }
      })();
    }
  }

  function onUpdateButtonClicked(e) {
    navigate("/update-employee-details", {
      state: {
        employeeObj: e,
      },
    });
  }

  function onDeleteButtonClicked(event, e_id) {
    console.log(event.target.value);

    (async function deleteEmployeeById() {
      try {
        const responseData = await deleteEmployee(e_id);
        console.log(responseData);
        toast.success(`Employee Deleted`);
        // setDeleted((pv) => !deleted);
      } catch (error) {
        handleAuthentication(error.response, navigate, "/login", toast);
      }
    })();

    const index = Number(event.target.value);
    setEmployeeList((list) => {
      let filteredList = list.filter((_, i) => {
        return i !== index;
      });
      console.log(filteredList);
      return [...filteredList];
    });
  }

  function updatePassword(event) {
    event.preventDefault();
    navigate("/update-password", {
      state: {
        employeeId: adminId,
      },
    });
  }

  function assignFieldWorkers(event) {
    event.preventDefault();
    navigate("/supervisor-dashboard");
  }

  function openConfirmModal() {
    setModal(true);
  }
  function closeConfirmModal() {
    setModal(false);
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
        <button className="button2" onClick={updatePassword}>
          Update Profile
        </button>
        <button className="button2" onClick={addEmployee}>
          Add Employee
        </button>
        <button className="button2" onClick={assignFieldWorkers}>
          Assign FieldWorkers
        </button>
        <button
          className="button2"
          onClick={() => {
            openConfirmModal();
          }}
        >
          Logout
        </button>
        {modal && (
          <ConfirmModal
            onSubmit={logout}
            param1={navigate}
            param2={"/login"}
            closeModal={closeConfirmModal}
            submitText={"Logout"}
          />
        )}
      </div>

      <div className="paddingPage" style={{ flex: 10 }}>
        <div className="search">
          <TextField
            name="Employee Search"
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search employees"
            placeholder="Search for registered employees by name"
            onChange={searchBarOnChange}
            value={searchName}
          />
        </div>
        {/* TODO: Change gender to display full form */}
        <div
          style={{
            width: "100%",
            maxHeight: "700px",
            overflowY: "scroll",
          }}
        >
          <table>
            <tbody>
              <tr>
                <th>E_Id</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Email</th>
              </tr>
            </tbody>
            <tbody style={{}}>
              {employeeList
                .filter((e) => {
                  return e.deleted === false;
                })
                .map((e, i) => {
                  return (
                    <tr key={i}>
                      <th>{e.e_id}</th>
                      <th>{e.name}</th>
                      <th>{e.gender}</th>
                      <th>{e.roles}</th>
                      <th>{e.email}</th>
                      <td>
                        <button
                          className="button"
                          value={i}
                          onClick={() => onUpdateButtonClicked(e)}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        {e.roles !== "Admin" && (
                          <button
                            className="button"
                            value={i}
                            onClick={(event) =>
                              onDeleteButtonClicked(event, e.e_id)
                            }
                          >
                            Delete
                          </button>
                        )}
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

export default ADashboard;
