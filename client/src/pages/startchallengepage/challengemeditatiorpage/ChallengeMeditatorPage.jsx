import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../../context/ThemeContext";
import { AuthContext } from "../../../context/AuthContext";
import "./ChallengeMeditatorPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

export default function ChallengeMeditatorPage() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);
  const themeContext = useContext(ThemeContext);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array to run only once when the component mounts

  async function fetchUsers() {
    try {
      const response = await axios.get("http://localhost:8000/api/getall");
      const filteredUsers = response.data.filter(
        (user) =>
          user.mem_id !== "65de0a84596a0d4f24ec161d" &&
          user._id !== userData._id
      );
      setUsers(filteredUsers);
      setSearch(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  const searchUser = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = users.filter(
      (user) =>
        user.fname.toLowerCase().includes(searchTerm) ||
        user.lname.toLowerCase().includes(searchTerm) ||
        user._id.toLowerCase().includes(searchTerm)
    );
    setSearch(filteredUsers);
  };

  const sendRequest = async (receiverId) => {
    try {
      const requestData = {
        sender_id: userData._id,
        receiver_id: receiverId,
        ch_id: id,
      };
      const response = await axios.post(
        "http://localhost:8000/api/challengesRequest/create",
        requestData
      );
      console.log("Request sent successfully:", response.data);
      setRequestsSent([...requestsSent, receiverId]);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const isRequestSent = (userId) => {
    return requestsSent.includes(userId);
  };

  return (
    <div className={`ChallengeMeditator ${themeContext.theme}`}>
      <div className="ChallengeMeditatorHeading">
        <h1>Send Request To The Meditators</h1>
      </div>
      <div className={`SearchBar ${themeContext.theme}`}>
        <input
          type="text"
          placeholder="Search for a meditator (id/name)"
          onChange={searchUser}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="SearchButtonChMed"
        />
      </div>
      <div className={`MeditatorsMain ${themeContext.theme}`}>
        {search.map((user) => (
          <div key={user._id} className="Meditators">
            <div className={`MeditatorsDetails ${themeContext.theme}`}>
              <div className="MeditatorsUID">{user._id}</div>
              <div className="MeditatorsName">
                {user.fname} {user.lname}
              </div>
            </div>
            <div className="RequestButton">
              <button
                onClick={() => sendRequest(user._id)}
                disabled={isRequestSent(user._id)}
              >
                {isRequestSent(user._id) ? "Request Sent" : "Send Request"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
