import axios from "axios";
import { IP_ADDRESS } from "../utils/Constants";
const getAppointmentListAPI = (id) =>
  IP_ADDRESS + `/api/fieldworker/get-appointmentList-fieldWorker/${id}`;

const medicalDataAPI = IP_ADDRESS + "/api/fieldworker/save-visit";

async function getAppointmentList(id) {
  const responseData = await axios.get(getAppointmentListAPI(id));
  return responseData;
}

async function sendMedicalData(medicalData) {
  const responseData = await axios.post(medicalDataAPI, medicalData);
  return responseData;
}

export { getAppointmentList, sendMedicalData };
