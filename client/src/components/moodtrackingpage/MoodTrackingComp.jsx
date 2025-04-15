import React, { useContext, useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { AuthContext } from "../../context/AuthContext";
import StarRatingComp from "./StarRatingComp";
import MoodTrackingQues from "../../data/moodtrackingpage/MoodTrackingQuesData";
import "./MoodTrackingComp.css";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "./../../context/ThemeContext";

const MoodTrackingPage = () => {
  const { userData } = useContext(AuthContext);
  const userId = userData._id;
  const themeContext = useContext(ThemeContext);
  const [answers, setAnswers] = useState(
    Array(MoodTrackingQues.length).fill(0)
  );
  const [questions, setQuestions] = useState([]);
  const [expShare, setExpShare] = useState(""); // State for textarea value

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/mood/displayActive")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleStarClick = (index, rating) => {
    const newAnswers = [...answers];
    newAnswers[index] = rating;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    let sum = answers.reduce((acc, val) => acc + val, 0);
    const avg = sum / answers.length;
    console.log("Average:", avg);

    if (userData) {
      console.log(userId);
      const data = {
        u_id: userId,
        result: avg,
        exp_share: expShare,
      };

      axios
        .post("http://localhost:8000/api/mood/submit", data)
        .then((response) => {
          console.log("Submission successful:", response.data);
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        });
    }
  };

  return (
    <div className={`QuestionsMainContainer ${themeContext.theme}`}>
      <h2>Rate Your Mood</h2>
      {questions.map((question, index) => (
        <div
          className={`QuestionsAnsContainer ${themeContext.theme}`}
          key={question.id}
        >
          <div style={{ flex: "1" }}>{question.que_txt}</div>
          <StarRatingComp
            style={{ flex: "1" }}
            index={index}
            rating={answers[index]}
            onStarClick={handleStarClick}
          />
        </div>
      ))}
      <textarea
        rows={3}
        style={{ margin: "10px 0px", padding: "10px", width: "100%" }}
        placeholder="Describe Your Overall Mood ..."
        value={expShare}
        onChange={(e) => setExpShare(e.target.value)}
      ></textarea>
      <NavLink to="/" className="submitButton" onClick={handleSubmit}>
        Submit
      </NavLink>
    </div>
  );
};

export default MoodTrackingPage;
