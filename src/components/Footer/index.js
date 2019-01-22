import React, { useState, useEffect } from "react";
import WindWidget from "./WindWidget";
import {
  GraphBackground,
  GraphBars,
  GraphAverages,
  GraphHighs
} from "./WindChart";
import { fakeWindData } from "./WindChart/lib/wind-data-funcs";
import "./Footer.scss";

const Footer = ({ weather }) => {
  // const { prevWindSpeeds } = weather;
  const [fakeWindSpeeds, setFakeWindSpeeds] = useState([]);
  useEffect(() => {
    setFakeWindSpeeds(fakeWindData(600));
  }, []);
  return (
    <div id="Footer">
      <WindWidget weather={weather} fakeWindSpeeds={fakeWindSpeeds} />
      {/* <WindChart prevWindSpeeds={prevWindSpeeds} /> */}
      <GraphBackground />
      <GraphBars prevWindSpeeds={fakeWindSpeeds} />
      <GraphAverages prevWindSpeeds={fakeWindSpeeds} />
      <GraphHighs prevWindSpeeds={fakeWindSpeeds} />
    </div>
  );
};
export default Footer;
