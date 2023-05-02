import axios from "axios";
import { getValueForKey } from "../utils/localStorage";
import { IP_ADDRESS } from "../utils/constants";

const unassignedPatientListAPI = `http://${IP_ADDRESS}/api/supervisor/get-valid-patients/`;

const fieldWorkerListAPI = `http://${IP_ADDRESS}/api/supervisor/get-fieldworker-list/`;

const assignFieldworkerAPI = (patientID, fieldWorkerID) =>
  `http://${IP_ADDRESS}/api/supervisor/assign-fieldworker/${patientID}/${fieldWorkerID}`;

const reassignFieldworkerAPI = (oldFieldWorkerID, reassignedFieldWorkerID) =>
  `http://${IP_ADDRESS}/api/supervisor/reassign-fieldworker/${oldFieldWorkerID}/${reassignedFieldWorkerID}`;

const dueVisitsByFieldWorkerAPI = `http://${IP_ADDRESS}/api/supervisor/due-visits`;

const reassignFieldworkerChangeDueDateAPI = (patientID, newFieldWorkerID) =>
  `http://${IP_ADDRESS}/api/supervisor/reassign-field-worker-pid/${patientID}/${newFieldWorkerID}`;

async function getPatientList() {
  const responseData = await axios.get(unassignedPatientListAPI, {
    headers: { Authorization: `Bearer ${getValueForKey("token")}` },
  });
  return responseData;
}

async function getFieldworkerList() {
  const responseData = await axios.get(fieldWorkerListAPI, {
    headers: { Authorization: `Bearer ${getValueForKey("token")}` },
  });
  return responseData;
}

async function assignFieldworker(patientID, fieldWorkerID) {
  const responseData = await axios.get(
    assignFieldworkerAPI(patientID, fieldWorkerID),
    {
      headers: { Authorization: `Bearer ${getValueForKey("token")}` },
    }
  );
  return responseData;
}

async function reassignFieldWorker(oldFieldWorkerID, reassignedFieldWorkerID) {
  const responseData = await axios.get(
    reassignFieldworkerAPI(oldFieldWorkerID, reassignedFieldWorkerID),
    {
      headers: { Authorization: `Bearer ${getValueForKey("token")}` },
    }
  );
  return responseData;
}

async function dueVisits() {
  const responseData = await axios.get(dueVisitsByFieldWorkerAPI, {
    headers: { Authorization: `Bearer ${getValueForKey("token")}` },
  });
  return responseData;
}

async function reassignFieldworkerAndDueDate(patientID, newFieldWorkerID) {
  const responseData = await axios.get(
    reassignFieldworkerChangeDueDateAPI(patientID, newFieldWorkerID),
    {
      headers: { Authorization: `Bearer ${getValueForKey("token")}` },
    }
  );
  return responseData;
}

export {
  getPatientList,
  getFieldworkerList,
  assignFieldworker,
  reassignFieldWorker,
  dueVisits,
  reassignFieldworkerAndDueDate,
};
