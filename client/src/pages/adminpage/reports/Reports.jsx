import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import "./Reports.css";

import UserData from "./UserData/UserData";
import MoodData from "./MoodData/MoodData";
import MeditationData from "./MeditationData/MeditationData";
import ReportsData from "./ReportsData/ReportsData";
import AdminMiddleComp from "../../../components/adminpage/AdminMiddleComp";
export default function Reports() {
  const themeContext = useContext(ThemeContext);
  return (
    <AdminMiddleComp>
      <div className={`reports ${themeContext.theme}`}>
        <UserData />
        <MoodData />
        <MeditationData />
        <ReportsData />
      </div>
    </AdminMiddleComp>
  );
}
