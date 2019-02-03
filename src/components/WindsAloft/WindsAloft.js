import React, { useState, useEffect } from "react";
import "./WindsAloft.scss";
const colorForSpeed = speed => `hsla(${120 - speed * 2}, 100%, 50%, 0.99)`;

const WindsAloft = () => {
  const [windsAloft, setWindsAloft] = useState([]);

  const fetchWindsAloftData = async (region, station) => {
    const res = await fetch(
      `https://winds-aloft-json.herokuapp.com/forecast/${region}/${station}.json`,
      {
        mode: "cors",
        headers: { "Content-Type": "application/json" }
      }
    );
    const json = await res.json();
    let windsAloft = json.dataRows[0].forecast;
    setWindsAloft(windsAloft);
  };
  useEffect(() => {
    fetchWindsAloftData("mia", "ATL");
  }, []);
  return (
    <div className="WindsAloft">
      {windsAloft.map(forecast => (
        <div className="altitudeGroup" key={forecast.altitude}>
          <span
            className="arrow"
            style={{
              transform: `rotate(${forecast.direction}deg)`,
              display: forecast.direction === "L/V" ? "none" : "block",
              backgroundColor: colorForSpeed(forecast.speed.mph)
            }}
          />
          <span className="altitude text">
            {forecast.altitude.toString().replace(/000/, "K")}
          </span>
          <span className="direction text">
            {forecast.direction === "L/V"
              ? "Light/Variable"
              : `${forecast.direction}\u00B0`}
          </span>
          <span className="speed text">{forecast.speed.mph} mph</span>
          <span className="temperature text">
            {forecast.temperature
              ? `${forecast.temperature.farenheit}\u00B0F`
              : null}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WindsAloft;
