import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // Add userData state

  const login = (data) => {
    setLoggedIn(true);
    setUserData(data); // Set user data when logging in
  };

  const logout = () => {
    setLoggedIn(false);
    setUserData(null); // Clear user data when logging out
  };

  const adminLogin = () => {
    setAdminLoggedIn(true);
  };

  const adminLogout = () => {
    setAdminLoggedIn(false);
  };

  useEffect(() => {
    console.log("userData:", userData);
  }, [userData]); // Log userData whenever it changes

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        isLoggedIn,
        login,
        logout,
        userData, // Add userData to the context value
        setUserData, // Add setUserData to the context value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
