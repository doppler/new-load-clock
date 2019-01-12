import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import "./App.css";
import Compass from "./components/Compass";
import WindChart from "./components/WindChart";
import StatsTable from "./components/StatsTable";
const io = require("socket.io-client");
const socket = io("https://spaceland-load-clock.herokuapp.com/");
socket.open();

const validLocationFromPathname = () => {
  const validLocations = ["ATL", "CLW", "DAL", "HOU", "SAN"];
  const match = window.location.pathname.split("/")[1].match(/[A-Z]{3}/);
  if (match && validLocations.includes(match[0])) return match[0];
  return "ATL";
};

const App = () => {
  const location = validLocationFromPathname();

  const [weather, setWeather] = useState({});

  if (!weather.prevWindSpeeds) weather.prevWindSpeeds = [];

  useEffect(() => {
    socket.emit("location", location);
    console.log("Joined", location);
    socket.on("weather", data => {
      if (data) setWeather(data);
    });
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Compass weather={weather} />
        <p>Time: {weather.time && format(weather.time, "h:mm:ss A")}</p>
        <StatsTable weather={weather} />
        <WindChart windSpeeds={weather.prevWindSpeeds} />
      </header>
    </div>
  );
};

export default App;
