import React, { useEffect, useState } from "react";
import Screen from "./components/Screen";
import "./App.scss";
import locations from "./locations.json";

const App = () => {
  const [clientWidth, setClientWidth] = useState(document.body.clientWidth);
  // const [pageXOffset, setPageXOffset] = useState(window.pageXOffset);
  useEffect(
    () => {
      window.scrollTo(
        document.body.clientWidth *
          Math.round(window.pageXOffset / document.body.clientWidth),
        0
      );
      window.onresize = () => {
        setClientWidth(document.body.clientWidth);
      };
      let timer;
      window.onscroll = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          const offset = Math.round(window.pageXOffset / clientWidth);
          window.scrollTo(clientWidth * offset, 0);
        }, 75);
      };
    },
    [clientWidth]
  );
  return (
    <div className="App">
      <div className="Carousel">
        <div className="ViewPort">
          {Object.keys(locations).map((location, i) => (
            <Screen key={i} location={location} offset={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
