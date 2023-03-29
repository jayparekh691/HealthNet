import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getEmployeeList, deleteEmployee } from "../services/adminServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ADashboard() {
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

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
        const responseData = await getEmployeeList(value);
        let employeeList = responseData.data;
        if (employeeList) {
          console.log(employeeList);
          setEmployeeList(employeeList);
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
      const responseData = await deleteEmployee(e_id);
      console.log(responseData);
      toast.success(`Employee Deleted`);
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

  function assignFieldWorkers(event) {
    event.preventDefault();
    navigate("/supervisor-dashboard");
  }

  return (
    <div className="paddingPage">
      <div className="paddingPage ">
        <button onClick={addEmployee}>Add Employee</button>
        <button onClick={assignFieldWorkers}>Assign FieldWorkers</button>
      </div>
      <div className="search">
        <TextField
          name="Employee Search"
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          onChange={searchBarOnChange}
          value={searchName}
        />
      </div>
      {/* TODO: Change gender to display full form */}
      <div className="paddingPage">
        <table>
          <tbody>
            <tr>
              <th>Employee Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Email</th>
            </tr>
          </tbody>
          <tbody>
            {employeeList
              .filter((e) => {
                return e.deleted === false && e.role !== "Admin";
              })
              .map((e, i) => {
                return (
                  <tr key={i}>
                    <th>{e.e_id}</th>
                    <th>{e.name}</th>
                    <th>{e.gender}</th>
                    <th>{e.role}</th>
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
                      <button
                        className="button"
                        value={i}
                        onClick={(event) =>
                          onDeleteButtonClicked(event, e.e_id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ADashboard;
