import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "./Header.scss";

// const NavArrow = ({ direction, onClick }) => (
//   <div
//     className={`NavArrow ${direction === 1 ? "right" : "left"}`}
//     onClick={onClick}
//   />
// );

const Header = ({
  locationName,
  locationTimezone
  // prevLocation,
  // nextLocation
}) => {
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
      <div className="title">Skydive Spaceland {locationName}</div>
      <div className="time">{time}</div>
    </div>
  );
};
export default Header;
