import axios from "axios";
const registerEmployeeAPI = `http://localhost:9080/api/supervisor/create-employee/`;
const getEmployeeListByNameAPI = (searchName) =>
  `http://localhost:9080/api/supervisor/search-employee/${searchName}`;
const deleteEmployeeByIdAPI = (employee_Id) =>
  `http://localhost:9080/api/supervisor/delete-employee/${employee_Id}`;

const updateEmployeeAPI = (e_id) =>
  `http://localhost:9080/api/supervisor/update-employee/${e_id}`;

async function registerEmployee(employeeData) {
  const responseData = await axios.post(registerEmployeeAPI, employeeData);
  return responseData;
}

async function getEmployeeList(searchName) {
  const responseData = await axios.get(getEmployeeListByNameAPI(searchName));
  return responseData;
}

async function deleteEmployee(employee_Id) {
  const responseData = await axios.delete(deleteEmployeeByIdAPI(employee_Id));
  return responseData;
}

async function updateEmployee(e_id, updatedEmployeeData) {
  const responseData = await axios.post(
    updateEmployeeAPI(e_id),
    updatedEmployeeData
  );
  return responseData;
}

export { getEmployeeList, registerEmployee, deleteEmployee, updateEmployee };
