import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Compass from "./components/Compass";
import WindChart from "./components/WindChart";
const io = require("socket.io-client");

const App = () => {
  const { current: socket } = useRef(io("http://localhost:3001"));
  const [weather, setWeather] = useState({});

  if (!weather.prevWindSpeeds) weather.prevWindSpeeds = [];
  const windSpeeds = [...weather.prevWindSpeeds].reverse();
  const wind5minHigh = Math.max(...windSpeeds.slice(0, 150));
  const wind10minHigh = Math.max(...windSpeeds.slice(150, 300));
  const wind20minHigh = Math.max(...windSpeeds.slice(300, 600));

  useEffect(() => {
    try {
      console.log("opening socket");
      socket.open();
      socket.on("weather", data => {
        if (data) setWeather(data);
        // console.log("weather", data);
      });
      socket.on("close", () => console.log("SOCKET CLOSED"));
    } catch (error) {
      console.log(error);
    }
    // seems that after awhile websocket gets fucked up and memory leaks or
    // something. just reload every minute.
    let reloadTimeout = setTimeout(() => {
      document.location.reload();
    }, 1000 * 60 * 2);
    return () => {
      socket.close();
      clearTimeout(reloadTimeout);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Compass weather={weather} />
        <p>Time: {weather.time}</p>
        <table>
          <tbody>
            <tr>
              <td>5min high:</td>
              <td>{wind5minHigh} mph</td>
            </tr>
            <tr>
              <td>10min high:</td>
              <td>{wind10minHigh} mph</td>
            </tr>
            <tr>
              <td>20min high:</td>
              <td>{wind20minHigh} mph</td>
            </tr>
          </tbody>
        </table>
        <WindChart windSpeeds={weather.prevWindSpeeds} />
      </header>
    </div>
  );
};

export default App;
