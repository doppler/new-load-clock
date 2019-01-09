import React from "react";
import "./Compass.scss";

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
        {weather.prevWindDirs &&
          weather.prevWindDirs
            .reverse()
            .slice(1, weather.prevWindDirs.length - 1)
            .map((dir, i) => (
              <div
                key={i}
                className="Arrow previous"
                style={{
                  rotate: `${dir}deg`,
                  opacity: 0.8 - i / 30
                }}
              />
            ))}
        <div
          id="dirarrow"
          className="Arrow"
          style={{
            rotate: `${rotation(weather.windDirection)}deg`
          }}
        />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
          <div
            key={deg}
            className="Hashmark"
            style={{ transform: `rotate(${deg}deg)` }}
          />
        ))}
        <div className="Direction">
          {weather.windDirection
            ? `Direction: ${weather.windDirection}`
            : "waiting..."}
        </div>
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
