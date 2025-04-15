import React, { useContext, useEffect } from "react";
import "./BreathingExercisePage.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../../context/ThemeContext";
import { NavbarContext } from "../../../context/NavbarContext";

const BreathingExercisePage = () => {
  const themeContext = useContext(ThemeContext);
  const { setIsNavbarVisible } = useContext(NavbarContext);

  useEffect(() => {
    setIsNavbarVisible(false);
    const container = document.querySelector(".container");
    const text = document.querySelector("#text");
    const pointerContainer = document.querySelector(".pointer-container");

    const totalTime = 7500;
    const breatheTime = (totalTime / 5) * 2;
    const holdTime = totalTime / 5;

    const isPointerInWhiteArea = () => {
      const pointerPosition = pointerContainer.getBoundingClientRect();
      const gradientCirclePosition = document
        .querySelector(".gradient-circle")
        .getBoundingClientRect();

      const pointerCenterX = pointerPosition.left + pointerPosition.width / 2;
      const pointerCenterY = pointerPosition.top + pointerPosition.height / 2;

      return (
        pointerCenterX >= gradientCirclePosition.left &&
        pointerCenterX <= gradientCirclePosition.right &&
        pointerCenterY >= gradientCirclePosition.top &&
        pointerCenterY <= gradientCirclePosition.bottom
      );
    };

    const breatheAnimation = () => {
      text.innerHTML = "Breath In!";
      container.className = "container grow";

      setTimeout(() => {
        text.innerHTML = "Hold";

        if (isPointerInWhiteArea()) {
          setTimeout(() => {
            text.innerText = "Breathe Out!";
            container.className = "container shrink";
          }, holdTime);
        } else {
          setTimeout(() => {
            text.innerText = "Breathe Out!";
            container.className = "container shrink";
          }, holdTime);
        }
      }, breatheTime);
    };

    const intervalId = setInterval(breatheAnimation, totalTime);

    return () => {
      clearInterval(intervalId);
      setIsNavbarVisible(true);
    };
  });

  return (
    <div className={`body ${themeContext.theme}`}>
      <div className="NavPauseAndPlay">
        <NavLink to="/">
          <button>
            <FontAwesomeIcon icon={faHome} />
          </button>
        </NavLink>
        <button>
          {themeContext.theme === "light" ? (
            <FontAwesomeIcon icon={faMoon} onClick={themeContext.toggleTheme} />
          ) : (
            <FontAwesomeIcon icon={faSun} onClick={themeContext.toggleTheme} />
          )}
        </button>
      </div>
      <div className={`HeadingBreathingExercise ${themeContext.theme}`}>
        Breathing Exercise
      </div>
      <div className="container">
        <p id="text"></p>
        <div className="pointer-container">
          <div className="pointer"></div>
        </div>
        <div className={`gradient-circle ${themeContext.theme}`}></div>
      </div>
    </div>
  );
};

export default BreathingExercisePage;
