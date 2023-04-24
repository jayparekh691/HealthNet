import axios from "axios";
import { IP_ADDRESS } from "../utils/Constants";
import { save } from "../utils/util";

const loginAPI = IP_ADDRESS + "/api/employee/login";

const forgotPasswordAPI = (email) =>
  IP_ADDRESS + `/api/employee/forgot-password/${email}`;

const updatePasswordAPI = (employeeID) =>
  IP_ADDRESS + `/api/employee/update-password/${employeeID}`;

async function login(loginData) {
  const responseData = await axios.post(loginAPI, loginData);
  if (responseData.data) {
    await save("token", `Bearer ${responseData.data.token}`);
  }
  return responseData;
}

async function forgotPassword(email) {
  const responseData = await axios.post(forgotPasswordAPI(email));
  return responseData;
}

async function updatePassword(employeeID, data) {
  console.log(data.confirmPassword, data.newPassword);
  const responseData = await axios.post(updatePasswordAPI(employeeID), {
    old_pass: data.oldPassword,
    new_pass: data.newPassword,
  });
  return responseData;
}

export { login, forgotPassword, updatePassword };
