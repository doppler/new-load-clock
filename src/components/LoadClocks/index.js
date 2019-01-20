import React, { useState, useEffect } from "react";
import "./LoadClocks.scss";
import secondsToMMSS from "../../lib/secondsToMMSS";
const { differenceInSeconds } = require("date-fns");

const LoadClocks = ({ loads, locationName }) => {
  // const { loads } = useContext(SocketContext);
  // uncomment for testing purposes
  // import { addSeconds } from "date-fns"; // move this up if uncommenting
  // const loads = [
  //   {
  //     loadNo: 3,
  //     plane: "Caravan - 21F",
  //     slotsRemaining: 3,
  //     departureTime: addSeconds(new Date(), 600)
  //   },
  //   // {
  //   //   loadNo: 1,
  //   //   plane: "Skyvan - XX",
  //   //   slotsRemaining: 3,
  //   //   departureTime: addSeconds(new Date(), 982)
  //   // },
  //   {
  //     loadNo: 1,
  //     plane: "Otter - BA",
  //     slotsRemaining: 8,
  //     departureTime: addSeconds(new Date(), 1350)
  //   },
  //   {
  //     loadNo: 1,
  //     plane: "Otter - TS",
  //     slotsRemaining: 6,
  //     departureTime: addSeconds(new Date(), 1364)
  //   }
  // ];
  return (
    <div id="LoadClocks" locationname={locationName}>
      {loads && loads.length ? (
        loads.map((load, i) => <LoadClock load={load} key={i} />)
      ) : (
        <NoLoadsScheduled />
      )}
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
        {load.plane} {load.loadNo}
      </header>
      <span className={`time ${colorForSecondsRemaining(timer.ds)}`}>
        {timer.time}
      </span>
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
