import axios from "axios";
const registerEmployeeAPI = `http://localhost:9080/api/employee/create-employee/`;

async function registerEmployee(employeeData) {
  const responseData = await axios.post(registerEmployeeAPI, employeeData);
  return responseData;
}

export { registerEmployee };
