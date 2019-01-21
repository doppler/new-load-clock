import React from "react";
import WindWidget from "./WindWidget";
import WindChart, { GraphBackground, GraphBars } from "./WindChart";
import "./Footer.scss";

const Footer = ({ weather }) => {
  const { prevWindSpeeds } = weather;
  return (
    <div id="Footer">
      <WindWidget weather={weather} />
      {/* <WindChart prevWindSpeeds={prevWindSpeeds} /> */}
      <GraphBackground />
      <GraphBars prevWindSpeeds={prevWindSpeeds} />
    </div>
  );
};
export default Footer;
