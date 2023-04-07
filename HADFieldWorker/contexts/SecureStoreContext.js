import React, { useState } from "react";
import { getValueFor } from "../utils/util";
export const SecureStoreContext = React.createContext();

function SecureStoreProvider({ children }) {
  const [pin, setPin] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  return (
    <SecureStoreContext.Provider
      value={[pin, setPin, isAuthenticating, setIsAuthenticating]}
    >
      {children}
    </SecureStoreContext.Provider>
  );
}

export default SecureStoreProvider;
