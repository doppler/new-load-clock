import React, { useState, useEffect } from "react";
import useInterval from "../../lib/use-interval";
import "./LoadClocks.scss";
import secondsToMMSS from "../../lib/secondsToMMSS";
const { addMinutes, differenceInSeconds } = require("date-fns");

/* eslint-disable no-unused-vars */
const STATUS_MANIFEST = 1,
  STATUS_SCHEDULED = 2,
  STATUS_LOADING = 3,
  STATUS_DEPARTED = 4,
  STATUS_LANDED = 5;

const STATUS_HOLD = STATUS_LANDED;
/* eslint-enable */

const LoadClocks = ({ loadsObject }) => {
  useEffect(() => {
    // use this for testing purposes
    if (!process.env.REACT_APP_FAKE_LOADS) return false;
    if (loadsObject && loadsObject.loads) {
      loadsObject.loads.push({
        plane: "Caravan",
        loadNumber: loadsObject.loads.length + 1,
        slotsRemaining: 10,
        departureTime: addMinutes(new Date(), 1),
        status: 1
      });
    }
  }, []);
  return (
    <div className="LoadClocks">
      {loadsObject && loadsObject.loads && loadsObject.loads.length
        ? loadsObject.loads.map((load, i) => <LoadClock load={load} key={i} />)
        : null}
    </div>
  );
};
export default LoadClocks;

export const LoadClock = ({ load }) => {
  const [timer, setTimer] = useState({ ds: 0, time: "--:--" });

  useInterval(() => {
    let ds = differenceInSeconds(new Date(), new Date(load.departureTime));
    if (load.status === STATUS_HOLD) {
      setTimer({ ...timer, time: "HOLD" });
      return;
    }
    if (ds >= 0) {
      ds = 0;
    }
    setTimer({ ds, time: secondsToMMSS(ds) });
  }, 1000);

  if (timer.ds >= 0 && load.status !== STATUS_HOLD) return null;

  return (
    <div className={`Load ${timer.ds}`}>
      <header
        className={
          load.slotsRemaining === 0 || load.status === STATUS_HOLD
            ? "status-red"
            : load.status === STATUS_LOADING
            ? "status-blue"
            : null
        }
      >
        {load.plane} {load.loadNumber}
      </header>
      <span className={`time ${timer.ds}`}>{timer.time}</span>
      <footer>Slots Remaining: {load.slotsRemaining}</footer>
    </div>
  );
};
