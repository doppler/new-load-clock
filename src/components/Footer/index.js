import React from "react";
import WindWidget from "./WindWidget";
import WindChart from "./WindChart";
import "./Footer.scss";

const Footer = ({ weather }) => {
  // if (!weather) return null;
  const { prevWindSpeeds } = weather;
  return (
    <div id="Footer">
      <WindWidget weather={weather} />
      <WindChart prevWindSpeeds={prevWindSpeeds} />
    </div>
  );
};
export default Footer;
