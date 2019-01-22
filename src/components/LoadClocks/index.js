import React, { useState, useEffect } from "react";
import "./LoadClocks.scss";
import secondsToMMSS from "../../lib/secondsToMMSS";
const { differenceInSeconds } = require("date-fns");

const LoadClocks = ({ loadsObject, locationName }) => {
  return (
    <div className="LoadClocks" locationname={locationName}>
      {loadsObject && loadsObject.loads && loadsObject.loads.length
        ? loadsObject.loads.map((load, i) => <LoadClock load={load} key={i} />)
        : null}
    </div>
  );
};
export default LoadClocks;

const LoadClock = ({ load }) => {
  let timerInterval;
  const [timer, setTimer] = useState({ ds: 0, time: "--:--" });

  const updateTimer = () => {
    let ds = differenceInSeconds(new Date(), new Date(load.departureTime));
    if (ds >= 0) {
      ds = 0;
      clearInterval(timerInterval);
    }
    setTimer({ ds, time: secondsToMMSS(ds) });
  };

  useEffect(
    () => {
      timerInterval = setInterval(() => {
        updateTimer();
      }, 1000);
      return () => {
        clearInterval(timerInterval);
      };
    },
    [load]
  );

  return (
    <div className={`Load ${colorForSecondsRemaining(timer.ds)}`}>
      <header>
        {load.plane} {load.loadNumber}
      </header>
      <span className={`time ${colorForSecondsRemaining(timer.ds)}`}>
        {timer.time}
      </span>
      <footer>Slots Remaining: {load.slotsRemaining}</footer>
    </div>
  );
};

// const NoLoadsScheduled = () => (
//   <div className="NoLoadsScheduled">No Loads Scheduled</div>
// );

const colorForSecondsRemaining = ds => {
  return null;
  /*
  const d = Math.abs(ds);
  let color;
  switch (true) {
    case d < 60 * 1:
      color = "red";
      break;
    case d < 60 * 5:
      color = "orange";
      break;
    case d < 60 * 10:
      color = "yellow";
      break;
    default:
      color = white;
      break;
  }
  return color;
  */
};
