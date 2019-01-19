import React from "react";
import WindWidget from "./WindWidget";
import WindChart from "./WindChart";
import "./Footer.scss";

const Footer = ({ weather }) => {
  if (!weather) return null;
  return (
    <div id="Footer">
      <WindWidget weather={weather} />
      <WindChart windSpeeds={weather && weather.prevWindSpeeds} />
    </div>
  );
};
export default Footer;
