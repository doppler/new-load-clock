import React from "react";
import Compass from "./Compass";
import WindStatsTable from "./WindStatsTable";
import "./WindWidget.scss";

export default ({ weather }) => {
  return (
    <div id="WindWidget">
      <Compass weather={weather} />
      <WindStatsTable weather={weather} />
    </div>
  );
};
