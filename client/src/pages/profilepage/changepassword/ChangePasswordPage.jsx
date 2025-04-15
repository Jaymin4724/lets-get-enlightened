import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileMiddleComp from "../../../components/profilepage/ProfileMiddleComp";
import "./ChangePasswordPage.css";
import { ThemeContext } from "../../../context/ThemeContext";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

export default function ChangePasswordPage() {
  const themeContext = useContext(ThemeContext);
  const { userData, setUserData } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const toggleShowPassword = (passwordType) => {
    switch (passwordType) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All fields are required!");
      return false;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password should be at least 8 characters long!");
      return false;
    }

    if (currentPassword === newPassword) {
      setErrorMessage(
        "Current password and new password must not be the same!"
      );
      return false;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password must be the same!");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSavePassword = async () => {
    if (validateForm()) {
      try {
        if (userData.password === currentPassword) {
          const updatedUserData = { ...userData, password: newPassword };
          await axios.put(`http://localhost:8000/api/editProfile/${userData._id}`, updatedUserData);
          setUserData(updatedUserData); // Update userData in AuthContext
          toast.success("Password saved successfully!", {
            duration: 3000,
            position: "top-center",
            style: {
              backgroundColor: "#333",
              color: "white",
            },
          });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setShowCurrentPassword(false);
          setShowNewPassword(false);
          setShowConfirmPassword(false);
          navigate("/");
        } else {
          setErrorMessage("Current password is incorrect!");
        }
      } catch (error) {
        console.error("Error changing password:", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <ProfileMiddleComp>
        <div className={`ChangePassword ${themeContext.theme}`}>
          <div className={`ChangePasswordContainer  ${themeContext.theme}`}>
            <p>Change Password</p>

            <div className="ChangePasswordInputContainer">
              <input
                placeholder="Current Password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <span
                className="LoginTogglePassword"
                onClick={() => toggleShowPassword("current")}
              >
                {showCurrentPassword ? "Hide" : "Show"}
              </span>
            </div>

            <div className="ChangePasswordInputContainer">
              <input
                placeholder="New Password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                className="LoginTogglePassword"
                onClick={() => toggleShowPassword("new")}
              >
                {showNewPassword ? "Hide" : "Show"}
              </span>
            </div>

            <div className="ChangePasswordInputContainer">
              <input
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="LoginTogglePassword"
                onClick={() => toggleShowPassword("confirm")}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>
            <div className="ErrorMessage">{errorMessage}</div>
            <button onClick={handleSavePassword}>Change Password</button>
          </div>
        </div>
      </ProfileMiddleComp>
    </>
  );
}
