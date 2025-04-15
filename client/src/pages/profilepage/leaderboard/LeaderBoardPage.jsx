import React, { useState, useEffect, useContext } from "react";
import ProfileMiddleComp from "../../../components/profilepage/ProfileMiddleComp";
import { ThemeContext } from "../../../context/ThemeContext";
import axios from "axios";
import "./LeaderBoardPage.css";

const LeaderBoardPage = () => {
  const themeContext = useContext(ThemeContext);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getall")
      .then((response) => {
        setLeaderboardData(
          response.data.map((player) => ({
            ...player,
            fname: capitalize(player.fname),
            lname: capitalize(player.lname),
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data: ", error);
      });
  }, []);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <ProfileMiddleComp>
      <div className={`LeaderboardContainer ${themeContext.theme}`}>
        <h1>LEADERBOARD</h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Credit Points</th>
              <th>Current Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player, rank) => (
              <tr key={rank}>
                {/* <td>{index + 1}</td> */}
                <td>{rank + 1}.</td>
                <td>
                  {player.fname} {player.lname}
                </td>
                <td>{player.credit_points}</td>
                <td>{player.curr_streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProfileMiddleComp>
  );
};

export default LeaderBoardPage;
