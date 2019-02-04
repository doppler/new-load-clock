import React, { useContext } from "react";
import { Header } from "./Header";
import { LoadClocks } from "./LoadClocks";
import { Footer } from "./Footer/index";
import "./Screen.scss";
import locations from "../locations.json";
import { WindsAloft } from "./WindsAloft";
import SettingsContext from "./SettingsContext/Context";

const Screen = ({ locationCode, weather, loadsObject }) => {
  const { name, tz, windsAloftSettings } = locations[locationCode];
  const { displayWindsAloft } = useContext(SettingsContext);
  return (
    <div className="Screen" locationname={name}>
      <Header
        temperature={weather && weather.outsideTemp}
        locationName={name}
        locationTimezone={tz}
        loadsFlownToday={loadsObject.loadsFlownToday}
      />
      <LoadClocks loadsObject={loadsObject} />
      <Footer weather={weather || {}} />
      {displayWindsAloft ? (
        <WindsAloft {...{ windsAloftSettings }} />
      ) : (
        <div className="WindsAloft" />
      )}
    </div>
  );
};

export default Screen;
