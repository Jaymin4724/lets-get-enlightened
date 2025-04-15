import React, { useContext, useState } from "react";
import "./ForgotPasswordPage.css";
import { ThemeContext } from "../../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import axios from "axios"; // Import Axios for API integration

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState("ForgotPassword");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");
  // const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
  const [otp, setOtp] = useState("");
  // const [okEmail, setOkEmail] = useState("")

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleVerificationCodeChange = (e) => {
    const newVerificationCode = e.target.value;
    setVerificationCode(newVerificationCode);
    setVerificationCodeError("");
  };

  const handleSendEmailClick = async () => {
    // Validation for email before proceeding
    if (!email || emailError !== "") {
      setEmailError("Enter a valid email address");
      return;
    }

    // Your logic to send an email and change the step
    try {
      const response = await axios.post(
        "http://localhost:8000/api/email/sendEmail",
        { email }
      ); // Send email to the user
      if (response.status === 200) {
        // setOtpSent(true);
        console.log(response.data);
        // setOkEmail(response.data.email)
        setOtp(response.data.otp);
        setCurrentStep("Otp");
      } else {
        toast.error("Failed to send OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Failed to send email: ", error);
      toast.error("Failed to send OTP. Please try again later.");
    }
  };

  const handleVerifyClick = async () => {
    // Validation for verification code before proceeding
    if (!verificationCode || verificationCodeError !== "") {
      console.log(verificationCode);
      setVerificationCodeError("Enter a valid verification code");
      return;
    }

    // Your logic to verify the code and change the step
    if (verificationCode === otp.toString()) {
      setCurrentStep("ResetPassword");
    } else {
      console.log(verificationCode);
      toast.error("Incorrect verification code. Please try again.");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (confirmPassword !== newPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleResetPassword = async () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/email/updatePassword",
        { email, password }
      );
      if (response.status === 200) {
        toast.success("Password changed successfully!", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });
        navigate("/login");
      } else {
        toast.error("Failed to reset password. Please try again later.");
      }
    } catch (error) {
      console.error("Failed to reset password: ", error);
      toast.error("Failed to reset password. Please try again later.");
    }
  };
  return (
    <div className={`ForgotPasswordParent ${themeContext.theme}`}>
      {currentStep === "ForgotPassword" && (
        <div className={`ForgotPasswordContainer ${themeContext.theme}`}>
          <FontAwesomeIcon icon={faQuestionCircle} style={{ height: "70px" }} />
          <h1>Forgot Your Password?</h1>
          <label>Email Address</label>
          <input
            placeholder="e.g. abc@gmail.com"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="ErrorMessage">{emailError}!</p>}
          <button onClick={handleSendEmailClick}>Send an email</button>
        </div>
      )}

      {currentStep === "Otp" && (
        <div className={`OtpContainer ${themeContext.theme}`}>
          <h1>Check Your Email!</h1>
          <p>
            Please enter the verification code that was sent.
            <br />
            The code is valid for 10 minutes.
          </p>
          <label>Verification Code</label>
          <input
            type="text"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
          />
          {verificationCodeError && (
            <p className="ErrorMessage">{verificationCodeError}!</p>
          )}
          <button onClick={handleVerifyClick}>Verify</button>
        </div>
      )}

      {currentStep === "ResetPassword" && (
        <div className={`ResetPasswordContainer ${themeContext.theme}`}>
          <h1>Reset Password</h1>
          <label>New Password</label>
          <div className="PasswordInputContainer">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
            <span
              className="TogglePassword"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <label>Confirm Password</label>
          <div className="PasswordInputContainer">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <span
              className="TogglePassword"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
          </div>
          {passwordError && <p className="ErrorMessage">{passwordError}!</p>}
          <button onClick={handleResetPassword} disabled={passwordError !== ""}>
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}

// import React, { useContext, useState } from "react";
// import "./ForgotPasswordPage.css";
// import { ThemeContext } from "../../../context/ThemeContext";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "react-hot-toast";

// export default function ForgotPasswordPage() {
//   const navigate = useNavigate();
//   const themeContext = useContext(ThemeContext);
//   const [currentStep, setCurrentStep] = useState("ForgotPassword");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [verificationCode, setVerificationCode] = useState("");
//   const [verificationCodeError, setVerificationCodeError] = useState("");

//   const handleEmailChange = (e) => {
//     const newEmail = e.target.value;
//     setEmail(newEmail);
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(newEmail)) {
//       setEmailError("Enter a valid email address");
//     } else {
//       setEmailError("");
//     }
//   };

//   const handleVerificationCodeChange = (e) => {
//     const newVerificationCode = e.target.value;
//     setVerificationCode(newVerificationCode);
//     setVerificationCodeError("");
//   };

//   const handleSendEmailClick = () => {
//     // Validation for email before proceeding
//     if (!email || emailError !== "") {
//       setEmailError("Enter a valid email address");
//       return;
//     }

//     // Your logic to send an email and change the step
//     setCurrentStep("Otp");
//   };

//   const handleVerifyClick = () => {
//     // Validation for verification code before proceeding
//     if (!verificationCode || verificationCodeError !== "") {
//       setVerificationCodeError("Enter a valid verification code");
//       return;
//     }

//     // Your logic to verify the code and change the step
//     setCurrentStep("ResetPassword");
//   };

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);

