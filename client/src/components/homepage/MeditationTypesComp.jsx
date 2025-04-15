import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderComp.css';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const MeditationTypesComp = () => {
  const handleImageClick = (isLoggedIn) => {
    if (!isLoggedIn) {
      toast.error(
        <div style={{ padding: '0', margin: '0' }}>
          Access Requires User Authentication :{' '}
          <NavLink
            to='/login'
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              fontWeight: 'bolder',
              color: 'beige',
            }}
          >
            Login Now
          </NavLink>
        </div>,
        {
          duration: 3000,
          position: 'top-center',
          style: {
            backgroundColor: '#333',
            color: 'white',
            fontFamily: 'sans-serif',
            fontSize: '18px',
            width: '30vw',
          },
        }
      );
    }
    // else{

    // }
  };

  const themeContext = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [meditationTypes, setMeditationTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
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

  useEffect(() => {
    axios.get('http://localhost:8000/api/meditation-types/display-active')
      .then(response => {
        const meditationTypes = response.data;
        setMeditationTypes(meditationTypes);
        setIsLoading(false); // Set loading state to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching meditation types:', error);
        setError(error); // Set error state for handling
        setIsLoading(false); // Set loading state to false in case of error
      });
  }, []);

  return (
    <div className={`SliderContainer ${themeContext.theme}`} id="MeditationTypes">
      <h3 className="SliderContainerHeading">Meditation Types:</h3>

      {isLoading ? (
        <div>Loading meditation types...</div>
      ) : error ? (
        <div>Error fetching data: {error.message}</div>
      ) : (
        <Slider {...sliderSettings}>
          {meditationTypes.map((type) => (
            <div key={type._id} className="SliderItem">
              <NavLink
                to={!isLoggedIn ? '/' : `/startmeditation/${type._id}`}
                onClick={() => handleImageClick(isLoggedIn)}
              >
                <img
                  src={type.audio_resource}
                  className={`SliderItemImg ${themeContext.theme}`}
                  alt="image123"
                />
              </NavLink>
              <div className="SliderItemDetails">
                <div className="SliderItemName">{type.name}</div>
                <div className={`SliderItemDesc ${themeContext.theme}`}>
                  {type.description}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default MeditationTypesComp;

// import React, { useContext } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./SliderComp.css";
// import meditationTypes from "../../data/homepage/MeditationTypesData";
// import { ThemeContext } from "../../context/ThemeContext";
// import { AuthContext } from "../../context/AuthContext";
// import { NavLink } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const MeditationTypesComp = () => {
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
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     initialSlide: 0,
//     swipe: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
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
//       id="MeditationTypes"
//     >
//       <h3 className="SliderContainerHeading">Meditation Types:</h3>
//       <Slider {...sliderSettings}>
//         {meditationTypes.map((type) => (
//           <div key={type.id} className="SliderItem">
//             <NavLink
//               to={!isLoggedIn ? `/` : `/startmeditation/${type.id}`}
//               onClick={() => handleImageClick(isLoggedIn)}
//             >
//               <img
//                 src={type.image}
//                 className={`SliderItemImg ${themeContext.theme}`}
//                 alt="image123"
//               />
//             </NavLink>
//             <div className="SliderItemDetails">
//               <div className="SliderItemName">{type.name}</div>
//               <div className={`SliderItemDesc ${themeContext.theme}`}>
//                 {type.description}
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default MeditationTypesComp;
