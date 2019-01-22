import React, { useState, useEffect } from "react"; // eslint-disable-line no-unused-vars
import { getParams } from "../../lib/utils";
import WindWidget from "./WindWidget";
import {
  GraphBackground,
  GraphBars,
  GraphAverages,
  GraphHighs,
  LineGraph
} from "./WindChart";
// import { fakeWindData } from "./WindChart/lib/wind-data-funcs"; // eslint-disable-line no-unused-vars
import "./Footer.scss";

const Footer = ({ weather, fakeData }) => {
  const { prevWindSpeeds } = weather;
  const [params, setParams] = useState({});
  // const [prevWindSpeeds, setFakeWindSpeeds] = useState([]);
  // useEffect(() => {
  //   setFakeWindSpeeds(fakeWindData(600));
  // }, []);
  useEffect(() => {
    setParams(getParams());
  }, []);
  return (
    <div className={`Footer ${fakeData ? "fakeData" : null}`}>
      <WindWidget weather={weather} prevWindSpeeds={prevWindSpeeds} />
      <GraphBackground />
      {params.dots ? (
        <>
          <GraphAverages prevWindSpeeds={prevWindSpeeds} />
          <GraphHighs prevWindSpeeds={prevWindSpeeds} />
        </>
      ) : null}
      {params.bars ? (
        <>
          <GraphBars prevWindSpeeds={prevWindSpeeds} />
        </>
      ) : null}
      <LineGraph prevWindSpeeds={prevWindSpeeds} />
    </div>
  );
};
export default Footer;
