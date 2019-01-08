import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Compass from "./components/Compass";

const io = require("socket.io-client");
// const socket = io("http://localhost:3001");

const App = () => {
  const { current: socket } = useRef(io("http://localhost:3001"));
  const [weather, setWeather] = useState({});

  useEffect(() => {
    try {
      console.log("opening socket");
      socket.open();
      socket.on("weather", data => {
        setWeather(data);
        console.log("weather", data);
      });
    } catch (error) {
      console.log(error);
    }
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Compass weather={weather} />
        <p>Speed: {weather.windSpeed}</p>
        <p>Direction: {weather.windDirection}</p>
      </header>
    </div>
  );
};

export default App;
