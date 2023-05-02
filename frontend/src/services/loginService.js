import axios from "axios";
import { setKey } from "../utils/localStorage";
import { IP_ADDRESS } from "../utils/constants";

const loginAPI = `http://${IP_ADDRESS}/api/employee/login`;

const updatePasswordAPI = (employeeId) =>
  `http://${IP_ADDRESS}/api/employee/update-password/${employeeId}`;

const forgotPasswordAPI = (email) =>
  `http://${IP_ADDRESS}/api/employee/forgot-password/${email}`;

async function login(loginData) {
  const responseData = await axios.post(loginAPI, loginData);
  if (responseData.data) {
    console.log(responseData.data.token);
    setKey("token", responseData.data.token);
  }
  return responseData;
}

async function forgotPassword(email) {
  const responseData = await axios.post(forgotPasswordAPI(email));
  return responseData;
}

async function updatePassword(employeeId, passwordObj) {
  const responseData = await axios.post(
    updatePasswordAPI(employeeId),
    passwordObj
  );
  return responseData;
}

export { login, forgotPassword, updatePassword };
