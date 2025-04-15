import React, { useContext, useState, useEffect } from "react";
import "./AffirmationsComp.css";
import { ThemeContext } from "../../context/ThemeContext";
import axios from 'axios';

export default function AffirmationsComp() {
  const [currentAffirmation, setCurrentAffirmation] = useState({});
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    // Fetch affirmations from backend API
    axios.get('http://localhost:8000/api/affirmations/getall') 
      .then(response => {
        const affirmations = response.data;
        // Select a random affirmation
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        setCurrentAffirmation(affirmations[randomIndex]);
      })
      .catch(error => {
        console.error('Error fetching affirmations:', error);
      });
  }, []);

  return (
    <div className={`Affirmations ${themeContext.theme}`} id="Affirmations">
      <h1>" {currentAffirmation.text} "</h1>
    </div>
  );
}

