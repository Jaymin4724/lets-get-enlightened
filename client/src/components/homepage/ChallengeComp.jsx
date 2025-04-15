import React, { useContext, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderComp.css";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { ChallengeContext } from "../../context/ChallengeContext";

const ChallengeComp = () => {
  const { challengeStatus } = useContext(ChallengeContext);
  const handleImageClick = (isLoggedIn) => {
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
    } else {
      if (challengeStatus) {
        toast.error("You can't access more than one challenge at a time.", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "18px",
            width: "30vw",
          },
        });
      }
    }
  };

  const themeContext = useContext(ThemeContext);
  const [challenges, setChallenges] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/challenges/getall")
      .then((response) => {
        setChallenges(response.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
      });
  }, []);

  return (
    <div
      className={`SliderContainer ${themeContext.theme}`}
      id="MeditationChallenges"
    >
      <h3 className="SliderContainerHeading">Meditation Challenges:</h3>
      <Slider {...sliderSettings}>
        {challenges.map((challenge) => (
          <div key={challenge._id} className="SliderItem">
            <NavLink
              to={
                !isLoggedIn || challengeStatus
                  ? `/`
                  : `/startchallenge/${challenge._id}`
              }
              onClick={() => handleImageClick(isLoggedIn)}
            >
              <img
                src={challenge.image}
                className={`SliderItemImg ${themeContext.theme}`}
                alt={`Challenge ${challenge._id}`}
              />
            </NavLink>
            <div className="SliderItemDetails">
              <div className="SliderItemName">{challenge.name}</div>
              <div className={`SliderItemDesc ${themeContext.theme}`}>
                {challenge.description}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ChallengeComp;

// import React, { useContext } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./SliderComp.css";
// import ChallengeData from "../../data/homepage/ChallengeData.jsx";
// import { ThemeContext } from "../../context/ThemeContext";
// import { AuthContext } from "../../context/AuthContext";
// import { NavLink } from "react-router-dom";
// import { toast } from "react-hot-toast";
// const ChallengeComp = () => {
//   const handleImageClick = (isLoggedIn) => {
//     if (!isLoggedIn) {
//       toast.error(
//         <div style={{ padding: "0", margin: "0" }}>
//           Access Requires User Authentication :{" "}
//           <NavLink
//             to="/login"
//             style={{
//               cursor: "pointer",
//               textDecoration: "none",
//               fontWeight: "bolder",
//               color: "beige",
//             }}
//           >
//             Login Now
//           </NavLink>
//         </div>,
//         {
//           duration: 3000,
//           position: "top-center",
//           style: {
//             backgroundColor: "#333",
//             color: "white",
//             fontFamily: "sans-serif",
//             fontSize: "18px",
//             width: "30vw",
//           },
//         }
//       );
//     }
//   };

//   const themeContext = useContext(ThemeContext);
//   const { isLoggedIn } = useContext(AuthContext);
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 5,
//     slidesToScroll: 5,
//     initialSlide: 0,
//     swipe: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div
//       className={`SliderContainer ${themeContext.theme}`}
//       id="MeditationChallenges"
//     >
//       <h3 className="SliderContainerHeading">Meditation Challenges:</h3>
//       <Slider {...sliderSettings}>
//         {ChallengeData.map((challenge) => (
//           <div key={challenge.id} className="SliderItem">
//             <NavLink
//               to={!isLoggedIn ? `/` : `/startchallenge/${challenge.id}`}
//               onClick={() => handleImageClick(isLoggedIn)}
//             >
//               <img
//                 src={challenge.image}
//                 className={`SliderItemImg ${themeContext.theme}`}
//                 alt={`Challenge ${challenge.id}`}
//               />
//             </NavLink>
//             <div className="SliderItemDetails">
//               <div className="SliderItemName">{challenge.name}</div>
//               <div className={`SliderItemDesc ${themeContext.theme}`}>
//                 {challenge.description}
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default ChallengeComp;
