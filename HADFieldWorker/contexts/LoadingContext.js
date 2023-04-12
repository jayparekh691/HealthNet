import React, { useState } from "react";
export const LoadingContext = React.createContext();

function LoadingProvider({ children }) {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{
        isLoginLoadingState: [isLoginLoading, setIsLoginLoading],
        isDashboardLoadingState: [isDashboardLoading, setIsDashboardLoading],
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
