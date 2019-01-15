import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import location, { locationCode, locations } from "../../lib/location";
import "./Header.scss";

const NavArrow = ({ direction, onClick }) => (
  <div
    className={`NavArrow ${direction === 1 ? "right" : "left"}`}
    onClick={onClick}
  />
);

export default () => {
  const [time, setTime] = useState("00:00:00 --");
  const updateTime = () => {
    setTime(format(new Date(), "h:mm:ss a"));
  };
  useEffect(() => {
    const timeInterval = setInterval(() => {
      updateTime();
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const navigateToOtherClock = direction => {
    const locationKeys = Object.keys(locations);
    let currentKeyIdx = locationKeys.indexOf(locationCode);
    if (currentKeyIdx === 0 && direction === -1)
      currentKeyIdx = locationKeys.length;
    if (currentKeyIdx === locationKeys.length - 1 && direction === 1)
      currentKeyIdx = -1;
    window.location.pathname = `/${locationKeys[currentKeyIdx + direction]}`;
  };
  return (
    <div id="Header">
      <div className="title">
        <NavArrow direction={-1} onClick={() => navigateToOtherClock(-1)} />
        Skydive Spaceland {location}
        <NavArrow direction={1} onClick={() => navigateToOtherClock(1)} />
      </div>
      <div className="time">{time}</div>
    </div>
  );
};
