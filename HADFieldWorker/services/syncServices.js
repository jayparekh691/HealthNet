import axios from "axios";
import { IP_ADDRESS } from "../utils/Constants";
import NetInfo from "@react-native-community/netinfo";
import { log } from "react-native-reanimated";
import { getValueFor } from "../utils/Util";

const getAppointmentListAPI = (id) =>
  IP_ADDRESS + `/api/fieldworker/get-appointmentList-fieldWorker/${id}`;

const removeVisitListAPI = (fid) =>
  IP_ADDRESS + `/api/fieldworker/remove-appointmentList-fieldWorker/${fid}`;

const medicalDataAPI = IP_ADDRESS + "/api/fieldworker/save-visit";

async function getAppointmentList(id) {
  const responseData = await axios.get(getAppointmentListAPI(id), {
    headers: {
      Authorization: await getValueFor("token"),
    },
  });
  return responseData;
}

async function sendMedicalData(medicalData) {
  const responseData = await axios.post(medicalDataAPI, medicalData, {
    headers: {
      Authorization: await getValueFor("token"),
    },
  });
  return responseData;
}

async function removeVisitList(fid) {
  const responseData = await axios.get(removeVisitListAPI(fid), {
    headers: {
      Authorization: await getValueFor("token"),
    },
  });
  return responseData;
}

export { getAppointmentList, sendMedicalData, removeVisitList };
