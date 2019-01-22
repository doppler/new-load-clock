import React, { useState, useEffect } from "react"; // eslint-disable-line no-unused-vars
import WindWidget from "./WindWidget";
import {
  GraphBackground,
  GraphBars,
  // GraphAverages,
  // GraphHighs,
  LineGraph
} from "./WindChart";
import { fakeWindData } from "./WindChart/lib/wind-data-funcs"; // eslint-disable-line no-unused-vars
import "./Footer.scss";

const Footer = ({ weather }) => {
  const { prevWindSpeeds } = weather;
  // const [prevWindSpeeds, setFakeWindSpeeds] = useState([]);
  // useEffect(() => {
  //   setFakeWindSpeeds(fakeWindData(600));
  // }, []);
  return (
    <div id="Footer">
      {/* <WindChart prevWindSpeeds={prevWindSpeeds} /> */}
      <WindWidget weather={weather} prevWindSpeeds={prevWindSpeeds} />
      <GraphBackground />
      <GraphBars prevWindSpeeds={prevWindSpeeds} />
      {/* <GraphAverages prevWindSpeeds={fakeWindSpeeds} /> */}
      {/* <GraphHighs prevWindSpeeds={fakeWindSpeeds} /> */}
      <LineGraph prevWindSpeeds={prevWindSpeeds} />
    </div>
  );
};
export default Footer;
