import React, { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header";
import LoadClocks from "./components/LoadClocks";
import Footer from "./components/Footer/index";
const io = require("socket.io-client");

const socket = io(
  process.env.REACT_APP_WEBSOCKET_SERVER ||
    "https://spaceland-load-clock.herokuapp.com"
);
socket.open();

const validLocations = {
  ATL: "Atlanta",
  CLW: "Clewiston",
  DAL: "Dallas",
  HOU: "Houston",
  SAN: "San Marcos"
};

const validLocationFromPathname = () => {
  const match = window.location.pathname.split("/")[1].match(/[A-Z]{3}/);
  if (match && Object.keys(validLocations).includes(match[0])) return match[0];
  return "ATL";
};

const App = () => {
  const location = validLocationFromPathname();

  const [weather, setWeather] = useState({});

  if (!weather.prevWindSpeeds) weather.prevWindSpeeds = [];

  useEffect(() => {
    socket.emit("location", location);
    window.document.title = `${validLocations[location]} ${
      window.document.title
    }`;
    socket.on("weather", data => {
      if (data) setWeather(data);
    });
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <Header location={validLocations[location]} time={weather.time} />
      <LoadClocks loads={[]} />
      <Footer weather={weather} />
    </div>
  );
};

export default App;
