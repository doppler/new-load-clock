import React from "react";
import Header from "./Header";
import LoadClocks from "./LoadClocks";
import Footer from "./Footer/index";
// import { announceLocation } from "./SocketContext/sockets/emit";
import "./Screen.scss";
import locations from "../locations.json";

const Screen = ({ location, offset }) => {
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
      <LoadClocks locationName={locations[location]["name"]} />
      <Footer weatherStation={location} />
    </div>
  );
};

export default Screen;
