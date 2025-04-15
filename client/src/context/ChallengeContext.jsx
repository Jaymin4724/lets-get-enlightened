// ChallengeContext.js

import React, { createContext, useState } from "react";

// Create a new context
const ChallengeContext = createContext();

const ChallengeProvider = ({ children }) => {
  const [challengeStatus, setChallengeStatus] = useState(false);
  const [challengeCount, setChallangeCount] = useState(null);
  return (
    <ChallengeContext.Provider
      value={{
        challengeStatus,
        setChallengeStatus,
        challengeCount,
        setChallangeCount,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export { ChallengeProvider, ChallengeContext };
