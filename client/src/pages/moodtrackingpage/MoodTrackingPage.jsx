import React, { useContext } from "react";
import MoodTrackingComp from "../../components/moodtrackingpage/MoodTrackingComp";
import { ThemeContext } from "./../../context/ThemeContext";
import "./MoodTrackingPage.css";

export default function MoodTrackingPage() {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      className={`MoodTrackingPage ${themeContext.theme}`}
      style={{ padding: "50px 0px 20px 0px" }}
    >
      <MoodTrackingComp></MoodTrackingComp>
    </div>
  );
}
