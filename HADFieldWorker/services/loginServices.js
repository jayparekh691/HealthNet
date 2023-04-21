import axios from "axios";
import { IP_ADDRESS } from "../utils/Constants";
import { save } from "../utils/util";
const loginAPI = IP_ADDRESS + "/api/employee/login";

async function login(loginData) {
  const responseData = await axios.post(loginAPI, loginData);
  if (responseData.data) {
    save("token", `Bearer ${responseData.data.token}`);
  }
  return responseData;
}

export { login };
