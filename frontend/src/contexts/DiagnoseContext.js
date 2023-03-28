import React, { useState } from "react";
export const DiagnoseContext = React.createContext({});

export const resetDiagnoseData = {
  diagnosis: "",
  remarks: "",
  prescription: "",
};

export function DiagnoseProvider({ children }) {
  const [writtenData, setWrittenData] = useState(resetDiagnoseData);
  return (
    <DiagnoseContext.Provider value={[writtenData, setWrittenData]}>
      {children}
    </DiagnoseContext.Provider>
  );
}
export default DiagnoseProvider;
