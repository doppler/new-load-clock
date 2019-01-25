import React, { useState, useEffect } from "react";
import "./LoadClocks.scss";
import secondsToMMSS from "../../lib/secondsToMMSS";
const { differenceInSeconds } = require("date-fns");

/* eslint-disable no-unused-vars */
const STATUS_MANIFEST = 1,
  STATUS_SCHEDULED = 2,
  STATUS_LOADING = 3,
  STATUS_DEPARTED = 4,
  STATUS_LANDED = 5;
/* eslint-enable */

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

export const LoadClock = ({ load }) => {
  let timerInterval;
  const [timer, setTimer] = useState({ ds: 0, time: "--:--" });

  const updateTimer = () => {
    let ds = differenceInSeconds(new Date(), new Date(load.departureTime));
    if (load.status === STATUS_LOADING) {
      setTimer({ ...timer, time: "HOLD" });
      clearInterval(timerInterval);
      return;
    }
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
  if (timer.ds >= 0 && load.status !== STATUS_LOADING) return null;
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