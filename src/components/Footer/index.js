import React, { useContext, useEffect } from "react";
import SocketContext from "../SocketContext/Context";
import WindWidget from "./WindWidget";
import WindChart from "./WindChart";
import { announceLocation } from "../SocketContext/sockets/emit";
import "./Footer.scss";

const Footer = ({ weatherStation }) => {
  const { weather } = useContext(SocketContext);

  useEffect(() => {
    announceLocation(weatherStation);
  }, []);

  return (
    <div id="Footer">
      <WindWidget weather={weather} />
      <WindChart windSpeeds={weather.prevWindSpeeds} />
    </div>
  );
};
export default Footer;
