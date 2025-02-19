import React from "react";
import "../Styling/Timeline.css";
import BgImageOne from "../assets/Bg-Image8.jpg";

const Timeline = () => {
  return (
    <div>
      <div className="l-container">
        <div className="b-game-card">
          <img
            className="b-game-card __cover"
            src="https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_1.jpg"
            alt=""
          ></img>
        </div>
        <div className="b-game-card">
          <img
            className="b-game-card __cover"
            src="https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_2.jpg"
            alt=""></img>
        </div>
        <div className="b-game-card">
          <img
            className="b-game-card __cover"
            src="https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_3.jpg"
            alt=""
          ></img>
        </div>
        <div className="b-game-card">
          <img
            className="b-game-card __cover"
            src="https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_4.jpg"
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
