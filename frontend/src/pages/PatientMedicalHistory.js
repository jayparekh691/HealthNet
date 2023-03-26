import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPatientHistory } from "../services/doctorServices";

function PatientMedicalHistory() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    (async function getPatientMedicalHistory() {
      const responseData = await getPatientHistory(state.d_id, state.p_id);
      const data = responseData.data;
      if (data) {
        setPatientHistory(data);
      }
    })();
  }, [state.p_id, state.d_id]);

  return <div></div>;
}
export default PatientMedicalHistory;
