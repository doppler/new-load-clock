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
    <h1>Load {load.number}</h1>
  </div>
);

const NoLoadsScheduled = () => (
  <div className="NoLoadsScheduled">No Loads Scheduled</div>
);
