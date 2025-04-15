import React, { useContext } from "react";
import "./ProfileMenuBar.css";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

export default function ProfileMenuBar() {
  const themeContext = useContext(ThemeContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);

  const handleProfileInsightsClick = (event) => {
    if (userData.mem_id === "65de0a84596a0d4f24ec161d") {
      event.preventDefault();
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

  return (
    <div className="ProfileMenuBar">
      <div className={`MenuButtons ${themeContext.theme}`}>
        <NavLink
          to="/profile/edit"
          className={`MenuButton ${themeContext.theme}`}
        >
          Edit Profile
        </NavLink>

        <NavLink
          to="/profile/insights"
          className={`MenuButton ${themeContext.theme}`}
          onClick={handleProfileInsightsClick}
          style={{ textAlign: "left", width: "100%" }}
        >
          Profile Insights{" "}
          <FontAwesomeIcon icon={faCrown} style={{ color: "gold" }} />
        </NavLink>

        <NavLink
          to="/profile/changepassword"
          className={`MenuButton ${themeContext.theme}`}
        >
          Change Password
        </NavLink>
        <NavLink
          to="/profile/leaderboard"
          className={`MenuButton ${themeContext.theme}`}
        >
          Leaderboard
        </NavLink>

        {userData.mem_id !== "65de09aa596a0d4f24ec1362" && (
          <NavLink
            to="/profile/membershipplans"
            className={`MenuButton ${themeContext.theme}`}
          >
            Membership Plans
          </NavLink>
        )}

        <NavLink
          to="/profile/messagebox"
          className={`MenuButton ${themeContext.theme}`}
        >
          Inbox
        </NavLink>
        {isLoggedIn && (
          <Link
            to="/"
            onClick={logout}
            className={`MenuButton ${themeContext.theme}`}
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}
