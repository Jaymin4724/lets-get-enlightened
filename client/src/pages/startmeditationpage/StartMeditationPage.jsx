import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { NavLink, useParams } from "react-router-dom";
import "./StartMeditationPage.css";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function StartMeditationPage() {
  const { id } = useParams();
  const themeContext = useContext(ThemeContext);
  const authContext = useContext(AuthContext);
  const [showFinishButton, setShowFinishButton] = useState(false);
  const [meditationType, setMeditationType] = useState(null);

  useEffect(() => {
    // Fetch the specific meditation type based on the ID
    axios
      .get(`http://localhost:8000/api/meditation-types/getone/${id}`)
      .then((response) => {
        setMeditationType(response.data);
      })
      .catch((error) => {
        console.error("Error fetching meditation type:", error);
      });

    // Set a timer to show the finish button after 10 minutes
    const timer = setTimeout(() => {
      setShowFinishButton(true);
    }, 600000); // 10 minutes in milliseconds

    return () => clearTimeout(timer); // Clear the timer when the component unmounts or when the button is shown
  }, [id]);

  const handleFinishButtonClick = () => {
    const userId = authContext.userData._id; // Get the logged-in user's ID
    const meditationId = id; // Use the ID from the URL
    console.log("user ", userId, "meditation ", meditationId);
    sendDataToServer(userId, meditationId);
  };

  const sendDataToServer = (userId, meditationId) => {
    console.log("userrrrrr ", userId, "meditation ", meditationId);
    axios
      .post("http://localhost:8000/api/meditationActivity/create", {
        u_id: userId,
        med_id: meditationId,
      })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        // Update the authContext with the new credit_points value
        authContext.setUserData((prevUserData) => ({
          ...prevUserData,
          credit_points: prevUserData.credit_points + 10,
        }));
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  if (!meditationType) {
    return <div>Meditation type not found</div>;
  }

  return (
    <div className={`StartMeditation ${themeContext.theme}`}>
      <div className="MeditationVideo">
        <ReactPlayer url={meditationType.video_resource} controls={true} />
      </div>

      <div className="MeditationInfo">
        <h1>{meditationType.name}</h1>
        <div className="MeditationDesc">{meditationType.instructions}</div>
        <div className="Finish">
          {showFinishButton && (
            <NavLink to="/moodtracking">
              <button
                onClick={handleFinishButtonClick}
                className={`FinishButton ${themeContext.theme}`}
              >
                Finish
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
