import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "./Header.scss";

const Header = ({ temperature, locationTimezone }) => {
  const [time, setTime] = useState("00:00:00 --");
  const updateTime = locationTimezone => {
    setTime(moment.tz(locationTimezone).format("h:mm:ss A z"));
  };
  useEffect(
    () => {
      const timeInterval = setInterval(() => {
        updateTime(locationTimezone);
      }, 1000);
      return () => clearInterval(timeInterval);
    },
    [locationTimezone]
  );
  return (
    <div id="Header">
      <div className="time">{time}</div>
      <div
        className="temperature"
        style={{
          color: `hsl(${280 - temperature * 3}, 100%, 50%)`
        }}
      >
        {temperature} &deg;F
      </div>
    </div>
  );
};
export default Header;
