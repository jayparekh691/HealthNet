import React, { useState } from "react";
import { getValueFor } from "../utils/Util";
export const SecureStoreContext = React.createContext();

function SecureStoreProvider({ children }) {
  const [pin, setPin] = useState(null);

  return (
    <SecureStoreContext.Provider
      value={{
        pinState: [pin, setPin],
      }}
    >
      {children}
    </SecureStoreContext.Provider>
  );
}

export default SecureStoreProvider;
