import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "./Header.scss";

const Header = ({ temperature, locationTimezone, loadsFlownToday }) => {
  const [time, setTime] = useState(null);
  const updateTime = locationTimezone => {
    setTime(moment.tz(locationTimezone).format("h:mm:ss A"));
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
      <div className="time">{time && time}</div>
      <div className="loadsFlown">Loads Flown Today: {loadsFlownToday}</div>
      <div
        className="temperature"
        style={{
          color: `hsl(${280 - temperature * 3}, 100%, 50%)`
        }}
      >
        {temperature && `${temperature} °F`}
      </div>
    </div>
  );
};
export default Header;
