import axios from "axios";

const getAllPatientWithDoctorIDAPI = (doctorID) =>
  `http://localhost:9080/api/doctor/get-all-appointments-of-doctor/${doctorID}`;
const writeDiagnosisAPI = (appointmentID) =>
  `http://localhost:9080/api/doctor/write-diagnostics/${appointmentID}`;

const writeFollowUpAPI = (appointmentID) =>
  `http://localhost:9080/api/doctor/write-follow-up/${appointmentID}`;

const searchedPatientListAPI = (doctorID, searchValue) =>
  `http://localhost:9080/api/doctor/search-patient-doctor/${doctorID}/${searchValue}`;

const patientMedicalHistoryAPI = (doctorID, patientID) =>
  `http://localhost:9080/api/doctor/view-patient-history/${doctorID}/${patientID}`;

const deactivateFollowUpAPI = (appointmentID) =>
  `http://localhost:9080/api/doctor/deactivate-followup/${appointmentID}`;

async function getAllPatients(doctorID) {
  const responseData = await axios.get(getAllPatientWithDoctorIDAPI(doctorID));
  return responseData;
}

async function writeDiagnosis(appointmentID, writtenData) {
  const responseData = await axios.post(
    writeDiagnosisAPI(appointmentID),
    writtenData
  );
  return responseData;
}

async function submitFollowUp(appointmentID, followUpDetails) {
  const responseData = await axios.post(
    writeFollowUpAPI(appointmentID),
    followUpDetails
  );
  return responseData;
}

async function getPatientList(doctorID, searchValue) {
  const responseData = await axios.get(
    searchedPatientListAPI(doctorID, searchValue)
  );
  return responseData;
}

async function getPatientHistory(doctorID, patientID) {
  const responseData = await axios.get(
    patientMedicalHistoryAPI(doctorID, patientID)
  );
  return responseData;
}

async function deactivateFollowUp(appointmentID) {
  const responseData = await axios.post(deactivateFollowUpAPI(appointmentID));
  return responseData;
}
export {
  getAllPatients,
  writeDiagnosis,
  submitFollowUp,
  getPatientList,
  getPatientHistory,
  deactivateFollowUp,
};
