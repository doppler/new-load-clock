import React, { useEffect, useRef } from "react";
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
  const { windDirection, prevWindDirs, windSpeed } = weather;
  const led = useRef(null);
  useEffect(
    () => {
      led.current.classList.add("on");
      setTimeout(() => {
        led.current && led.current.classList.remove("on");
      }, 50);
    },
    [weather]
  );
  return (
    <div className="Compass">
      <div className="LED" ref={led} />
      <div className="Face">
        <div
          className="Circle"
          style={{ color: `hsl(${135 - windSpeed * 6}, 100%, 50%)` }}
        >
          {windSpeed > -1 ? windSpeed : "--"}
        </div>
        <GhostArrows prevDirs={prevWindDirs} />
        <div
          className="Arrow"
          style={{
            transform: `rotate(${rotation(windDirection)}deg)`,
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
