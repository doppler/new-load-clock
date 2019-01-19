import React, { useEffect, useState } from "react";
import Screen from "./components/Screen";
import "./App.scss";
import locations from "./locations.json";

const App = () => {
  const [clientWidth, setClientWidth] = useState(document.body.clientWidth);
  // const [pageXOffset, setPageXOffset] = useState(window.pageXOffset);
  useEffect(() => {
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
  }, []);
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
