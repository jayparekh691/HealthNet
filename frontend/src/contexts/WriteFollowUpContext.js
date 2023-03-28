import React, { useState } from "react";
export const WriteFollowUpContext = React.createContext({});

export const resetFollowupData = {
  instructions: "",
  numberOfFollowup: "",
  secheduleCount: "",
  scheduleType: "Weekly",
};

export function WriteFollowUpProvider({ children }) {
  const [followUpDetails, setFollowUpDetails] = useState(resetFollowupData);

  return (
    <WriteFollowUpContext.Provider
      value={[followUpDetails, setFollowUpDetails]}
    >
      {children}
    </WriteFollowUpContext.Provider>
  );
}
export default WriteFollowUpProvider;
