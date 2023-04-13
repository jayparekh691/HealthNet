import axios from "axios";
import { IP_ADDRESS } from "../utils/Constants";
import NetInfo from "@react-native-community/netinfo";
import { log } from "react-native-reanimated";

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

function connection(isConnected, setIsConnected) {
  NetInfo.addEventListener((state) => {
    if (isConnected != state.isInternetReachable) {
      console.log("internet connection: ", state.isInternetReachable);
      setIsConnected(state.isInternetReachable);
    }
  });
}

export { getAppointmentList, sendMedicalData, connection };
