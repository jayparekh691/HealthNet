import React, { useState } from "react";
export const AppStateContext = React.createContext();

function AppStateProvider({ children }) {
  const [isBackground, setIsBackground] = useState(false);
  const [isMediaActive, setIsMediaActive] = useState("false");
  return (
    <AppStateContext.Provider
      value={{
        isBackgroundState: [isBackground, setIsBackground],
        isMediaActiveState: [isMediaActive, setIsMediaActive],
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export default AppStateProvider;
