import React from "react";
import { Compass } from "./Compass";
import { WindStatsTable } from "./WindStatsTable";
import "./WindWidget.scss";

export default props => {
  return (
    <div id="WindWidget">
      <Compass weather={props.weather} />
      <WindStatsTable weather={props.weather} />
    </div>
  );
};
