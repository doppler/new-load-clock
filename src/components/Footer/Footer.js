import React from "react";
import WindWidget from "./WindWidget";
import { WindChart } from "./WindChart";
import "./Footer.scss";

export default props => {
  return (
    <div id="Footer">
      <WindWidget weather={props.weather} />
      <WindChart windSpeeds={props.weather.prevWindSpeeds} />
    </div>
  );
};
