import React, { useState, useEffect } from "react";
import "./App.css";
import Compass from "./components/Compass";
import WindChart from "./components/WindChart";
import StatsTable from "./components/StatsTable";
const io = require("socket.io-client");
const socket = io("http://localhost:3001");
socket.open();

const App = () => {
  const [weather, setWeather] = useState({});
  const [client, setClient] = useState({
    width: document.body.clientWidth,
    height: document.body.clientHeight
  });

  if (!weather.prevWindSpeeds) weather.prevWindSpeeds = [];

  useEffect(() => {
    document.body.onresize = () => {
      setClient({
        width: document.body.clientWidth,
        height: document.body.clientHeight
      });
    };
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
        <p>Time: {weather.time}</p>
        <p>clientWidth: {client.width}</p>
        <p>clientHeight: {client.height}</p>
        <StatsTable weather={weather} />
        <WindChart windSpeeds={weather.prevWindSpeeds} />
      </header>
    </div>
  );
};

export default App;
