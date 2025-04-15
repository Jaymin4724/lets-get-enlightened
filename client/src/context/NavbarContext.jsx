import React, { createContext, useState } from "react";

const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <NavbarContext.Provider value={{ isNavbarVisible, setIsNavbarVisible }}>
      {children}
    </NavbarContext.Provider>
  );
};

export { NavbarProvider, NavbarContext };
