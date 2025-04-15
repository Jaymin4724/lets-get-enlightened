import React from "react";
import "./RegistrationFormComp.css";

const RegistrationForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  dob,
  setDob,
  gender,
  setGender,
}) => {
  return (
    <div className="RegistrationForm">
      <div className="RegisterInputContainerParent">
        <div className="RegisterInputContainer">
          <label>First Name</label>
          <input
            className="RegisterInputBox"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="RegisterInputContainer">
          <label>Last Name</label>
          <input
            className="RegisterInputBox"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="RegisterInputContainer">
        <label>Email</label>
        <input
          className="RegisterInputBox"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="RegisterInputContainer">
        <label>Password</label>
        <div className="PasswordInputContainer">
          <input
            className="RegisterInputBox"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="TogglePassword" onClick={toggleShowPassword}>
            {" "}
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
      </div>

      <div className="RegisterInputContainerParent">
        <div className="RegisterInputContainer">
          <label>Date of Birth</label>
          <input
            className="RegisterInputBox"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{ paddingRight: "10px" }}
          />
        </div>

        <div className="RegisterInputContainer">
          <label className="RegisterTextLabel">Gender</label>
          <select
            className="RegisterInputBox"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled hidden>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
