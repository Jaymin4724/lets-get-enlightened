import React, { useContext, useEffect } from "react";
import "./HomePage.css";
import AffirmationsComp from "../../components/homepage/AffirmationsComp";
import MeditationTypesComp from "../../components/homepage/MeditationTypesComp";
import ChallengeComp from "../../components/homepage/ChallengeComp";
import Others from "../../components/homepage/Others";
import FooterComp from "../../components/homepage/FooterComp";
import { ThemeContext } from "../../context/ThemeContext";
import { NavbarContext } from "../../context/NavbarContext";
export default function HomePage() {
  const themeContext = useContext(ThemeContext);
  const { setIsNavbarVisible } = useContext(NavbarContext);

  useEffect(() => {
    setIsNavbarVisible(true);
    // incase somewhere i forget to make it visible
  });

  return (
    <div className="HomePage">
      <AffirmationsComp />
      <div className={`CompContainer ${themeContext.theme}`}>
        <MeditationTypesComp />
        <ChallengeComp />
        <Others />
        <FooterComp />
      </div>
    </div>
  );
}
