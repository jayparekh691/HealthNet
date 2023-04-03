import React, { useEffect, useState } from "react";
import { dueVisits } from "../services/supervisorServices";

function VisitsDueByFieldWorker() {
  const [dueVisitList, setDueVisitList] = useState([]);
  useEffect(() => {
    (async function getDueVisitList() {
      const responseData = await dueVisits();
      const data = responseData.data;
      if (data) {
        setDueVisitList(data);
      }
    })();
  }, []);
  return <div></div>;
}
export default VisitsDueByFieldWorker;
