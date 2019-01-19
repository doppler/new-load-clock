import React, { useEffect, useContext } from "react";
import SocketContext from "./components/SocketContext/Context";
import Screen from "./components/Screen";
import "./App.scss";
import locations from "./locations.json";

const App = () => {
  const { weather, loads } = useContext(SocketContext);
  useEffect(() => {
    let timer;
    window.onscroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        window.scrollTo(
          document.body.clientWidth *
            Math.round(window.pageXOffset / document.body.clientWidth),
          0
        );
      }, 75);
    };
  }, []);
  return (
    <div className="App">
      {Object.keys(locations).map((location, i) => (
        <Screen
          key={i}
          offset={i}
          location={location}
          weather={weather[location]}
          loads={loads[location]}
        />
      ))}
    </div>
  );
};

export default App;
