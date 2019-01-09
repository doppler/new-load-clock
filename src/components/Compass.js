import React from "react";
import "./Compass.scss";
import GhostArrows from "./GhostArrows";
import HashMarks from "./HashMarks";

let rot;
const rotation = deg => {
  let angle;
  rot = rot || 0;
  angle = rot % 360;
  if (angle < 0) angle += 360;
  if (angle < 180 && deg > angle + 180) rot -= 360;
  if (angle >= 180 && deg <= angle - 180) rot += 360;
  rot += deg - angle;
  return rot;
};

export default ({ weather }) => {
  if (!weather.prevWindDirs) weather.prevWindDirs = [];
  return (
    <div className="Compass">
      <div className="Face">
        <div className="Circle">
          {weather.windSpeed > -1 ? weather.windSpeed : "..."}
        </div>
        <div className="Direction">
          {weather.windDirection
            ? `Direction: ${weather.windDirection}`
            : "waiting..."}
        </div>
        <GhostArrows prevDirs={weather.prevWindDirs} />
        <div
          className="Arrow"
          style={{
            rotate: `${rotation(weather.windDirection)}deg`
          }}
        />
        <HashMarks />
        <div className="LabelGrid">
          <div className="grid-cell n">N</div>
          <div className="grid-cell e">E</div>
          <div className="grid-cell s">S</div>
          <div className="grid-cell w">W</div>
        </div>
      </div>
    </div>
  );
};
