import React, { useEffect, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import sound1 from "../../../assets/stressmanagementgame/1.wav";
import sound2 from "../../../assets/stressmanagementgame/2.wav";
import sound3 from "../../../assets/stressmanagementgame/3.wav";
import sound4 from "../../../assets/stressmanagementgame/4.wav";
import sound5 from "../../../assets/stressmanagementgame/5.wav";
import sound6 from "../../../assets/stressmanagementgame/6.wav";
import sound7 from "../../../assets/stressmanagementgame/7.wav";
import sound8 from "../../../assets/stressmanagementgame/8.wav";
import sound9 from "../../../assets/stressmanagementgame/9.wav";
import sound10 from "../../../assets/stressmanagementgame/10.wav";
import sound11 from "../../../assets/stressmanagementgame/11.wav";
import sound12 from "../../../assets/stressmanagementgame/12.wav";
import "./StressManagementPage.css";
import { NavbarContext } from "../../../context/NavbarContext";
const StressManagementPage = () => {
  const themeContext = useContext(ThemeContext);
  const { setIsNavbarVisible } = useContext(NavbarContext);
  useEffect(() => {
    setIsNavbarVisible(false);
    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();
      handleKeyAction(key);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      setIsNavbarVisible(true);
    };
  });

  const handleKeyAction = (key) => {
    const shape = getShapeByKey(key);
    if (shape) {
      const color = getRandomColor();
      const transform = getTransformByShape(shape);
      applyAnimation(createShape(`${key}_key`, shape), color, transform);
      playMusicByKey(key);
    }
  };

  const musicMap = {
    a: sound1,
    b: sound2,
    c: sound3,
    d: sound4,
    e: sound5,
    f: sound6,
    g: sound7,
    h: sound8,
    i: sound9,
    j: sound10,
    k: sound11,
    l: sound12,
    m: sound1,
    n: sound2,
    o: sound3,
    p: sound4,
    q: sound5,
    r: sound6,
    s: sound7,
    t: sound8,
    u: sound9,
    v: sound10,
    w: sound11,
    x: sound12,
    y: sound1,
    z: sound2,
  };

  const playMusicByKey = (key) => {
    const audio = new Audio(musicMap[key]);
    audio.play();
  };
  const getShapeByKey = (key) => {
    const shapesMap = {
      a: "circle",
      b: "square",
      c: "triangle",
      d: "pentagon",
      e: "hexagon",
      f: "octagon",
      g: "diamond",
      h: "star",
      i: "arrow",
      j: "moon",
      k: "sun",
      l: "circle",
      m: "square",
      n: "triangle",
      o: "pentagon",
      p: "hexagon",
      q: "octagon",
      r: "diamond",
      s: "star",
      t: "arrow",
      u: "moon",
      v: "sun",
      w: "square",
      x: "triangle",
      y: "pentagon",
      z: "hexagon",
    };
    return shapesMap[key];
  };

  const getTransformByShape = (shape) => {
    const transformsMap = {
      circle: "scale(1.5)",
      square: "rotate(360deg)",
      triangle: "scale(1.5)",
      pentagon: "scale(0.8)",
      hexagon: "rotate(160deg)",
      octagon: "rotate(55deg)",
      diamond: "scale(1.5)",
      star: "scale(20)",
      arrow: "skew(360deg)",
      moon: "skew(90deg)",
      sun: "rotate(190deg)",
    };
    return transformsMap[shape];
  };

  const createShape = (className, shape) => {
    const element = document.createElement("div");
    element.classList.add(className);
    switch (shape) {
      case "circle":
        element.classList.add("circle");
        break;
      case "square":
        element.classList.add("square");
        break;
      case "triangle":
        element.classList.add("triangle");
        break;
      case "pentagon":
        element.classList.add("pentagon");
        break;
      case "hexagon":
        element.classList.add("hexagon");
        break;
      case "octagon":
        element.classList.add("octagon");
        break;
      case "diamond":
        element.classList.add("diamond");
        break;
      case "star":
        element.classList.add("star");
        break;
      case "arrow":
        element.classList.add("arrow");
        break;
      case "cross":
        element.classList.add("cross");
        break;
      case "moon":
        element.classList.add("moon");
        break;
      case "sun":
        element.classList.add("sun");
        break;
      default:
        break;
    }
    document.getElementById("Container").appendChild(element);
    return element;
  };

  const applyAnimation = (element, color, transform) => {
    element.style.backgroundColor = color;
    setTimeout(() => {
      element.style.opacity = "0";
      element.style.transform = transform;
    }, 100);
    setTimeout(() => {
      element.remove();
    }, 2000);
  };

  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <div className={`Pauseandplay ${themeContext.theme}`}>
      <div id="Container">
        <div className="NavPauseAndPlay">
          <NavLink to="/">
            <button>
              <FontAwesomeIcon icon={faHome} />
            </button>
          </NavLink>
          <button>
            {themeContext.theme === "light" ? (
              <FontAwesomeIcon
                icon={faSun}
                onClick={themeContext.toggleTheme}
              />
            ) : (
              <FontAwesomeIcon
                icon={faMoon}
                onClick={themeContext.toggleTheme}
              />
            )}
          </button>
        </div>
        <div className={`HeadingPauseandPlay ${themeContext.theme}`}>
          Press any key from A to Z and Laugh it out loud
          <audio id="a_audio" src="" preload="auto"></audio>
        </div>
      </div>
    </div>
  );
};

export default StressManagementPage;
