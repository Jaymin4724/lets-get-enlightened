import React, { useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import ProfileMiddleComp from "../../../components/profilepage/ProfileMiddleComp";
import { AuthContext } from "../../../context/AuthContext";
import { ThemeContext } from "../../../context/ThemeContext";
import "./InsightsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeace,
  faPersonCircleCheck,
  faPersonCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const moodDescriptions = {
  1: "Worst",
  2: "Bad",
  3: "Good",
  4: "Better",
  5: "Best",
};

export default function InsightsPage() {
  const themeContext = useContext(ThemeContext);
  const { userData } = useContext(AuthContext);
  const [totalMeditationHours, setTotalMeditationHours] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [recentMood, setRecentMood] = useState([]);

  useEffect(() => {
    const fetchMeditationHours = async () => {
      try {
        // console.log(userData._id)
        const response = await axios.get(
          `http://localhost:8000/api/meditationActivity/userMeditationDuration/${userData._id}`
        );
        setTotalMeditationHours(response.data.totalDuration);
      } catch (error) {
        console.error("Error fetching total meditation hours:", error);
      }
    };
    const fetchRecentActivities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/userActivitiesForCurrentMonth/${userData._id}`
        );
        setRecentActivities(response.data.meditationActivities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };
    const fetchRecentMood = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/mood/userMood/${userData._id}`
        );
        setRecentMood(response.data);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    fetchMeditationHours();
    fetchRecentActivities();
    fetchRecentMood();
  }, [userData._id]);

  const data = recentMood
    .slice(0, 7)
    .map((mood, index) => ({ id: index + 1, Mood: mood.result }));

  return (
    <ProfileMiddleComp>
      <div className={`ProfileInsights ${themeContext.theme}`}>
        <div className={`MainContainerInsights ${themeContext.theme}`}>
          <div className={`ContainerInsights ${themeContext.theme}`}>
            <div className="InsightsIcon">
              <FontAwesomeIcon icon={faPeace} />
            </div>
            <div className="InsightsHeading">Meditation Hours</div>
            <div className="InsightsCounts">
              90
              {/* {totalMeditationHours}  */}
              min
            </div>
          </div>
          <div className={`ContainerInsights ${themeContext.theme}`}>
            <div className="InsightsIcon">
              <FontAwesomeIcon icon={faPersonCircleCheck} />
            </div>
            <div className="InsightsHeading">Challenges Won</div>
            <div className="InsightsCounts">3</div>
          </div>
          <div className={`ContainerInsights ${themeContext.theme}`}>
            {" "}
            <div className="InsightsIcon">
              <FontAwesomeIcon icon={faPersonCircleXmark} />
            </div>
            <div className="InsightsHeading">Challenges Lost</div>
            <div className="InsightsCounts">00</div>
          </div>
        </div>
        <div
          className={`MainContainerInsights ${themeContext.theme}`}
          style={{ flex: "2" }}
        >
          <div
            className={`ContainerInsights ${themeContext.theme}`}
            style={{ padding: "10px 15px 10px 0px" }}
          >
            <div
              className="InsightsHeading"
              style={{
                fontSize: "30px",
                fontWeight: "500",
                paddingLeft: "140px",
              }}
            >
              Overall Mood Of Last 7 Days
            </div>
            <BarChart width={500} height={450} data={data}>
              <XAxis dataKey="id" stroke="black" />
              <YAxis
                dataKey="Mood"
                stroke="black"
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(value) => moodDescriptions[value]}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Mood" fill="black" barSize={35} />
            </BarChart>
          </div>
          <div
            className={`ContainerInsights ${themeContext.theme}`}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
              padding: "20px",
            }}
          >
            <div
              className="InsightsHeading"
              style={{ fontSize: "30px", fontWeight: "500" }}
            >
              Recently Completed Activites
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Achieved Credit Points</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => {
                    const [name, creditPoints] = activity.split(" : ");
                    return (
                      <tr key={name}>
                        <td>{name}</td>
                        <td>{creditPoints}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="2">No activities found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProfileMiddleComp>
  );
}

