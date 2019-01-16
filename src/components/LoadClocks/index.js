import React, { useContext, useState, useEffect } from "react";
import SocketContext from "../SocketContext/Context";
import "./LoadClocks.scss";
import secondsToMMSS from "../../lib/secondsToMMSS";
import { locationName } from "../../lib/location";
const { differenceInSeconds } = require("date-fns");

export default () => {
  const { loads } = useContext(SocketContext);
  // uncomment for testing purposes
  // const loads = [
  //   {
  //     loadNo: 1,
  //     plane: "Caravan - 921F",
  //     slotsRemaining: 3,
  //     departureTime: new Date(2019, 0, 15, 1, 4)
  //   }
  // ];
  return (
    <div id="LoadClocks" locationname={locationName}>
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
        {load.plane} {load.loadNo}
      </header>
      <span className={`time ${colorForSecondsRemaining(timer.ds)}`}>
        {timer.time}
      </span>
      {/* <span className="json">{JSON.stringify(load, null, 2)}</span> */}
      <footer>Slots Remaining: {load.slotsRemaining}</footer>
    </div>
  );
};

const NoLoadsScheduled = () => (
  <div className="NoLoadsScheduled">No Loads Scheduled</div>
);

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
