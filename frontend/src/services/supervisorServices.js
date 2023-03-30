import axios from "axios";

const unassignedPatientListAPI = `http://localhost:9080/api/supervisor/get-valid-patients/`;

const fieldWorkerListAPI = `http://localhost:9080/api/supervisor/get-fieldworker-list/`;

const assignFieldworkerAPI = (patientID, fieldWorkerID) =>
  `http://localhost:9080/api/supervisor/assign-fieldworker/${patientID}/${fieldWorkerID}`;

const reassignFieldworkerAPI = (oldFieldWorkerID, reassignedFieldWorkerID) =>
  `http://localhost:9080/api/supervisor/reassign-fieldworker/${oldFieldWorkerID}/${reassignedFieldWorkerID}`;

async function getPatientList() {
  const responseData = await axios.get(unassignedPatientListAPI);
  return responseData;
}

async function getFieldworkerList() {
  const responseData = await axios.get(fieldWorkerListAPI);
  return responseData;
}

async function assignFieldworker(patientID, fieldWorkerID) {
  const responseData = await axios.post(
    assignFieldworkerAPI(patientID, fieldWorkerID)
  );
  return responseData;
}

async function reassignFieldWorker(oldFieldWorkerID, reassignedFieldWorkerID) {
  const responseData = await axios.get(
    reassignFieldworkerAPI(oldFieldWorkerID, reassignedFieldWorkerID)
  );
  return responseData;
}

export {
  getPatientList,
  getFieldworkerList,
  assignFieldworker,
  reassignFieldWorker,
};
