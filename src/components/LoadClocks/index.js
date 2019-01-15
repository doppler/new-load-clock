import React, { useContext, useState, useEffect } from "react";
import SocketContext from "../SocketContext/Context";
import "./LoadClocks.scss";
import secondsToMMSS from "../../lib/secondsToMMSS";
const { differenceInSeconds } = require("date-fns");

export default () => {
  const { loads } = useContext(SocketContext);
  return (
    <div id="LoadClocks">
      {loads.length ? (
        loads.map((load, i) => <LoadClock load={load} key={i} />)
      ) : (
        <NoLoadsScheduled />
      )}
    </div>
  );
};

const LoadClock = ({ load }) => {
  let timerInterval;
  const [timer, setTimer] = useState("--:--");

  const updateTimer = () => {
    let ds = differenceInSeconds(new Date(), new Date(load.departureTime));
    if (ds >= 0) {
      ds = 0;
      clearInterval(timerInterval);
    }
    setTimer(secondsToMMSS(ds));
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
    <div className="Load">
      <header>
        {load.plane} {load.loadNo}
      </header>
      <span className="time">{timer}</span>
      {/* <span className="json">{JSON.stringify(load, null, 2)}</span> */}
      <footer>Slots Remaining: {load.slotsRemaining}</footer>
    </div>
  );
};

const NoLoadsScheduled = () => (
  <div className="NoLoadsScheduled">No Loads Scheduled</div>
);
