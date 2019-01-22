import React from "react";
import Compass from "./Compass";
import WindStatsTable from "./WindStatsTable";
import "./WindWidget.scss";

const WindWidget = ({ weather, fakeWindSpeeds }) => {
  return (
    <div id="WindWidget">
      <Compass weather={weather} />
      <WindStatsTable weather={weather} fakeWindSpeeds={fakeWindSpeeds} />
    </div>
  );
};
export default WindWidget;
