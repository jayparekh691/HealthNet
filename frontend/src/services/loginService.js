import axios from "axios";
const loginAPI = `http://localhost:9080/api/employee/login`;

async function login(loginData) {
  const responseData = await axios.post(loginAPI, loginData);
  return responseData;
}

export default login;
