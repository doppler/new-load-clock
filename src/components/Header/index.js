import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import {
  getLocationName,
  getLocationCode,
  getLocationTimezone,
  getLocationCodes
} from "../../lib/location";
import "./Header.scss";

const NavArrow = ({ direction, onClick }) => (
  <div
    className={`NavArrow ${direction === 1 ? "right" : "left"}`}
    onClick={onClick}
  />
);

export default () => {
  const locationName = getLocationName();
  const locationTimezone = getLocationTimezone();

  const [time, setTime] = useState("00:00:00 --");
  const updateTime = () => {
    setTime(moment.tz(locationTimezone).format("h:mm:ss A z"));
  };
  useEffect(() => {
    const timeInterval = setInterval(() => {
      updateTime();
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const navigateToOtherClock = direction => {
    const allLocationCodes = getLocationCodes();
    // const locationKeys = Object.keys(locations);
    let currentKeyIdx = allLocationCodes.indexOf(getLocationCode());
    if (currentKeyIdx === 0 && direction === -1)
      currentKeyIdx = allLocationCodes.length;
    if (currentKeyIdx === allLocationCodes.length - 1 && direction === 1)
      currentKeyIdx = -1;
    window.location.hash = `#${allLocationCodes[currentKeyIdx + direction]}`;
  };
  return (
    <div id="Header">
      <div className="title">
        <NavArrow direction={-1} onClick={() => navigateToOtherClock(-1)} />
        Skydive Spaceland {locationName}
        <NavArrow direction={1} onClick={() => navigateToOtherClock(1)} />
      </div>
      <div className="time">{time}</div>
    </div>
  );
};
