import axios from "axios";

const getAllPatientWithDoctorIDAPI = (doctorID) =>
  `http://localhost:9080/api/appointment/get-all-appointments-of-doctor/${doctorID}`;

async function getAllPatients(doctorID) {
  const responseData = await axios.get(getAllPatientWithDoctorIDAPI(doctorID));
  return responseData;
}

export { getAllPatients };
