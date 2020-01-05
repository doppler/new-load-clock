import React, { useState, useEffect, useContext, useCallback } from "react";
import useInterval from "../../lib/use-interval";
import SettingsContext from "../SettingsContext/Context";
import "./WindsAloft.scss";
const colorForSpeed = speed => `hsla(${120 - speed * 2}, 100%, 50%, 0.9)`;

const WindsAloft = ({ windsAloftSettings }) => {
  const [windsAloft, setWindsAloft] = useState([]);
  const { celsius } = useContext(SettingsContext);

  const fetchWindsAloftData = useCallback(async () => {
    const res = await fetch(
      `https://windsaloft.herokuapp.com/forecast/${windsAloftSettings.region}/${windsAloftSettings.station}.json`,
      {
        mode: "cors",
        headers: { "Content-Type": "application/json" }
      }
    );
    const json = await res.json();
    const windsAloftData = json.dataRows[0].forecast;
    setWindsAloft(windsAloftData);
  }, [windsAloftSettings.region, windsAloftSettings.station]);

  useEffect(() => {
    fetchWindsAloftData();
  }, [windsAloftSettings, fetchWindsAloftData]);

  useInterval(async () => {
    fetchWindsAloftData();
  }, 1000 * 60 * 10);

  return (
    <div className="WindsAloft">
      {windsAloft.map(forecast => (
        <div className="altitudeGroup" key={forecast.altitude}>
          <span
            className="arrow"
            style={{
              transform: `rotate(${forecast.direction}deg)`,
              display: forecast.direction === "L/V" ? "none" : "block",
              background: colorForSpeed(forecast.speed.mph)
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
          <span className="speed text">
            {forecast.speed.mph > 0 ? `${forecast.speed.mph} mph` : null}
          </span>
          <span className="temperature text">
            {forecast.temperature
              ? celsius
                ? `${(((forecast.temperature.farenheit - 32) * 5) / 9).toFixed(
                    1
                  )}\u00B0C`
                : `${forecast.temperature.farenheit}\u00B0F`
              : null}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WindsAloft;
