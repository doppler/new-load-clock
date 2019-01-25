import React from "react";
import { Header } from "./Header";
import { LoadClocks } from "./LoadClocks";
import { Footer } from "./Footer/index";
import "./Screen.scss";
import locations from "../locations.json";

const Screen = ({ location, weather, loadsObject }) => {
  return (
    <div className="Screen" locationname={locations[location]["name"]}>
      <Header
        temperature={weather && weather.outsideTemp}
        locationName={locations[location]["name"]}
        locationTimezone={locations[location]["tz"]}
        loadsFlownToday={loadsObject.loadsFlownToday}
      />
      <LoadClocks
        loadsObject={loadsObject}
        locationName={locations[location]["name"]}
      />
      <Footer weather={weather || {}} />
    </div>
  );
};

export default Screen;
