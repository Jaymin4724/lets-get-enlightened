import React, { useState, useContext } from "react";
import "./LoginPage.css";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../components/loginpage/LoginFormComp";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const themeContext = useContext(ThemeContext);
  const { adminLogin, login } = useContext(AuthContext); // Use login from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error("All fields are required!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
      return;
    }

    if (password.length < 8) {
      toast.error("Password should contain at least 8 characters!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
      return;
    }

    if (email === "admin123@gmail.com" && password === "admin123") {
      toast.success("Admin login successful!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
      adminLogin(); // Call adminLogin for admin users
      navigate("/admin/dashboard");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success(`User login successful!`, {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });

        // Call login with user data to persist it
        login(response.data); // Pass the user data to the login function
        navigate("/"); // Navigate to the home page
      }
    } catch (error) {
      toast.error("Email address not found!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
    }
  };

  return (
    <div className={`LoginParent ${themeContext.theme}`}>
      <div className={`LoginContainer ${themeContext.theme}`}>
        <h2 className="LoginHeading">
          Welcome to a Journey of <br /> Serenity and Self-discovery.
        </h2>
        <p style={{ textAlign: "center" }}>
          Don't have an account?&nbsp;
          <NavLink className="RegisterLine" to="/registration">
            Register
          </NavLink>
        </p>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        <p style={{ textAlign: "center" }}>
          <NavLink className="ForgotPassword" to="/forgotpassword">
            Forgot Password
          </NavLink>
        </p>
        <button className="SigninButton" onClick={handleSignIn}>
          Sign in
        </button>
      </div>
    </div>
  );
}
