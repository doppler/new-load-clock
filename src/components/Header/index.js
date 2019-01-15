import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import location from "../../lib/location";

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
  return (
    <div id="Header">
      <div className="title">Skydive Spaceland {location}</div>
      <div className="time">{time}</div>
    </div>
  );
};
