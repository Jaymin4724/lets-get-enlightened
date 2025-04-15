import React, { useContext, useState } from "react";
import RegistrationForm from "../../components/registrationpage/RegistrationFormComp";
import "./RegistrationPage.css";
import { ThemeContext } from "../../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    if (!firstName || !lastName || !email || !password || !dob || !gender) {
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

    //FOR EMAIL
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

    //FOR FIRSTNAME AND LASTNAME
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

    //FOR PASSWORD
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

    const user = {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
      dob: dob,
      gender: gender,
    };

    axios
      .post("http://localhost:8000/api/register", user)
      .then((response) => {
        console.log(response);
        toast.success("Sign up successful. You can now log in!", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("User already exist!", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });
      });

    // Move the return statement here
    return;
  };

  return (
    <div className={`RegisterParent ${themeContext.theme}`}>
      <div className="RegisterContainer">
        <h2 className="RegisterHeading">
          Create a Free Account and <br />
          Join us in this Journey.
        </h2>
        <p style={{ textAlign: "center" }}>
          Already have an account?&nbsp;
          <NavLink className="LoginLine" to="/login">
            Login
          </NavLink>
        </p>
        <RegistrationForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          dob={dob}
          setDob={setDob}
          gender={gender}
          setGender={setGender}
        />
        <button
          className="SignupButton"
          onClick={handleSignUp}
          style={{ marginTop: "15px" }}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;
