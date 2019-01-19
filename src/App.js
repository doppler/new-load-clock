import React from "react";
import Screen from "./components/Screen";
import "./App.scss";
import locations from "./locations.json";
const App = () => {
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
