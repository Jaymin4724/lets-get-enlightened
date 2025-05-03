import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isAdminLoggedIn")) || false;
  });
  const [userData, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem("userData")) || null;
  });

  const login = (data) => {
    setLoggedIn(true);
    setUserData(data);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  const logout = () => {
    setLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
  };

  const adminLogin = () => {
    setAdminLoggedIn(true);
    localStorage.setItem("isAdminLoggedIn", true);
  };

  const adminLogout = () => {
    setAdminLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [isLoggedIn, isAdminLoggedIn, userData]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        isLoggedIn,
        login,
        logout,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
