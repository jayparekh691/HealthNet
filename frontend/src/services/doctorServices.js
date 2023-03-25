import axios from "axios";

const getAllPatientWithDoctorIDAPI = (doctorID) =>
  `http://localhost:9080/api/doctor/get-all-appointments-of-doctor/${doctorID}`;
const writeDiagnosisAPI = (appointmentID) =>
  `http://localhost:9080/api/doctor/write-diagnostics/${appointmentID}`;

const writeFollowUpAPI = (appointmentID) =>
  `http://localhost:9080/api/doctor/write-follow-up/${appointmentID}`;

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

export { getAllPatients, writeDiagnosis, submitFollowUp };
