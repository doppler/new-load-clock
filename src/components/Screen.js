import React, { useContext } from "react";
import Header from "./Header";
import LoadClocks from "./LoadClocks";
import Footer from "./Footer/index";
import "./Screen.scss";
import SocketContext from "./SocketContext/Context";
import locations from "../locations.json";

const Screen = ({ location, offset }) => {
  const { weather, loads } = useContext(SocketContext);
  return (
    <div
      className="Screen"
      locationname={locations[location]["name"]}
      style={{ left: `${offset * 100}vw` }}
    >
      <Header
        locationName={locations[location]["name"]}
        locationTimezone={locations[location]["tz"]}
      />
      <LoadClocks
        loads={loads[location]}
        locationName={locations[location]["name"]}
      />
      <Footer weather={weather[location]} />
    </div>
  );
};

export default Screen;