// import React, { useContext } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
// import ProfileMiddleComp from "../../../components/profilepage/ProfileMiddleComp";
// import { ThemeContext } from "../../../context/ThemeContext";
// import "./InsightsPage.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPeace,
//   faPersonCircleCheck,
//   faPersonCircleXmark,
//   faDownload,
// } from "@fortawesome/free-solid-svg-icons";

// const data = [
//   { day: "Mon", Mood: 1 },
//   { day: "Tue", Mood: 2 },
//   { day: "Web", Mood: 4 },
//   { day: "Thu", Mood: 5 },
//   { day: "Fri", Mood: 3 },
//   { day: "Sat", Mood: 4 },
//   { day: "Sun", Mood: 5 },
// ];

// const moodDescriptions = {
//   1: "Worst",
//   2: "Bad",
//   3: "Good",
//   4: "Better",
//   5: "Best",
// };

// export default function InsightsPage() {
//   const themeContext = useContext(ThemeContext);
//   return (
//     <ProfileMiddleComp>
//       <div className={`ProfileInsights ${themeContext.theme}`}>
//         <div className={`MainContainerInsights ${themeContext.theme}`}>
//           <div className={`ContainerInsights ${themeContext.theme}`}>
//             <div className="InsightsIcon">
//               <FontAwesomeIcon icon={faPeace} />
//             </div>
//             <div className="InsightsHeading">Meditation Hours</div>
//             <div className="InsightsCounts">40 hrs</div>
//           </div>
//           <div className={`ContainerInsights ${themeContext.theme}`}>
//             <div className="InsightsIcon">
//               <FontAwesomeIcon icon={faPersonCircleCheck} />
//             </div>
//             <div className="InsightsHeading">Challenges Won</div>
//             <div className="InsightsCounts">28</div>
//           </div>
//           <div className={`ContainerInsights ${themeContext.theme}`}>
//             {" "}
//             <div className="InsightsIcon">
//               <FontAwesomeIcon icon={faPersonCircleXmark} />
//             </div>
//             <div className="InsightsHeading">Challenges Lost</div>
//             <div className="InsightsCounts">04</div>
//           </div>
//         </div>
//         <div
//           className={`MainContainerInsights ${themeContext.theme}`}
//           style={{ flex: "2" }}
//         >
//           <div
//             className={`ContainerInsights ${themeContext.theme}`}
//             style={{ padding: "20px 20px 10px 0px" }}
//           >
//             <BarChart width={500} height={450} data={data}>
//               <XAxis dataKey="day" stroke="black" />
//               <YAxis
//                 dataKey="Mood"
//                 stroke="black"
//                 ticks={[1, 2, 3, 4, 5]}
//                 tickFormatter={(value) => moodDescriptions[value]}
//               />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="Mood" fill="black" barSize={35} />
//             </BarChart>
//           </div>
//           <div
//             className={`ContainerInsights ${themeContext.theme}`}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               flex: "1",
//               padding: "20px",
//             }}
//           >
//             <div
//               className="InsightsHeading"
//               style={{ fontSize: "30px", fontWeight: "500" }}
//             >
//               Previously Completed Activites
//             </div>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Achieved Credit Points</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Pause & Play</td>
//                   <td>-</td>
//                 </tr>
//                 <tr>
//                   <td>14 Day Stress Reduction Challenge</td>
//                   <td>280</td>
//                 </tr>
//                 <tr>
//                   <td>Drumming Calmness Meditation</td>
//                   <td>10</td>
//                 </tr>
//                 <tr>
//                   <td>Fire Meditation</td>
//                   <td>10</td>
//                 </tr>
//                 <tr>
//                   <td>Mantra Meditation</td>
//                   <td>10</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </ProfileMiddleComp>
//   );
// }
