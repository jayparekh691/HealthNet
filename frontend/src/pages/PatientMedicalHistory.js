import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPatientHistory } from "../services/doctorServices";

function PatientMedicalHistory() {
  const state = useLocation().state;
  const navigate = useNavigate();
  //   const [pid, setPid] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    // setPid(state.pid);
    (async function getPatientMedicalHistory() {
      const responseData = await getPatientHistory(state.pid);
      const data = responseData.data;
      if (data) {
        setPatientHistory(data);
      }
    })();
  }, [state.pid]);

  return <div></div>;
}
export default PatientMedicalHistory;
