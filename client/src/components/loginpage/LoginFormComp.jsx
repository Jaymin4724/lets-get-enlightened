import React from "react";
import "./LoginFormComp.css";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
}) {
  return (
    <div className="LoginForm">
      <label>Email</label>
      <input
        className="LoginInputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <div className="LoginPasswordInputContainer">
        <input
          className="LoginInputBox"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="LoginTogglePassword" onClick={toggleShowPassword}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
    </div>
  );
}
