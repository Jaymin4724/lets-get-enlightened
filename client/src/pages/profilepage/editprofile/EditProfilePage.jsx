import React, { useContext, useState } from "react";
import ProfileMiddleComp from "../../../components/profilepage/ProfileMiddleComp";
import "./EditProfilePage.css";
import { ThemeContext } from "../../../context/ThemeContext";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function EditProfile() {
  const themeContext = useContext(ThemeContext);
  const { userData, setUserData } = useContext(AuthContext);
  const id = userData?._id || "";
  const [firstName, setFirstName] = useState(userData?.fname || "");
  const [lastName, setLastName] = useState(userData?.lname || "");
  const email = userData?.email || "";
  const [dob, setDob] = useState(userData?.dob || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id).then(() => {
      toast.success("ID copied to clipboard!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
    });
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setIsDisabled(!isDisabled);
  };

  const handleSaveChanges = () => {
    if (!firstName || !lastName || !email || !dob || !gender) {
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

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      toast.error("First name and last name should contain alphabets only!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
      return;
    }

    const today = new Date();
    const fiveYearsAgo = new Date(
      today.getFullYear() - 5,
      today.getMonth(),
      today.getDate()
    );

    if (new Date(dob) > fiveYearsAgo) {
      toast.error("Meditator must be at least 5 years old!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
      return;
    }

    const updatedUserData = {
      fname: firstName,
      lname: lastName,
      dob: dob,
      gender: gender,
    };
    axios
      .put(
        `http://localhost:8000/api/editProfile/${userData._id}`,
        updatedUserData
      )
      .then((response) => {
        toast.success("Profile updated successfully!", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });
        setIsEditMode(false);
        setIsDisabled(true);
        setUserData({ ...userData, ...updatedUserData });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Failed to update profile. Please try again later.", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });
        setIsEditMode(false);
        setIsDisabled(true);
      });
  };

  return (
    <ProfileMiddleComp>
      <div className={`EditProfile ${themeContext.theme}`}>
        <div className={`EditProfileHeading ${themeContext.theme}`}>
          <h1>Edit Profile</h1>
        </div>

        <div className="EditProfileForm">
          <div className={`EditProfileInputBox ${themeContext.theme}`}>
            <label>ID : </label>
            <input type="text" value={id} disabled />
            <FontAwesomeIcon
              icon={faCopy}
              style={{ paddingLeft: "20px", cursor: "pointer" }}
              onClick={copyToClipboard}
            />
          </div>
          <div className={`EditProfileInputBox ${themeContext.theme}`}>
            <label>First Name : </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className={`EditProfileInputBox ${themeContext.theme}`}>
            <label>Last Name : </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className={`EditProfileInputBox ${themeContext.theme}`}>
            <label>Email : </label>
            <input type="text" value={email} disabled />
          </div>
          <div className={`EditProfileInputBox ${themeContext.theme}`}>
            <label>Date of Birth : </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className={`EditProfileInputBox ${themeContext.theme}`}>
            <label>Gender : </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={isDisabled}
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="SaveEditButtonContainer">
            <button
              className={`SaveEditButton ${themeContext.theme}`}
              onClick={isEditMode ? handleSaveChanges : handleEditClick}
            >
              {isEditMode ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </ProfileMiddleComp>
  );
}
