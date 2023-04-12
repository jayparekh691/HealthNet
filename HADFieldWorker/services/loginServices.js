import axios from "axios";
import { IP_ADDRESS } from "../utils/Constants";
const loginAPI = IP_ADDRESS + "/api/employee/login";

async function login(loginData) {
  const responseData = await axios.post(loginAPI, loginData);
  return responseData;
}

export { login };
