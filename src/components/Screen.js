import React, { useContext } from "react";
import { Header } from "./Header";
import { LoadClocks } from "./LoadClocks";
import { Footer } from "./Footer/index";
import "./Screen.scss";
import locations from "../locations.json";
import { WindsAloft } from "./WindsAloft";
import SettingsContext from "./SettingsContext/Context";

const Screen = ({ location, weather, loadsObject }) => {
  const { windsAloft } = useContext(SettingsContext);
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
      {windsAloft ? <WindsAloft /> : null}
    </div>
  );
};

export default Screen;
