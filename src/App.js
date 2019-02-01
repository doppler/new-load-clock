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
  if (locationCodes.includes(code)) {
    return code;
  }
};

const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);
  useEffect(() => {
    let locationCode;
    if ((locationCode = codeFromUrl())) {
      window.scrollTo(
        document.body.clientWidth * locationCodes.indexOf(locationCode),
        0
      );
    }
    let timer;
    window.onscroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const index = Math.round(
          window.pageXOffset / document.body.clientWidth
        );
        window.scrollTo(document.body.clientWidth * index, 0);
        document.location.hash = `#${locationCodes[index]}`;
      }, 50);
    };
    window.addEventListener("hashchange", event => {
      if (window.location.hash === "#SETTINGS") {
        window.scrollTo(document.body.clientWidth * locationCodes.length, 0);
        return;
      }
      locationCode = codeFromUrl();
      if (locationCode) {
        window.scrollTo(
          document.body.clientWidth * locationCodes.indexOf(locationCode),
          0
        );
      }
    });
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
      {Object.keys(locations).map((location, i) => (
        <Screen
          key={i}
          location={location}
          weather={weather[location]}
          loadsObject={loads[location]}
        />
      ))}
      <Settings />
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
