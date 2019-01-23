import React, { useState, useEffect, useContext } from "react"; // eslint-disable-line no-unused-vars
import { getParams } from "../../lib/utils";
import SettingsContext from "../SettingsContext/Context";
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
  const { graph } = useContext(SettingsContext);
  // console.log(dispatch);
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
      {params.dots || graph.dots ? (
        <>
          <GraphAverages prevWindSpeeds={prevWindSpeeds} />
          <GraphHighs prevWindSpeeds={prevWindSpeeds} />
        </>
      ) : null}
      {params.bars || graph.bars ? (
        <>
          <GraphBars prevWindSpeeds={prevWindSpeeds} />
        </>
      ) : null}
      {params.lines || graph.lines ? (
        <LineGraph prevWindSpeeds={prevWindSpeeds} />
      ) : null}
    </div>
  );
};
export default Footer;
