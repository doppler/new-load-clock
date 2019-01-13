import React from "react";
import format from "date-fns/format";

export default ({ location, time }) => (
  <div id="Header">
    <div className="title">Skydive Spaceland {location}</div>
    <div className="time">
      {time ? format(time, "h:mm:ss A") : "00:00:00 --"}
    </div>
  </div>
);
