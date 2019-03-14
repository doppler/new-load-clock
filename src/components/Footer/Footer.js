import React, { useState, useEffect, useContext } from "react"; // eslint-disable-line no-unused-vars
import SettingsContext from "../SettingsContext/Context";
import { WindWidget } from "./WindWidget";
import {
  GraphBackground,
  GraphBars,
  GraphAverages,
  GraphHighs,
  LineGraph
} from "./WindGraph";
import "./Footer.scss";

const Footer = ({ weather, fakeData }) => {
  const { prevWindSpeeds } = weather;
  const { graph } = useContext(SettingsContext);
  return (
    <div className={`Footer ${fakeData ? "fakeData" : null}`}>
      <WindWidget weather={weather} />
      <GraphBackground />
      {graph.dots ? (
        <>
          <GraphAverages prevWindSpeeds={prevWindSpeeds} />
          <GraphHighs prevWindSpeeds={prevWindSpeeds} />
        </>
      ) : null}
      {graph.bars ? (
        <>
          <GraphBars prevWindSpeeds={prevWindSpeeds} />
        </>
      ) : null}
      {graph.lines ? <LineGraph prevWindSpeeds={prevWindSpeeds} /> : null}
    </div>
  );
};
export default Footer;
