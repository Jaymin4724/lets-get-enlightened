import React, { useContext, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderComp.css";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const Others = () => {
  const { userData, isLoggedIn } = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const [flag, setflag] = useState(false);

  function handleRestriction13() {
    if (!isLoggedIn) {
      toast.error(
        <div style={{ padding: "0", margin: "0" }}>
          Access Requires User Authentication :{" "}
          <NavLink
            to="/login"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "bolder",
              color: "beige",
            }}
          >
            Login Now
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
      return;
    }
  }
  function handleRestriction2() {
    if (!isLoggedIn) {
      toast.error(
        <div style={{ padding: "0", margin: "0" }}>
          Access Requires User Authentication :{" "}
          <NavLink
            to="/login"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "bolder",
              color: "beige",
            }}
          >
            Login Now
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
      return;
    } else if (userData.mem_id === "65de0a84596a0d4f24ec161d") {
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
    } else {
      setflag(true);
    }
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`SliderContainer ${themeContext.theme}`} id="Others">
      <Slider {...sliderSettings}>
        <div className="SliderItem">
          <NavLink
            to={isLoggedIn ? "/stressmanagement" : "/"}
            onClick={() => {
              handleRestriction13();
            }}
          >
            <img
              src="https://i.ibb.co/C5wd7Jd/Stress-Management-Game.jpg"
              className={`SliderItemImg ${themeContext.theme}`}
              alt="image123"
              style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 1)" }}
            />
          </NavLink>
          <div className="SliderItemDetails">
            <div className="SliderItemName">Pause & Play</div>
            <div className={`SliderItemDesc ${themeContext.theme}`}>
              Mindful play—experience tranquility through stress management
              game.
            </div>
          </div>
        </div>

        <div className="SliderItem">
          <NavLink
            to={flag ? "/customizedmeditation" : "/"}
            onClick={() => {
              handleRestriction2();
            }}
          >
            <img
              src="https://i.ibb.co/Twpq1hM/Customized-Meditation.jpg"
              className={`SliderItemImg ${themeContext.theme} premium`}
              alt="image123"
              style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 1)" }}
            />
          </NavLink>
          <div className="SliderItemDetails">
            <div className="SliderItemName">
              Customized Meditation{" "}
              <FontAwesomeIcon icon={faCrown} style={{ color: "gold" }} />
            </div>
            <div className={`SliderItemDesc ${themeContext.theme}`}>
              Meditation sounds for personalized spiritual and mental growth.
            </div>
          </div>
        </div>

        <div className="SliderItem">
          <NavLink
            to={isLoggedIn ? "/breathingexercise" : "/"}
            onClick={() => {
              handleRestriction13();
            }}
          >
            <img
              src="https://i.ibb.co/v4wR7nP/Breathing-Exercise.jpg"
              className={`SliderItemImg ${themeContext.theme}`}
              alt="image123"
              style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 1)" }}
            />
          </NavLink>
          <div className="SliderItemDetails">
            <div className="SliderItemName">Breathing Exercise</div>
            <div className={`SliderItemDesc ${themeContext.theme}`}>
              Relax your mind with special breathing exercise for calmness.
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Others;
