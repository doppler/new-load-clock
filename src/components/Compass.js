import React from "react";
import "./Compass.scss";

export default ({ weather }) => (
  <div className="Compass">
    <div className="Circle">{weather.windSpeed}</div>
    <div className="Arrow" style={{ rotate: `${weather.windDirection}deg` }} />
  </div>
);
