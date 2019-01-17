import React, { useState, useEffect } from "react";
import {
  getLocationCode,
  getLocationCodes,
  getLocationName,
  getLocationTimezone
} from "./lib/location";
import "./App.scss";
import Header from "./components/Header";
import LoadClocks from "./components/LoadClocks";
import Footer from "./components/Footer/index";

const App = () => {
  const allLocationCodes = getLocationCodes();
  const [currentCode, setCurrentCode] = useState(getLocationCode());
  const getPrevLocation = () => {
    const currIdx = allLocationCodes.indexOf(currentCode);
    if (allLocationCodes.indexOf(currentCode) === 0)
      return allLocationCodes[allLocationCodes.length - 1];
    return allLocationCodes[currIdx - 1];
  };
  const getNextLocation = () => {
    const currIdx = allLocationCodes.indexOf(currentCode);
    if (allLocationCodes.indexOf(currentCode) === allLocationCodes.length - 1)
      return allLocationCodes[0];
    return allLocationCodes[currIdx + 1];
  };
  const [prevLocation, setPrevLocation] = useState(getPrevLocation());
  const [nextLocation, setNextLocation] = useState(getNextLocation());

  const [locationName, setLocationName] = useState("");
  const [locationTimezone, setLocationTimezone] = useState(
    getLocationTimezone()
  );
  const handleHashChange = () => {
    setLocationName(getLocationName());
    setLocationTimezone(getLocationTimezone());
    setCurrentCode(getLocationCode());
    setPrevLocation(getPrevLocation());
    setNextLocation(getNextLocation());
  };
  useEffect(
    () => {
      window.onhashchange = () => {
        handleHashChange();
      };
      handleHashChange();
    },
    [locationName, locationTimezone, currentCode, prevLocation, nextLocation]
  );
  return (
    <div className="App">
      <Header
        locationName={locationName}
        locationTimezone={locationTimezone}
        prevLocation={prevLocation}
        nextLocation={nextLocation}
      />
      <LoadClocks locationName={locationName} />
      <Footer />
    </div>
  );
};

export default App;
