import React, { useContext, useEffect, useState } from "react";
import "./StartChallengePage.css";
import { ThemeContext } from "../../context/ThemeContext";
import { ChallengeContext } from "../../context/ChallengeContext";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

export default function StartChallengePage() {
  const { id } = useParams();
  const themeContext = useContext(ThemeContext);
  const { setChallengeStatus, setChallangeCount } =
    useContext(ChallengeContext);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the specific challenge based on the ID
    axios
      .get(`http://localhost:8000/api/challenges/getone/${id}`)
      .then((response) => {
        setSelectedChallenge(response.data);
      })
      .catch((error) => {
        console.error("Error fetching challenge:", error);
      });
  }, [id]);

  if (!selectedChallenge) {
    // Handle the case where the challenge is not found
    return <div>Challenge not found</div>;
  }

  const handleChallengeMeditatorClick = (event) => {
    if (userData.mem_id === "65de0a84596a0d4f24ec161d") {
      event.preventDefault(); // Prevent default routing
      toast.error(
        <div style={{ padding: "0", margin: "0" }}>
          Get the Membership to access this feature :{" "}
          <NavLink
            to="/profile/membershipplans"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "bolder",
              color: "beige",
            }}
          >
            Buy Now
          </NavLink>
        </div>,
        {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "18px",
            width: "30vw",
          },
        }
      );
    }
  };

  function handleChallengeCount() {
    switch (id) {
      case "65cf13ab8dcaa5a28df96298":
        setChallangeCount(3);
        break;

      case "65d0e6724b1c65bbea63face":
        setChallangeCount(5);
        break;

      case "65d0e6e14b1c65bbea63fad1":
        setChallangeCount(7);
        break;

      case "65d0e7144b1c65bbea63fad3":
        setChallangeCount(10);
        break;

      case "65d0e7bd6a9ca23008f40c88":
        setChallangeCount(14);
        break;

      case "65d0e7e46a9ca23008f40c8a":
        setChallangeCount(21);
        break;

      case "65d0e8386a9ca23008f40c8c":
        setChallangeCount(28);
        break;
      default:
        setChallangeCount(null);
    }
  }

  return (
    <div className={`StartChallenge ${themeContext.theme}`}>
      <h1>{selectedChallenge.name}</h1>
      <p>{selectedChallenge.description}</p>
      <h2>Credit Points: {selectedChallenge.credit_points}</h2>
      <div className={`ChallengeButtons ${themeContext.theme}`}>
        <NavLink to="/">
          <button
            onClick={() => {
              handleChallengeCount();
              setChallengeStatus(true);
            }}
          >
            Challenge Yourself
          </button>
        </NavLink>
        <NavLink to={`/challengemeditator/${id}`}>
          <button
            onClick={handleChallengeMeditatorClick}
            style={{
              width: "max-content",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
              }}
            >
              Challenge A Meditator{" "}
              <FontAwesomeIcon
                icon={faCrown}
                style={{ color: "gold", paddingBottom: "2px" }}
              />
            </div>
          </button>
        </NavLink>
      </div>
    </div>
  );
}
