import React from "react";
import Header from "./Header";
import LoadClocks from "./LoadClocks";
import Footer from "./Footer/index";
import "./Screen.scss";
import locations from "../locations.json";

const Screen = ({ location, weather, loads }) => {
  return (
    <div className="Screen" locationname={locations[location]["name"]}>
      <Header
        locationName={locations[location]["name"]}
        locationTimezone={locations[location]["tz"]}
      />
      <LoadClocks loads={loads} locationName={locations[location]["name"]} />
      <Footer weather={weather || {}} />
    </div>
  );
};

export default Screen;
