import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSun,
  faMoon,
  faFireAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "./NavbarComp.css";
import logoBlack from "../../assets/homepage/logoBlack.png";
import logoWhite from "../../assets/homepage/logoWhite.png";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { ChallengeContext } from "../../context/ChallengeContext";
import { NavLink } from "react-router-dom";

export default function NavbarComp() {
  const themeContext = useContext(ThemeContext);
  const { isAdminLoggedIn, isLoggedIn, userData } = useContext(AuthContext);
  const { challengeStatus, challengeCount } = useContext(ChallengeContext);

  // Check if userData exists before accessing curr_streak and credit_points
  const currStreak = userData?.curr_streak || 0;
  const creditPoints = userData?.credit_points || 0;

  return (
    <nav className={`WebsiteNavbar ${themeContext.theme}`}>
      <NavLink
        to={!isAdminLoggedIn && "/"}
        className={`WebTitleLink ${themeContext.theme}`}
      >
        <div className="WebsiteTitle">
          <img
            src={themeContext.theme === "light" ? logoBlack : logoWhite}
            height="50vh"
            width="50vh"
            alt="logo"
            className="WebsiteLogo"
          />
          <div style={{ marginTop: "7px" }}> Let's Get Enlightened</div>
        </div>
      </NavLink>
      <div className={`NavbarButtons ${themeContext.theme}`}>
        <FontAwesomeIcon
          icon={themeContext.theme === "light" ? faSun : faMoon}
          onClick={themeContext.toggleTheme}
          style={{ height: "25px" }}
        />
        {challengeStatus && (
          <button
            style={{ fontSize: "large", fontWeight: "bolder" }}
            title="Challenge Status"
          >
            0 / {challengeCount}
          </button>
        )}
        {!isAdminLoggedIn && isLoggedIn && (
          <button
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 8px 0px 10px",
            }}
          >
            <div className="StreaksContainer" title="Current Streaks">
              <FontAwesomeIcon
                icon={faFireAlt}
                style={{ height: "25px", padding: 0, margin: 0 }}
              />
              <sup className={`CurrentStreaks ${themeContext.theme}`}>
                <b>{currStreak}</b>
              </sup>
            </div>
            <div className="CreditPointsContainer" title="Credit Points">
              <FontAwesomeIcon
                icon={faStar}
                style={{ height: "25px", padding: 0, margin: 0 }}
              />
              <sup className={`CreditPoints ${themeContext.theme}`}>
                <b>{creditPoints}</b>
              </sup>
            </div>
          </button>
        )}
        {!isAdminLoggedIn && (
          <>
            {isLoggedIn ? (
              userData.mem_id === "65de0930596a0d4f24ec1355" ||
              userData.mem_id === "65de094a596a0d4f24ec1358" ||
              userData.mem_id === "65de09aa596a0d4f24ec1362" ? (
                <button style={{ backgroundColor: "#333" }}>
                  <NavLink
                    to="/profile/edit"
                    className={`ProfileBtnPremium ${themeContext.theme}`}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </NavLink>
                </button>
              ) : (
                userData.mem_id === "65de0a84596a0d4f24ec161d" && (
                  <button>
                    <NavLink
                      to="/profile/edit"
                      className={`ProfileBtn ${themeContext.theme}`}
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                  </button>
                )
              )
            ) : (
              <button>
                <NavLink
                  to="./login"
                  className={`GetStarted ${themeContext.theme}`}
                >
                  Get Started
                </NavLink>
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
