import React, { useEffect, useContext } from "react";
import SocketContext from "./components/SocketContext/Context";
import Screen from "./components/Screen";
import "./App.scss";
import locations from "./locations.json";
const locationCodes = Object.keys(locations).map(i => i);

const codeFromUrl = () => {
  console.log(locationCodes);
  const code = document.location.hash.replace("#", "");
  if (locationCodes.includes(code)) {
    return code;
  }
};

const App = () => {
  useEffect(() => {
    let locationCode;
    if ((locationCode = codeFromUrl())) {
      console.log(
        "locationCode",
        locationCode,
        locationCodes.indexOf(locationCode)
      );
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
      }, 75);
    };
  }, []);
  const { weather, loads } = useContext(SocketContext);
  return (
    <div className="App">
      {Object.keys(locations).map((location, i) => (
        <Screen
          key={i}
          location={location}
          weather={weather[location]}
          loads={loads[location]}
        />
      ))}
    </div>
  );
};

export default App;
