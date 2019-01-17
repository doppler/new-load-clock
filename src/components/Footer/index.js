import React, { useContext } from "react";
import SocketContext from "../SocketContext/Context";
import WindWidget from "./WindWidget";
import WindChart from "./WindChart";
import "./Footer.scss";

const Footer = ({ weatherStation }) => {
  const { weather } = useContext(SocketContext);

  return (
    <div id="Footer">
      <WindWidget weather={weather} />
      <WindChart windSpeeds={weather.prevWindSpeeds} />
    </div>
  );
};
export default Footer;
