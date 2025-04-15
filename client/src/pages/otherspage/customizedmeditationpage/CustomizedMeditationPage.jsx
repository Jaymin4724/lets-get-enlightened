import React, { useContext, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./CustomizedMeditationPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCloudRain,
  faWind,
  faWater,
  faFireAlt,
  faDove,
  faPerson,
  faMosquito,
  faGuitar,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../../context/ThemeContext";
import birdAudio from "./../../../assets/customizedmeditationpage/bird.mp3";
import cricketAudio from "./../../../assets/customizedmeditationpage/cricket.mp3";
import crowdAudio from "./../../../assets/customizedmeditationpage/crowd.mp3";
import fireAudio from "./../../../assets/customizedmeditationpage/fire.mp3";
import guitarAudio from "./../../../assets/customizedmeditationpage/guitar.mp3";
import rainAudio from "./../../../assets/customizedmeditationpage/rain.mp3";
import thunderAudio from "./../../../assets/customizedmeditationpage/thunder.mp3";
import wavesAudio from "./../../../assets/customizedmeditationpage/wave.mp3";
import windAudio from "./../../../assets/customizedmeditationpage/wind.mp3";

const audioSources = {
  thunder: thunderAudio,
  rain: rainAudio,
  wind: windAudio,
  waves: wavesAudio,
  fire: fireAudio,
  bird: birdAudio,
  crowd: crowdAudio,
  cricket: cricketAudio,
  guitar: guitarAudio,
};

export default function CustomizedMeditationPage() {
  const themeContext = useContext(ThemeContext);
  const [volumes, setVolumes] = useState({
    thunder: 0,
    rain: 0,
    wind: 0,
    waves: 0,
    fire: 0,
    bird: 0,
    crowd: 0,
    cricket: 0,
    guitar: 0,
  });

  const handleVolumeChange = (audio, value) => {
    setVolumes((prevVolumes) => ({
      ...prevVolumes,
      [audio]: parseFloat(value),
    }));
  };

  const resetVolumes = () => {
    // Reset all volumes to 0
    setVolumes({
      thunder: 0,
      rain: 0,
      wind: 0,
      waves: 0,
      fire: 0,
      bird: 0,
      crowd: 0,
      cricket: 0,
      guitar: 0,
    });
  };

  return (
    <div className={`CustomizedMeditationContainer ${themeContext.theme}`}>
      <div className="CustomizedMeditationHeading">
        <h1>
          Have a meditation experience with
          <br /> customized sounds.
        </h1>
        <p>
          Adjust the sliders to set the volume of each sound. Click on
          <span
            onClick={resetVolumes}
            className={`reset ${themeContext.theme}`}
          >
            {" "}
            Reset{" "}
          </span>
          to mute all sounds.
        </p>
      </div>

      {/* Music Container 1 */}
      <div className={`MusicContainer1`}>
        {[
          { icon: faBolt, label: "Thunder", audio: "thunder" },
          { icon: faCloudRain, label: "Rain", audio: "rain" },
          { icon: faWind, label: "Wind", audio: "wind" },
          { icon: faWater, label: "Wave", audio: "waves" },
          { icon: faFireAlt, label: "Fire", audio: "fire" },
        ].map((music, index) => (
          <div className={`Music`} key={index}>
            <FontAwesomeIcon icon={music.icon} style={{ height: "55px" }} />
            <div>{music.label}</div>
            <div className="progressbar">
              <input
                type="range"
                min={0}
                max={100}
                value={volumes[music.audio]}
                onChange={(e) =>
                  handleVolumeChange(music.audio, e.target.value)
                }
                className={`${themeContext.theme}`}
              />
            </div>
            <ReactAudioPlayer
              src={audioSources[music.audio]}
              autoPlay
              loop
              volume={volumes[music.audio] / 100}
              preload="auto"
            />
          </div>
        ))}
      </div>

      {/* Music Container 2 */}
      <div className={`MusicContainer2`}>
        {[
          { icon: faDove, label: "Birds", audio: "bird" },
          { icon: faPerson, label: "Crowd", audio: "crowd" },
          { icon: faMosquito, label: "Cricket", audio: "cricket" },
          { icon: faGuitar, label: "Guitar", audio: "guitar" },
        ].map((music, index) => (
          <div className={`Music`} key={index}>
            <FontAwesomeIcon icon={music.icon} style={{ height: "55px" }} />
            <div>{music.label}</div>
            <div className="progressbar">
              <input
                type="range"
                min={0}
                max={100}
                value={volumes[music.audio]}
                onChange={(e) =>
                  handleVolumeChange(music.audio, e.target.value)
                }
                className={`${themeContext.theme}`}
              />
            </div>
            <ReactAudioPlayer
              src={audioSources[music.audio]}
              autoPlay
              loop
              volume={volumes[music.audio] / 100}
              preload="auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
