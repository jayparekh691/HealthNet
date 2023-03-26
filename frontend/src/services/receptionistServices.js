import axios from "axios";
const doctorListAPI = `http://localhost:9080/api/employee/get-all-doctors`;
const registerPatientAPI = `http://localhost:9080/api/patient/add-patient`;
const addPatientAppointmentAPI = (patientID, doctorID) =>
  `http://localhost:9080/api/appointment/add-appointment/${patientID}/${doctorID}`;
const getALLAppointmentAPI = `http://localhost:9080/api/appointment/get-all-appointments`;
const searchPatientAPI = (searchValue) =>
  `http://localhost:9080/api/patient/search-patient-receptionist/${searchValue}`;
const updatePatientAPI = (patientID) =>
  `http://localhost:9080/api/patient/update-patient/${patientID}`;

async function getDoctorList() {
  const responseData = await axios.get(doctorListAPI);
  return responseData;
}

async function registerPatient(patientData) {
  const responseData = await axios.post(registerPatientAPI, patientData);
  return responseData;
}

async function addPatientAppointment(patientID, doctorID) {
  const date = new Date();
  const curr_date = date.toISOString().split("T")[0]; // yyyy-mm-dd
  console.log(curr_date);
  console.log(patientID);
  const responseData = await axios.post(
    addPatientAppointmentAPI(patientID, doctorID),
    {
      curr_date: curr_date,
      is_treated: false,
    }
  );
  return responseData;
}

async function getAllPatientList() {
  const responseData = await axios.get(getALLAppointmentAPI);
  return responseData;
}

async function searchPatient(searchValue) {
  console.log(searchValue);
  const responseData = await axios.get(searchPatientAPI(searchValue));
  return responseData;
}

async function updatePatientDetails(patientID, updatedPatientData) {
  const responseData = await axios.post(
    updatePatientAPI(patientID),
    updatedPatientData
  );
  return responseData;
}

export {
  getDoctorList,
  registerPatient,
  addPatientAppointment,
  getAllPatientList,
  searchPatient,
  updatePatientDetails,
};
