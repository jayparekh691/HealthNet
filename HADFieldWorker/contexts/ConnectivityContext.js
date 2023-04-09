import React, { useState } from "react";
export const ConnectivityContext = React.createContext();

function ConnectivityContextProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <ConnectivityContext.Provider
      value={{ isConnectedState: [isConnected, setIsConnected] }}
    >
      {children}
    </ConnectivityContext.Provider>
  );
}

export default ConnectivityContextProvider;
