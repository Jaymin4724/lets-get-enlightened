import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./Main.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ChallengeProvider } from "./context/ChallengeContext.jsx";
import { NavbarProvider } from "./context/NavbarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NavbarProvider>
          <ThemeProvider>
            <ChallengeProvider>
              <Toaster position="top-center" reverseOrder={false} />
              <Main />
            </ChallengeProvider>
          </ThemeProvider>
        </NavbarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
