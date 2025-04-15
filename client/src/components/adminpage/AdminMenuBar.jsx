import React, { useContext } from "react";
import "./AdminMenuBar.css";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

export default function AdminMenuBar() {
  const themeContext = useContext(ThemeContext);
  const { isAdminLoggedIn, adminLogout } = useContext(AuthContext);
  return (
    <div className="AdminMenuBar">
      <div className={`AdminMenuButtons ${themeContext.theme}`}>
        <NavLink
          to="/admin/dashboard"
          className={`AdminMenuButton ${themeContext.theme}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/reports"
          className={`AdminMenuButton ${themeContext.theme}`}
        >
          Generate Reports
        </NavLink>
        <NavLink
          to="/admin/editaffirmations"
          className={`AdminMenuButton ${themeContext.theme}`}
        >
          Affirmations
        </NavLink>
        <NavLink
          to="/admin/editmeditationtypes"
          className={`AdminMenuButton ${themeContext.theme}`}
        >
          Meditation Types
        </NavLink>
        <NavLink
          to="/admin/editchallenges"
          className={`AdminMenuButton ${themeContext.theme}`}
        >
          Challenges
        </NavLink>
        <NavLink
          to="/admin/editmembershipplans"
          className={`AdminMenuButton ${themeContext.theme}`}
        >
          Membership Plans
        </NavLink>
        <NavLink
          to="/admin/editmoodtracking"
          className={`AdminMenuButton ${themeContext.theme}`}
        >
          Mood Tracking
        </NavLink>
        {isAdminLoggedIn && (
          <Link
            to="/"
            onClick={adminLogout}
            className={`AdminMenuButton ${themeContext.theme}`}
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}
