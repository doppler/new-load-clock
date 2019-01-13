import React from "react";
import "./LoadClocks.scss";

export default ({ loads }) => {
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

const LoadClock = ({ load }) => (
  <div className="Load">
    <header>{load.name}</header>
    <span className="time">{load.timer}</span>
    <footer>Slots Remaining: {load.slots}</footer>
  </div>
);

const NoLoadsScheduled = () => (
  <div className="NoLoadsScheduled">No Loads Scheduled</div>
);