//     if (newPassword.length < 8) {
//       setPasswordError("Password must be at least 8 characters long");
//     } else if (confirmPassword !== newPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleConfirmPasswordChange = (e) => {
//     const newConfirmPassword = e.target.value;
//     setConfirmPassword(newConfirmPassword);

//     if (newConfirmPassword !== password) {
//       setPasswordError("Passwords do not match");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleResetPassword = () => {
//     if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters long");
//     } else if (password !== confirmPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       toast.success("Password changed successfully!", {
//         duration: 3000,
//         position: "top-center",
//         style: {
//           backgroundColor: "#333",
//           color: "white",
//         },
//       });
//       navigate("/login");
//     }
//   };
//   return (
//     <div className={`ForgotPasswordParent ${themeContext.theme}`}>
//       {currentStep === "ForgotPassword" && (
//         <div className={`ForgotPasswordContainer ${themeContext.theme}`}>
//           <FontAwesomeIcon icon={faQuestionCircle} style={{ height: "70px" }} />
//           <h1>Forgot Your Password?</h1>
//           <label>Email Address</label>
//           <input
//             placeholder="e.g. abc@gmail.com"
//             type="text"
//             value={email}
//             onChange={handleEmailChange}
//           />
//           {emailError && <p className="ErrorMessage">{emailError}!</p>}
//           <button onClick={handleSendEmailClick}>Send an email</button>
//         </div>
//       )}

//       {currentStep === "Otp" && (
//         <div className={`OtpContainer ${themeContext.theme}`}>
//           <h1>Check Your Email!</h1>
//           <p>
//             Please enter the verification code that was sent.
//             <br />
//             The code is valid for 10 minutes.
//           </p>
//           <label>Verification Code</label>
//           <input
//             type="text"
//             value={verificationCode}
//             onChange={handleVerificationCodeChange}
//           />
//           {verificationCodeError && (
//             <p className="ErrorMessage">{verificationCodeError}!</p>
//           )}
//           <button onClick={handleVerifyClick}>Verify</button>
//         </div>
//       )}

//       {currentStep === "ResetPassword" && (
//         <div className={`ResetPasswordContainer ${themeContext.theme}`}>
//           <h1>Reset Password</h1>
//           <label>New Password</label>
//           <div className="PasswordInputContainer">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <span
//               className="TogglePassword"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>
//           <label>Confirm Password</label>
//           <div className="PasswordInputContainer">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//             />
//             <span
//               className="TogglePassword"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? "Hide" : "Show"}
//             </span>
//           </div>
//           {passwordError && <p className="ErrorMessage">{passwordError}!</p>}
//           <button onClick={handleResetPassword} disabled={passwordError !== ""}>
//             Reset Password
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
