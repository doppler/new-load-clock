import React, { useState, useEffect, useContext } from "react";
import SocketContext from "./components/SocketContext/Context";
import { Menu } from "./components/Menu";
import Screen from "./components/Screen";
import { Settings } from "./components/Settings";
import "./App.scss";
import locations from "./locations.json";
const locationCodes = Object.keys(locations).map(i => i);

const codeFromUrl = () => {
  const code = document.location.hash.replace("#", "");
  locationCodes.push("SETTINGS");
  if (locationCodes.includes(code)) {
    return code;
  }
};

const App = () => {
  const [locationCode, setLocationCode] = useState("ATL");
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);
  useEffect(() => setLocationCode(codeFromUrl() || locationCodes[0]), []);
  useEffect(() => {
    const hashChangeListener = window.addEventListener("hashchange", event => {
      setLocationCode(codeFromUrl());
    });
    return () => {
      window.removeEventListener("hashchange", hashChangeListener);
    };
  }, []);
  const { weather, loads } = useContext(SocketContext);
  return (
    <div
      className={`App ${
        process.env.NODE_ENV === "development" ? "development" : null
      }`}
    >
      <Hamburger {...{ toggleMenu, menuVisible }} />
      <Menu {...{ toggleMenu, menuVisible }} />
      {locationCode === "SETTINGS" ? (
        <Settings />
      ) : (
        <Screen
          locationCode={locationCode}
          weather={weather[locationCode]}
          loadsObject={loads[locationCode]}
        />
      )}
    </div>
  );
};

export default App;

const Hamburger = ({ toggleMenu, menuVisible }) => {
  return (
    <div className="Hamburger" onClick={toggleMenu}>
      <div className={`line ${menuVisible ? "active" : null} top`} />
      <div className={`line ${menuVisible ? "active" : null} middle`} />
      <div className={`line ${menuVisible ? "active" : null} bottom`} />
    </div>
  );
};
