import React, { useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import AdminMiddleComp from "../../../components/adminpage/AdminMiddleComp";
import { ThemeContext } from "../../../context/ThemeContext";
import "./DashboardPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faMoneyCheck,
  faPeace,
  faPersonCircleCheck,
  faSmile,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function DashboardPage() {
  const themeContext = useContext(ThemeContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPremiumUsers, setTotalPremiumUsers] = useState(0);
  const [totalMeditationTypes, setTotalMeditationTypes] = useState(0);
  const [overallMood, setOverallMood] = useState("");
  const [barData, setBarData] = useState([]);
  const [totalEarning, setTotalEarning] = useState("");
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersResponse,
          premiumUsersResponse,
          meditationTypesResponse,
          overallMoodResponse,
          barDataResponse,
          totalEarningResponse,
          paymentDataResponse,
        ] = await Promise.all([
          axios.get("http://localhost:8000/api/adminAllUsers"),
          axios.get("http://localhost:8000/api/adminAllPremiumUsers"),
          axios.get(
            "http://localhost:8000/api/meditation-types/adminAllMeditationTypes"
          ),
          axios.get("http://localhost:8000/api/mood/adminAvgMood"),
          axios.get(
          "http://localhost:8000/api/meditationActivity/reportGetDuration"
          ),
          axios.get("http://localhost:8000/api/membershipPayment/getall"),
          axios.get("http://localhost:8000/api/membershipPayment/getall"),
        ]);

        setTotalUsers(usersResponse.data.count);
        setTotalPremiumUsers(premiumUsersResponse.data.count);
        setTotalMeditationTypes(meditationTypesResponse.data.count);

        const avgMood = overallMoodResponse.data.avgResult;
        let moodCategory = "";
        if (avgMood <= 1) {
          moodCategory = "Terrible";
        } else if (avgMood <= 2) {
          moodCategory = "Bad";
        } else if (avgMood <= 3) {
          moodCategory = "Okay";
        } else if (avgMood <= 4) {
          moodCategory = "Good";
        } else if (avgMood <= 5) {
          moodCategory = "Great";
        } else {
          moodCategory = "Excellent";
        }
        setOverallMood(moodCategory);
        setBarData(barDataResponse.data);
        setTotalEarning(totalEarningResponse.data.totalReceived);
        setPaymentData(paymentDataResponse.data.payments);
        console.log(paymentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  const sortedData = barData
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 5);

  const data = sortedData.map((item) => ({
    name: item.name.split(" ")[0],
    full_name: item.name,
    UsageDuration: item.duration,
  }));
  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }
  return (
    <div>
      <AdminMiddleComp>
        <div className={`Dashboard ${themeContext.theme}`}>
          <div className={`MainContainerDashboard ${themeContext.theme}`}>
            <div className={`ContainerDashboard ${themeContext.theme}`}>
              <div className="IconDashboard">
                <FontAwesomeIcon icon={faUserCircle} />
              </div>
              <div className="HeadingDashboard">Member</div>
              <div className="CountsDashboard">{totalUsers}</div>
            </div>
            <div className={`ContainerDashboard ${themeContext.theme}`}>
              <div className="IconDashboard">
                <FontAwesomeIcon icon={faCrown} />
              </div>
              <div className="HeadingDashboard">Premium Member</div>
              <div className="CountsDashboard">{totalPremiumUsers}</div>
            </div>
            <div className={`ContainerDashboard ${themeContext.theme}`}>
              <div className="IconDashboard">
                <FontAwesomeIcon icon={faMoneyCheck} />
              </div>
              <div className="HeadingDashboard">Total Earnings</div>
              <div className="CountsDashboard">&#8377;{totalEarning}</div>
            </div>
          </div>
          <div
            className="PaymentDataContainer"
            style={{ maxHeight: "300px", overflowY: "scroll" }}
          >
            <div
              className="HeadingDashboard"
              style={{
                width: "100%",
                padding: "10px",
              }}
            >
              <b style={{ fontWeight: "500" }}>Recent Payment Details</b>
            </div>
            <table>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Plan Name</th>
                  <th>Price(₹)</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {paymentData
                  .slice()
                  .reverse()
                  .map((payment) => {
                    const date = new Date(payment.timestamp);
                    const showdate = formatDate(date);

                    return (
                      <tr key={payment._id} className="PaymentItem">
                        <td>{payment.userName.toLowerCase()}</td>
                        <td>{payment.planName.toLowerCase()}</td>
                        <td>{payment.price}</td>
                        <td>{showdate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className={`BarContainerDashBoard ${themeContext.theme}`}>
            <div
              className={`ContainerDashboard ${themeContext.theme}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 25px 20px 0px",
                flex: "3",
              }}
            >
              <div
                className="HeadingDashboard"
                style={{
                  textAlign: "right",
                  width: "100%",
                  paddingRight: "10px",
                }}
              >
                <b>Most Frequently Used Meditation Types (Top 5)</b>
              </div>
              <BarChart width={700} height={350} data={data}>
                <XAxis dataKey="name" stroke="black" />
                <YAxis stroke="black" />
                <Tooltip
                  formatter={(value, name, props) => {
                    return [` usage duration : ${value}m`, ""];
                  }}
                />
                <Legend />
                <Bar dataKey="UsageDuration" fill="black" barSize={50} />
              </BarChart>
            </div>
          </div>

          <div className="MainContainerDashboard">
            <div className={`ContainerDashboard ${themeContext.theme}`}>
              <div className="IconDashboard">
                <FontAwesomeIcon icon={faSmile} />
              </div>
              <div className="HeadingDashboard">Overall Average Mood</div>
              <div className="CountsDashboard">{overallMood}</div>
            </div>
            <div className={`ContainerDashboard ${themeContext.theme}`}>
              <div className="IconDashboard">
                <FontAwesomeIcon icon={faPeace} />
              </div>
              <div className="HeadingDashboard">Meditation Types </div>
              <div className="CountsDashboard">{totalMeditationTypes}</div>
            </div>
            <div className={`ContainerDashboard ${themeContext.theme}`}>
              <div className="IconDashboard">
                <FontAwesomeIcon icon={faPersonCircleCheck} />
              </div>
              <div className="HeadingDashboard">Meditation Challenges</div>
              <div className="CountsDashboard">10</div>
            </div>
          </div>
        </div>
      </AdminMiddleComp>
    </div>
  );
}
