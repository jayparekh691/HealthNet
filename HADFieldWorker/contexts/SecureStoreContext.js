import React, { useState } from "react";
import { getValueFor, updateSyncTime } from "../utils/Util";
export const SecureStoreContext = React.createContext();

function SecureStoreProvider({ children }) {
  const [pin, setPin] = useState(null);
  const [syncDate, setSyncDate] = useState(null);

  return (
    <SecureStoreContext.Provider
      value={{
        pinState: [pin, setPin],
        syncDateState: [syncDate, setSyncDate],
      }}
    >
      {children}
    </SecureStoreContext.Provider>
  );
}

export default SecureStoreProvider;
