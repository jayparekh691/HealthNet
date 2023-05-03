import axios from "axios";
import { getValueForKey } from "../utils/localStorage";
import { IP_ADDRESS } from "../utils/constants";

const getAllPatientWithDoctorIDAPI = (doctorID) =>
  `http://${IP_ADDRESS}/api/doctor/get-all-appointments-of-doctor/${doctorID}`;

const writeDiagnosisAPI = (appointmentID) =>
  `http://${IP_ADDRESS}/api/doctor/write-diagnostics/${appointmentID}`;

const writeFollowUpAPI = (appointmentID) =>
  `http://${IP_ADDRESS}/api/doctor/write-follow-up/${appointmentID}`;

const searchedPatientListAPI = (doctorID, searchValue) =>
  `http://${IP_ADDRESS}/api/doctor/search-patient-doctor/${doctorID}/${searchValue}`;

const patientMedicalHistoryAPI = (doctorID, patientID) =>
  `http://${IP_ADDRESS}/api/doctor/view-patient-history/${doctorID}/${patientID}`;

const deactivateFollowUpAPI = (appointmentID) =>
  `http://${IP_ADDRESS}/api/doctor/deactivate-followup/${appointmentID}`;

const newVisitListAPI = (doctorID) =>
  `http://${IP_ADDRESS}/api/doctor/get-unseen-list/${doctorID}`;

const markSeenByDoctorAPI = (visitID) =>
  `http://${IP_ADDRESS}/api/doctor/set-visit-as-seen/${visitID}`;

async function getAllPatients(doctorID) {
  const responseData = await axios.get(getAllPatientWithDoctorIDAPI(doctorID), {
    headers: { Authorization: `Bearer ${getValueForKey("token")}` },
  });
  return responseData;
}

async function writeDiagnosis(appointmentID, writtenData) {
  const responseData = await axios.post(
    writeDiagnosisAPI(appointmentID),
    writtenData,
    {
      headers: { Authorization: `Bearer ${getValueForKey("token")}` },
    }
  );
  return responseData;
}

async function submitFollowUp(appointmentID, followUpDetails) {
  const responseData = await axios.post(
    writeFollowUpAPI(appointmentID),
    followUpDetails,
    {
      headers: { Authorization: `Bearer ${getValueForKey("token")}` },
    }
  );
  return responseData;
}

async function getPatientList(doctorID, searchValue) {
  const responseData = await axios.get(
    searchedPatientListAPI(doctorID, searchValue),
    {
      headers: { Authorization: `Bearer ${getValueForKey("token")}` },
    }
  );
  return responseData;
}

async function getPatientHistory(doctorID, patientID) {
  const responseData = await axios.get(
    patientMedicalHistoryAPI(doctorID, patientID),
    {
      headers: { Authorization: `Bearer ${getValueForKey("token")}` },
    }
  );
  return responseData;
}

async function deactivateFollowUp(appointmentID) {
  const responseData = await axios.get(deactivateFollowUpAPI(appointmentID), {
    headers: { Authorization: `Bearer ${getValueForKey("token")}` },
  });
  return responseData;
}

async function getNewVisitRecords(doctorID) {
  const responseData = await axios.get(newVisitListAPI(doctorID), {
    headers: { Authorization: `Bearer ${getValueForKey("token")}` },
  });
  return responseData;
}

async function markSeenByDoctor(visitID) {
  const responseData = await axios.get(markSeenByDoctorAPI(visitID), {
    headers: { Authorization: `Bearer ${getValueForKey("token")}` },
  });
  return responseData;
}
export {
  getAllPatients,
  writeDiagnosis,
  submitFollowUp,
  getPatientList,
  getPatientHistory,
  deactivateFollowUp,
  getNewVisitRecords,
  markSeenByDoctor,
};
