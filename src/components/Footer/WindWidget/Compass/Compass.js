import React from "react";
import { colorForSpeed } from "../../../../lib/wind-funcs";
import "./Compass.scss";
import GhostArrows from "./GhostArrows";
import HashMarks from "./HashMarks";

const Compass = ({ weather }) => {
  const { windDirection, prevWindDirs, windSpeed } = weather;
  let rotation;
  const correctedRotation = degree => {
    let angle;
    rotation = rotation || 0;
    angle = rotation % 360;
    if (angle < 0) angle += 360;
    if (angle < 180 && degree > angle + 180) rotation -= 360;
    if (angle >= 180 && degree <= angle - 180) rotation += 360;
    rotation += degree - angle;
    return rotation;
  };
  return (
    <div className="Compass">
      <div className="Face">
        <div className="Circle" style={{ color: colorForSpeed(windSpeed) }}>
          {windSpeed > -1 ? windSpeed : "--"}
        </div>
        <GhostArrows prevDirs={prevWindDirs} />
        <div
          className="Arrow"
          style={{
            transform: `rotate(${correctedRotation(windDirection)}deg)`,
            opacity: `${windSpeed ? 0.75 : 0.25}`
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
export default Compass;
