import React, { useContext } from "react";
import "./FooterComp.css";
import { ThemeContext } from "../../context/ThemeContext";
import "@fortawesome/fontawesome-free/css/all.css";

const FooterComp = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <footer className={`WebsiteFooter ${themeContext.theme}`}>
      <div className="FooterContent">
        <div className="FooterSection">
          <h4>Contact Us</h4>
          <p>Email: lgeinfo@gmail.com</p>
          <p>Phone: +91 789-456-7290</p>
        </div>
        <div className="FooterSection">
          <h4>Follow Us</h4>
          <div className={`SocialIcons ${themeContext.theme}`}>
            <a
              href="https://www.facebook.com/profile.php?id=61556174845614&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com/get_let97571"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/_letsmeditatetogether_?igsh=YTQwZjQ0NmI0OA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className={`FooterSection ${themeContext.theme}`}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#Affirmations">Home</a>
            </li>
            <li>
              <a href="#MeditationTypes">Meditation Types</a>
            </li>
            <li>
              <a href="#MeditationChallenges">Challenges</a>
            </li>
            <li>
              <a href="#Others">Others</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;
