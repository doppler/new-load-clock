import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import {
  getLocationName,
  getLocationCode,
  getLocationCodes
} from "../../lib/location";
import "./Header.scss";

const NavArrow = ({ direction, onClick }) => (
  <div
    className={`NavArrow ${direction === 1 ? "right" : "left"}`}
    onClick={onClick}
  />
);

const Header = ({ locationName, locationTimezone }) => {
  const allLocationCodes = getLocationCodes();

  const [currentCodeIdx, setCurrentCodeIdx] = useState(
    allLocationCodes.indexOf(getLocationCode())
  );
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

  const navigateToOtherClock = direction => {
    // let currentKeyIdx = allLocationCodes.indexOf(getLocationCode());
    if (currentCodeIdx === 0 && direction === -1)
      setCurrentCodeIdx(allLocationCodes.length);
    // currentKeyIdx = allLocationCodes.length;
    if (currentCodeIdx === allLocationCodes.length - 1 && direction === 1)
      setCurrentCodeIdx(-1);
    // currentKeyIdx = -1;
    window.location.hash = `#${allLocationCodes[currentCodeIdx + direction]}`;
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
export default Header;
