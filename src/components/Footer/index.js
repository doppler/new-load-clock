import React, { useState, useEffect } from "react"; // eslint-disable-line no-unused-vars
import WindWidget from "./WindWidget";
import {
  GraphBackground,
  GraphBars,
  GraphAverages,
  GraphHighs,
  LineGraph
} from "./WindChart";
import { fakeWindData } from "./WindChart/lib/wind-data-funcs"; // eslint-disable-line no-unused-vars
import "./Footer.scss";

const Footer = ({ weather }) => {
  const { prevWindSpeeds } = weather;
  const [params, setParams] = useState({});
  // const [prevWindSpeeds, setFakeWindSpeeds] = useState([]);
  // useEffect(() => {
  //   setFakeWindSpeeds(fakeWindData(600));
  // }, []);
  useEffect(() => {
    const paramPairs = document.location.search.replace(/^\?/, "").split(/&/);
    console.log({ paramPairs });
    paramPairs.forEach(pair => {
      const [key, value] = [...pair.split(/=/)];
      params[key] = value;
    });
    setParams(params);
    console.log(params);
  }, []);
  return (
    <div id="Footer">
      {/* <WindChart prevWindSpeeds={prevWindSpeeds} /> */}
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
